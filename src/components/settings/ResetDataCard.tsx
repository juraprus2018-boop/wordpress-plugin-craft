import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';

export function ResetDataCard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleReset = async () => {
    if (!user?.email || !password) {
      setError('Vul je wachtwoord in');
      return;
    }

    setIsResetting(true);
    setError('');

    try {
      // Verify password by attempting to sign in
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (authError) {
        setError('Onjuist wachtwoord');
        setIsResetting(false);
        return;
      }

      // Delete all user data in order (respecting foreign key constraints)
      // 1. Delete transactions (references categories and household_members)
      const { error: transError } = await supabase
        .from('transactions')
        .delete()
        .eq('user_id', user.id);

      if (transError) throw transError;

      // 2. Delete debts (references household_members)
      const { error: debtsError } = await supabase
        .from('debts')
        .delete()
        .eq('user_id', user.id);

      if (debtsError) throw debtsError;

      // 3. Delete household members
      const { error: membersError } = await supabase
        .from('household_members')
        .delete()
        .eq('user_id', user.id);

      if (membersError) throw membersError;

      // 4. Delete non-default categories
      const { error: catError } = await supabase
        .from('categories')
        .delete()
        .eq('user_id', user.id)
        .eq('is_default', false);

      if (catError) throw catError;

      // Invalidate all queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      queryClient.invalidateQueries({ queryKey: ['household-members'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast.success('Al je gegevens zijn gereset');
      setDialogOpen(false);
      setPassword('');
    } catch (err: any) {
      console.error('Reset error:', err);
      setError('Er ging iets mis bij het resetten. Probeer het opnieuw.');
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <>
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Gegevens resetten
          </CardTitle>
          <CardDescription>
            Verwijder al je inkomsten, uitgaven, schulden en gezinsleden. 
            Standaard categorieën blijven behouden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={() => setDialogOpen(true)}
            className="w-full sm:w-auto"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Alles resetten
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          setPassword('');
          setError('');
        }
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Weet je het zeker?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <span className="block">
                Dit verwijdert permanent al je:
              </span>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Inkomsten</li>
                <li>Uitgaven</li>
                <li>Schulden</li>
                <li>Gezinsleden</li>
                <li>Aangepaste categorieën</li>
              </ul>
              <span className="block font-medium text-foreground mt-4">
                Voer je wachtwoord in om te bevestigen:
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-2">
            <Label htmlFor="reset-password" className="sr-only">Wachtwoord</Label>
            <div className="relative">
              <Input
                id="reset-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Je wachtwoord"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className={error ? 'border-destructive' : ''}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isResetting}>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
              disabled={isResetting || !password}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isResetting ? 'Bezig met resetten...' : 'Definitief resetten'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}