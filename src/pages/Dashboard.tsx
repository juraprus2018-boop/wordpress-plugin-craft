import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { useDebts } from '@/hooks/useDebts';
import { useNotifications } from '@/hooks/useNotifications';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { IncomeExpenseChart } from '@/components/dashboard/IncomeExpenseChart';
import { BalanceFlowChart } from '@/components/dashboard/BalanceFlowChart';
import { SharedExpenseBalance } from '@/components/dashboard/SharedExpenseBalance';
import { TransactionBreakdown } from '@/components/dashboard/TransactionBreakdown';
import { NotificationPrompt } from '@/components/notifications/NotificationPrompt';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Receipt, Users } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { transactions, householdMembers, isLoading } = useTransactions();
  const { debts, isLoading: debtsLoading } = useDebts();
  const { checkAndNotifyPayments, permission } = useNotifications();
  const [selectedMember, setSelectedMember] = useState<string>('all');

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  // Check for payment reminders when data loads
  useEffect(() => {
    if (!isLoading && !debtsLoading && permission === 'granted') {
      checkAndNotifyPayments(transactions, debts);
    }
  }, [isLoading, debtsLoading, transactions, debts, permission, checkAndNotifyPayments]);

  const view: 'all' | 'personal' | 'member' =
    selectedMember === 'all' ? 'all' : selectedMember === 'personal' ? 'personal' : 'member';

  // Filter transactions by selected view
  // - "all": show everything (totals)
  // - "personal": show transactions without member_id + shared expenses (user's share)
  // - "member": show that member's transactions + shared expenses (member's share)
  const filteredTransactions = useMemo(() => {
    if (view === 'all') return transactions;
    if (view === 'personal') {
      // Show non-assigned transactions + shared expenses (which belong to everyone)
      return transactions.filter(t => !t.member_id || t.is_shared);
    }
    return transactions.filter(t => t.member_id === selectedMember || t.is_shared);
  }, [transactions, selectedMember, view]);

  const filteredDebts = useMemo(() => {
    if (selectedMember === 'all') return debts;
    if (selectedMember === 'personal') return debts.filter(d => !d.member_id);
    return debts.filter(d => d.member_id === selectedMember);
  }, [debts, selectedMember]);

  // Helper function to normalize amounts to monthly basis
  const normalizeToMonthly = (amount: number, frequency: number | null) => {
    const freq = frequency || 1;
    return amount / freq;
  };

  const memberCount = Math.max(householdMembers.length, 1);

  // For dashboard statistics we show monthly amounts.
  // When NOT in "all" view, shared expenses are divided by member count.
  const statsTransactions = useMemo(() => {
    return filteredTransactions.map((t) => {
      const monthlyAmount = normalizeToMonthly(Number(t.amount), t.frequency);
      // Divide shared expenses when viewing personal or member
      const shouldDivide = t.is_shared && view !== 'all' && memberCount > 1;
      const effectiveAmount = shouldDivide ? monthlyAmount / memberCount : monthlyAmount;
      return { ...t, amount: effectiveAmount };
    });
  }, [filteredTransactions, memberCount, view]);

  const incomeTransactions = statsTransactions.filter(t => t.type === 'income');
  const expenseTransactions = statsTransactions.filter(t => t.type === 'expense');

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

  const netResult = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  const totalDebt = filteredDebts.reduce((sum, d) => sum + Number(d.remaining_amount), 0);
  const totalMonthlyPayments = filteredDebts.reduce((sum, d) => sum + Number(d.monthly_payment), 0);

  if (loading || isLoading || debtsLoading) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  const formatCurrency = (value: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <DashboardLayout>
      <NotificationPrompt />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-heading text-2xl lg:text-3xl font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter op lid" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Samen (iedereen)</SelectItem>
                <SelectItem value="personal">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Alleen mijn eigen
                  </span>
                </SelectItem>
                {householdMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <span className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: member.color || 'hsl(var(--muted-foreground))' }}
                      />
                      {member.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <KPICard title="Totale Inkomsten" value={formatCurrency(totalIncome)} icon={<TrendingUp className="h-6 w-6" />} />
          <KPICard title="Totale Uitgaven" value={formatCurrency(totalExpenses)} icon={<TrendingDown className="h-6 w-6" />} />
          <KPICard title="Netto Resultaat" value={formatCurrency(netResult)} icon={<Wallet className="h-6 w-6" />} trend={netResult >= 0 ? 'up' : 'down'} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard title="Openstaande Schulden" value={formatCurrency(totalDebt)} icon={<CreditCard className="h-6 w-6" />} />
          <KPICard title="Maandelijkse Aflossing" value={formatCurrency(totalMonthlyPayments)} icon={<Receipt className="h-6 w-6" />} />
          <KPICard title="Spaarquote" value={`${savingsRate.toFixed(1)}%`} icon={<PiggyBank className="h-6 w-6" />} />
        </div>

        <BalanceFlowChart transactions={statsTransactions} />

        <div className="grid lg:grid-cols-2 gap-6">
          <IncomeExpenseChart totalIncome={totalIncome} totalExpenses={totalExpenses} />
          <ExpenseChart transactions={statsTransactions} />
        </div>

        {/* Shared expense balance - only show when there are household members */}
        {householdMembers.length > 0 && (
          <SharedExpenseBalance transactions={transactions} householdMembers={householdMembers} />
        )}

        <TransactionBreakdown transactions={filteredTransactions} memberCount={memberCount} view={view} />
        {/* Donatie Card */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-2xl">☕</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-heading font-semibold text-lg mb-1">Heeft FinOverzicht je geholpen?</h3>
              <p className="text-sm text-muted-foreground">
                FinOverzicht is gratis. Wil je ons steunen? Doneer een klein bedrag via Tikkie!
              </p>
            </div>
            <a 
              href="https://tikkie.me/pay/JOUW-TIKKIE-LINK" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="shrink-0 border-primary/30 hover:bg-primary/10 hover:border-primary/50">
                <span className="mr-2">💚</span>
                Doneer via Tikkie
              </Button>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}