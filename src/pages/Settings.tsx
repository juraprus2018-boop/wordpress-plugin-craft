import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Settings() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

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
      </div>
    </DashboardLayout>
  );
}