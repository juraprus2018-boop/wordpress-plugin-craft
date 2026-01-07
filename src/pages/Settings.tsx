import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HouseholdMembersCard } from '@/components/settings/HouseholdMembersCard';
import { CategoriesCard } from '@/components/settings/CategoriesCard';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { NotificationSettingsCard } from '@/components/settings/NotificationSettingsCard';
import { ResetDataCard } from '@/components/settings/ResetDataCard';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

export default function Settings() {
  useSEO({
    title: 'Instellingen - FinOverzicht',
    description: 'Pas je FinOverzicht instellingen aan. Beheer categorieën, gezinsleden en thema-voorkeuren.',
  });

  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { householdMembers, categories, addHouseholdMember, deleteHouseholdMember } = useTransactions();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  const handleAddCategory = async (data: { name: string; type: 'income' | 'expense'; color?: string }) => {
    if (!user) return;
    const { error } = await supabase.from('categories').insert({
      user_id: user.id,
      name: data.name,
      type: data.type,
      color: data.color,
    });
    if (error) {
      toast.error('Fout bij toevoegen categorie');
    } else {
      toast.success('Categorie toegevoegd');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  };

  const handleUpdateCategory = async (data: { id: string; name: string; color?: string }) => {
    const { error } = await supabase.from('categories').update({
      name: data.name,
      color: data.color,
    }).eq('id', data.id);
    if (error) {
      toast.error('Fout bij bijwerken categorie');
    } else {
      toast.success('Categorie bijgewerkt');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      toast.error('Fout bij verwijderen categorie');
    } else {
      toast.success('Categorie verwijderd');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Laden...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">Instellingen</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">E-mailadres</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <Button variant="destructive" onClick={signOut}>Uitloggen</Button>
          </CardContent>
        </Card>

        <ThemeToggle />

        <NotificationSettingsCard />

        <HouseholdMembersCard
          members={householdMembers}
          onAdd={(data) => addHouseholdMember.mutate(data)}
          onDelete={(id) => deleteHouseholdMember.mutate(id)}
        />

        <CategoriesCard
          categories={categories}
          onAdd={handleAddCategory}
          onUpdate={handleUpdateCategory}
          onDelete={handleDeleteCategory}
        />

        <ResetDataCard />
      </div>
    </DashboardLayout>
  );
}
