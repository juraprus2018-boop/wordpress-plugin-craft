import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useAdmin } from '@/hooks/useAdmin';
import { useSEO } from '@/hooks/useSEO';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Activity, Calendar, ShieldCheck } from 'lucide-react';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Admin() {
  useSEO({ title: 'Admin Dashboard - FinOverzicht', description: 'Beheer en statistieken' });

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { isAdmin, isCheckingAdmin, allProfiles, loginLogs, isLoading } = useAdmin();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!isCheckingAdmin && !isAdmin && user) navigate('/dashboard');
  }, [isAdmin, isCheckingAdmin, user, navigate]);

  if (loading || isCheckingAdmin || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  if (!isAdmin) return null;

  const totalUsers = allProfiles.length;
  const todayLogins = loginLogs.filter(
    (l) => new Date(l.logged_in_at).toDateString() === new Date().toDateString()
  ).length;
  const thisWeekLogins = loginLogs.filter(
    (l) => Date.now() - new Date(l.logged_in_at).getTime() < 7 * 86400000
  ).length;
  const uniqueActiveUsers = new Set(
    loginLogs.filter((l) => Date.now() - new Date(l.logged_in_at).getTime() < 7 * 86400000).map((l) => l.user_id)
  ).size;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="font-heading text-2xl lg:text-3xl font-bold">Admin Dashboard</h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="text-xs text-muted-foreground">Totaal gebruikers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Activity className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{todayLogins}</p>
                  <p className="text-xs text-muted-foreground">Logins vandaag</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{thisWeekLogins}</p>
                  <p className="text-xs text-muted-foreground">Logins deze week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{uniqueActiveUsers}</p>
                  <p className="text-xs text-muted-foreground">Actieve gebruikers (7d)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Alle gebruikers ({totalUsers})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead>Geregistreerd</TableHead>
                  <TableHead>Laatste login</TableHead>
                  <TableHead>Totaal logins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProfiles.map((profile) => {
                  const userLogins = loginLogs.filter((l) => l.user_id === profile.user_id);
                  const lastLogin = userLogins[0];
                  return (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        {profile.full_name || 'Onbekend'}
                      </TableCell>
                      <TableCell>{formatDate(profile.created_at)}</TableCell>
                      <TableCell>
                        {lastLogin ? formatDate(lastLogin.logged_in_at) : (
                          <Badge variant="outline" className="text-muted-foreground">Nooit</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{userLogins.length}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Login Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recente login activiteit
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loginLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Nog geen login activiteit geregistreerd. Logins worden vanaf nu bijgehouden.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Tijdstip</TableHead>
                    <TableHead>Browser</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginLogs.slice(0, 50).map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.email}</TableCell>
                      <TableCell>{formatDate(log.logged_in_at)}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                        {log.user_agent ? (
                          log.user_agent.includes('Chrome') ? 'Chrome' :
                          log.user_agent.includes('Firefox') ? 'Firefox' :
                          log.user_agent.includes('Safari') ? 'Safari' :
                          log.user_agent.includes('Edge') ? 'Edge' : 'Overig'
                        ) : 'Onbekend'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
