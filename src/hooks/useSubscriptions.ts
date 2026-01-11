import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export type SubscriptionCategory = 
  | 'streaming'
  | 'internet_telecom'
  | 'energy'
  | 'water'
  | 'insurance'
  | 'sports_fitness'
  | 'software'
  | 'news_magazines'
  | 'music'
  | 'gaming'
  | 'cloud_storage'
  | 'food_delivery'
  | 'transportation'
  | 'education'
  | 'other';

export type BillingCycle = 'weekly' | 'monthly' | 'quarterly' | 'half_yearly' | 'yearly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'paused' | 'expired';

export interface Subscription {
  id: string;
  user_id: string;
  name: string;
  provider: string | null;
  category: SubscriptionCategory;
  amount: number;
  billing_cycle: BillingCycle;
  billing_day: number | null;
  status: SubscriptionStatus;
  contract_start_date: string | null;
  contract_end_date: string | null;
  cancellation_period_days: number | null;
  auto_renewal: boolean | null;
  next_billing_date: string | null;
  website: string | null;
  notes: string | null;
  member_id: string | null;
  is_shared: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionInsert {
  name: string;
  provider?: string | null;
  category: SubscriptionCategory;
  amount: number;
  billing_cycle: BillingCycle;
  billing_day?: number | null;
  status?: SubscriptionStatus;
  contract_start_date?: string | null;
  contract_end_date?: string | null;
  cancellation_period_days?: number | null;
  auto_renewal?: boolean | null;
  next_billing_date?: string | null;
  website?: string | null;
  notes?: string | null;
  member_id?: string | null;
  is_shared?: boolean | null;
}

export const CATEGORY_LABELS: Record<SubscriptionCategory, string> = {
  streaming: 'TV & Streaming',
  internet_telecom: 'Internet & Telecom',
  energy: 'Energie (Gas & Elektra)',
  water: 'Water',
  insurance: 'Verzekeringen',
  sports_fitness: 'Sport & Fitness',
  software: 'Software & Apps',
  news_magazines: 'Nieuws & Tijdschriften',
  music: 'Muziek',
  gaming: 'Gaming',
  cloud_storage: 'Cloud Opslag',
  food_delivery: 'Maaltijdbezorging',
  transportation: 'Vervoer',
  education: 'Educatie',
  other: 'Overig'
};

export const CATEGORY_ICONS: Record<SubscriptionCategory, string> = {
  streaming: '📺',
  internet_telecom: '📱',
  energy: '⚡',
  water: '💧',
  insurance: '🛡️',
  sports_fitness: '💪',
  software: '💻',
  news_magazines: '📰',
  music: '🎵',
  gaming: '🎮',
  cloud_storage: '☁️',
  food_delivery: '🍔',
  transportation: '🚗',
  education: '📚',
  other: '📦'
};

export const CATEGORY_COLORS: Record<SubscriptionCategory, string> = {
  streaming: '#E50914',
  internet_telecom: '#0066CC',
  energy: '#F59E0B',
  water: '#3B82F6',
  insurance: '#10B981',
  sports_fitness: '#8B5CF6',
  software: '#6366F1',
  news_magazines: '#EC4899',
  music: '#1DB954',
  gaming: '#EF4444',
  cloud_storage: '#06B6D4',
  food_delivery: '#F97316',
  transportation: '#84CC16',
  education: '#A855F7',
  other: '#6B7280'
};

export const BILLING_CYCLE_LABELS: Record<BillingCycle, string> = {
  weekly: 'Wekelijks',
  monthly: 'Maandelijks',
  quarterly: 'Per kwartaal',
  half_yearly: 'Halfjaarlijks',
  yearly: 'Jaarlijks'
};

export const BILLING_CYCLE_MONTHS: Record<BillingCycle, number> = {
  weekly: 0.25,
  monthly: 1,
  quarterly: 3,
  half_yearly: 6,
  yearly: 12
};

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  active: 'Actief',
  cancelled: 'Opgezegd',
  paused: 'Gepauzeerd',
  expired: 'Verlopen'
};

export const useSubscriptions = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: subscriptions = [], isLoading, error } = useQuery({
    queryKey: ['subscriptions', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('category', { ascending: true })
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as Subscription[];
    },
    enabled: !!user?.id,
  });

  const createSubscription = useMutation({
    mutationFn: async (subscription: SubscriptionInsert) => {
      if (!user?.id) throw new Error('Niet ingelogd');
      
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          ...subscription,
          user_id: user.id,
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Abonnement toegevoegd');
    },
    onError: (error) => {
      toast.error('Fout bij toevoegen: ' + error.message);
    },
  });

  const updateSubscription = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Subscription> & { id: string }) => {
      const { data, error } = await supabase
        .from('subscriptions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Abonnement bijgewerkt');
    },
    onError: (error) => {
      toast.error('Fout bij bijwerken: ' + error.message);
    },
  });

  const deleteSubscription = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      toast.success('Abonnement verwijderd');
    },
    onError: (error) => {
      toast.error('Fout bij verwijderen: ' + error.message);
    },
  });

  // Calculate monthly costs
  const calculateMonthlyCost = (subscription: Subscription): number => {
    const months = BILLING_CYCLE_MONTHS[subscription.billing_cycle];
    return subscription.amount / months;
  };

  const activeSubscriptions = subscriptions.filter(s => s.status === 'active');
  
  const totalMonthly = activeSubscriptions.reduce(
    (sum, sub) => sum + calculateMonthlyCost(sub),
    0
  );

  const totalYearly = totalMonthly * 12;

  const costsByCategory = activeSubscriptions.reduce((acc, sub) => {
    const monthly = calculateMonthlyCost(sub);
    acc[sub.category] = (acc[sub.category] || 0) + monthly;
    return acc;
  }, {} as Record<SubscriptionCategory, number>);

  // Get subscriptions with upcoming renewals (next 30 days)
  const upcomingRenewals = activeSubscriptions
    .filter(sub => {
      if (!sub.next_billing_date) return false;
      const nextDate = new Date(sub.next_billing_date);
      const today = new Date();
      const diffDays = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 30;
    })
    .sort((a, b) => {
      if (!a.next_billing_date || !b.next_billing_date) return 0;
      return new Date(a.next_billing_date).getTime() - new Date(b.next_billing_date).getTime();
    });

  // Get subscriptions with contract ending soon (next 60 days)
  const expiringContracts = activeSubscriptions
    .filter(sub => {
      if (!sub.contract_end_date) return false;
      const endDate = new Date(sub.contract_end_date);
      const today = new Date();
      const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 60;
    })
    .sort((a, b) => {
      if (!a.contract_end_date || !b.contract_end_date) return 0;
      return new Date(a.contract_end_date).getTime() - new Date(b.contract_end_date).getTime();
    });

  return {
    subscriptions,
    activeSubscriptions,
    isLoading,
    error,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    calculateMonthlyCost,
    totalMonthly,
    totalYearly,
    costsByCategory,
    upcomingRenewals,
    expiringContracts,
  };
};
