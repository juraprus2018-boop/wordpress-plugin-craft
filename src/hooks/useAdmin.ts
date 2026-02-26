import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';

export function useAdmin() {
  const { user } = useAuth();

  const { data: isAdmin, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ['admin-check', user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });
      if (error) return false;
      return data as boolean;
    },
    enabled: !!user,
  });

  const { data: allProfiles, isLoading: isLoadingProfiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: loginLogs, isLoading: isLoadingLogs } = useQuery({
    queryKey: ['admin-login-logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_login_logs' as any)
        .select('*')
        .order('logged_in_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as any[];
    },
    enabled: !!isAdmin,
  });

  return {
    isAdmin: !!isAdmin,
    isCheckingAdmin,
    allProfiles: allProfiles || [],
    loginLogs: loginLogs || [],
    isLoading: isLoadingProfiles || isLoadingLogs,
  };
}
