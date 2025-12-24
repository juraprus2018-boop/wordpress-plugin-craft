import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { HouseholdMember } from './useTransactions';

export interface Debt {
  id: string;
  user_id: string;
  name: string;
  creditor: string | null;
  original_amount: number;
  remaining_amount: number;
  monthly_payment: number;
  day_of_month: number | null;
  member_id: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  household_members?: {
    id: string;
    name: string;
    color: string | null;
  } | null;
}

export function useDebts() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: debts = [], isLoading } = useQuery({
    queryKey: ['debts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('debts')
        .select('*, household_members(id, name, color)')
        .eq('user_id', user.id)
        .order('remaining_amount', { ascending: false });
      
      if (error) throw error;
      return data as Debt[];
    },
    enabled: !!user,
  });

  const { data: householdMembers = [] } = useQuery({
    queryKey: ['household_members', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('household_members')
        .select('*')
        .eq('user_id', user.id)
        .order('name');
      
      if (error) throw error;
      return data as HouseholdMember[];
    },
    enabled: !!user,
  });

  const addDebt = useMutation({
    mutationFn: async (debt: {
      name: string;
      creditor?: string;
      original_amount: number;
      remaining_amount: number;
      monthly_payment: number;
      day_of_month?: number | null;
      member_id?: string | null;
      description?: string;
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('debts')
        .insert({
          user_id: user.id,
          ...debt,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      toast.success('Schuld toegevoegd');
    },
    onError: (error) => {
      toast.error('Fout bij toevoegen: ' + error.message);
    },
  });

  const updateDebt = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Debt> & { id: string }) => {
      const { data, error } = await supabase
        .from('debts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      toast.success('Schuld bijgewerkt');
    },
    onError: (error) => {
      toast.error('Fout bij bijwerken: ' + error.message);
    },
  });

  const deleteDebt = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('debts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      toast.success('Schuld verwijderd');
    },
    onError: (error) => {
      toast.error('Fout bij verwijderen: ' + error.message);
    },
  });

  const makePayment = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      const debt = debts.find(d => d.id === id);
      if (!debt) throw new Error('Schuld niet gevonden');
      
      const newRemaining = Math.max(0, debt.remaining_amount - amount);
      
      const { data, error } = await supabase
        .from('debts')
        .update({ remaining_amount: newRemaining })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debts'] });
      toast.success('Betaling geregistreerd');
    },
    onError: (error) => {
      toast.error('Fout bij registreren: ' + error.message);
    },
  });

  const totalDebt = debts.reduce((sum, d) => sum + Number(d.remaining_amount), 0);
  const totalMonthlyPayments = debts.reduce((sum, d) => sum + Number(d.monthly_payment), 0);

  return {
    debts,
    householdMembers,
    totalDebt,
    totalMonthlyPayments,
    isLoading,
    addDebt,
    updateDebt,
    deleteDebt,
    makePayment,
  };
}
