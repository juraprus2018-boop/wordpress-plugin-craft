import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/lib/auth';
import { toast } from 'sonner';

export interface Transaction {
  id: string;
  user_id: string;
  category_id: string | null;
  type: 'income' | 'expense';
  name: string;
  amount: number;
  description: string | null;
  is_recurring: boolean;
  day_of_month: number | null;
  frequency: number | null;
  member_id: string | null;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  categories?: {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
  } | null;
  household_members?: {
    id: string;
    name: string;
    color: string | null;
  } | null;
}

export interface HouseholdMember {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string | null;
  color: string | null;
  is_default: boolean;
  created_at: string;
}

export function useTransactions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*, categories(id, name, icon, color), household_members(id, name, color)')
        .eq('user_id', user.id)
        .order('day_of_month', { ascending: true, nullsFirst: false });
      
      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!user,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('name');
      
      if (error) throw error;
      return data as Category[];
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

  const addTransaction = useMutation({
    mutationFn: async (transaction: {
      type: 'income' | 'expense';
      name: string;
      amount: number;
      category_id: string | null;
      description?: string;
      is_recurring?: boolean;
      day_of_month?: number | null;
      frequency?: number | null;
      member_id?: string | null;
      is_shared?: boolean;
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          ...transaction,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transactie toegevoegd');
    },
    onError: (error) => {
      toast.error('Fout bij toevoegen: ' + error.message);
    },
  });

  const addHouseholdMember = useMutation({
    mutationFn: async (member: { name: string; color?: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('household_members')
        .insert({
          user_id: user.id,
          ...member,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['household_members'] });
      toast.success('Gezinslid toegevoegd');
    },
    onError: (error) => {
      toast.error('Fout bij toevoegen: ' + error.message);
    },
  });

  const deleteHouseholdMember = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('household_members')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['household_members'] });
      toast.success('Gezinslid verwijderd');
    },
    onError: (error) => {
      toast.error('Fout bij verwijderen: ' + error.message);
    },
  });

  const updateTransaction = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Transaction> & { id: string }) => {
      const { data, error } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transactie bijgewerkt');
    },
    onError: (error) => {
      toast.error('Fout bij bijwerken: ' + error.message);
    },
  });

  const deleteTransaction = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transactie verwijderd');
    },
    onError: (error) => {
      toast.error('Fout bij verwijderen: ' + error.message);
    },
  });

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // Helper function to normalize amounts to monthly basis
  const normalizeToMonthly = (amount: number, frequency: number | null) => {
    const freq = frequency || 1;
    return amount / freq;
  };
  
  // Calculate totals normalized to monthly amounts
  const totalIncome = incomeTransactions.reduce((sum, t) => 
    sum + normalizeToMonthly(Number(t.amount), t.frequency), 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => 
    sum + normalizeToMonthly(Number(t.amount), t.frequency), 0);
  
  // Raw totals (not normalized) for other uses
  const rawTotalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const rawTotalExpenses = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  
  const netResult = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

  return {
    transactions,
    incomeTransactions,
    expenseTransactions,
    categories,
    incomeCategories,
    expenseCategories,
    householdMembers,
    totalIncome,
    totalExpenses,
    rawTotalIncome,
    rawTotalExpenses,
    netResult,
    savingsRate,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addHouseholdMember,
    deleteHouseholdMember,
  };
}