import { useEffect, useState, useMemo } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { useDebts } from '@/hooks/useDebts';
import { useNotifications } from '@/hooks/useNotifications';
import { useOnboardingTour } from '@/hooks/useOnboardingTour';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { IncomeExpenseChart } from '@/components/dashboard/IncomeExpenseChart';
import { BalanceFlowChart } from '@/components/dashboard/BalanceFlowChart';
import { YearlyProjectionChart } from '@/components/dashboard/YearlyProjectionChart';
import { SharedExpenseBalance } from '@/components/dashboard/SharedExpenseBalance';
import { TransactionBreakdown } from '@/components/dashboard/TransactionBreakdown';
import { NotificationPrompt } from '@/components/notifications/NotificationPrompt';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { TourTrigger } from '@/components/onboarding/TourTrigger';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Receipt, Users, Coffee, Loader2, Landmark } from 'lucide-react';

export default function Dashboard() {
  useSEO({
    title: 'Dashboard - FinOverzicht',
    description: 'Bekijk je financieel overzicht in het dashboard. Inkomsten, uitgaven, schulden en spaarpercentage in één oogopslag.',
  });

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { transactions, householdMembers, isLoading } = useTransactions();
  const { debts, loans, totalAll, totalMonthlyPayments, isLoading: debtsLoading } = useDebts();
  const { checkAndNotifyPayments, permission } = useNotifications();
  const tour = useOnboardingTour();
  const [selectedMember, setSelectedMember] = useState<string>('all');

  const allDebtsAndLoans = useMemo(() => [...debts, ...loans], [debts, loans]);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!isLoading && !debtsLoading && permission === 'granted') {
      checkAndNotifyPayments(transactions, allDebtsAndLoans);
    }
  }, [isLoading, debtsLoading, transactions, allDebtsAndLoans, permission, checkAndNotifyPayments]);

  const view: 'all' | 'personal' | 'member' =
    selectedMember === 'all' ? 'all' : selectedMember === 'personal' ? 'personal' : 'member';

  const filteredTransactions = useMemo(() => {
    if (view === 'all') return transactions;
    if (view === 'personal') {
      return transactions.filter(t => !t.member_id || t.is_shared);
    }
    return transactions.filter(t => t.member_id === selectedMember || t.is_shared);
  }, [transactions, selectedMember, view]);

  const filteredDebts = useMemo(() => {
    if (selectedMember === 'all') return debts;
    if (selectedMember === 'personal') return debts.filter(d => !d.member_id);
    return debts.filter(d => d.member_id === selectedMember);
  }, [debts, selectedMember]);

  const filteredLoans = useMemo(() => {
    if (selectedMember === 'all') return loans;
    if (selectedMember === 'personal') return loans.filter(l => !l.member_id);
    return loans.filter(l => l.member_id === selectedMember);
  }, [loans, selectedMember]);

  const normalizeToMonthly = (amount: number, frequency: number | null) => {
    const freq = frequency || 1;
    return amount / freq;
  };

  const memberCount = Math.max(householdMembers.length + 1, 1);

  const statsTransactions = useMemo(() => {
    return filteredTransactions.map((t) => {
      const monthlyAmount = normalizeToMonthly(Number(t.amount), t.frequency);
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

  const totalDebtAmount = filteredDebts.reduce((sum, d) => sum + Number(d.remaining_amount), 0);
  const totalDebtPayments = filteredDebts.reduce((sum, d) => sum + Number(d.monthly_payment), 0);
  const totalLoanAmount = filteredLoans.reduce((sum, l) => sum + Number(l.remaining_amount), 0);
  const totalLoanPayments = filteredLoans.reduce((sum, l) => sum + Number(l.monthly_payment), 0);
  const totalDebtAndLoans = totalDebtAmount + totalLoanAmount;
  const totalAllPayments = totalDebtPayments + totalLoanPayments;

  if (loading || isLoading || debtsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Laden...</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <DashboardLayout>
      <NotificationPrompt />
      
      {/* Onboarding Tour */}
      <OnboardingTour
        isActive={tour.isActive}
        currentStep={tour.currentStep}
        totalSteps={tour.totalSteps}
        stepData={tour.currentStepData}
        onNext={tour.nextStep}
        onPrev={tour.prevStep}
        onSkip={tour.skipTour}
        onComplete={tour.completeTour}
      />
      <TourTrigger onStartTour={tour.startTour} hasCompleted={tour.hasCompleted} />
      
      <div className="space-y-4 sm:space-y-6 pb-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div data-tour="dashboard-title">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
                Jouw financiële overzicht op één plek
              </p>
            </div>
            
            <div data-tour="member-filter" className="flex items-center gap-2 bg-card border border-border/50 rounded-xl p-1">
              <div className="p-2 rounded-lg bg-muted/50">
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="w-[160px] sm:w-[180px] border-0 bg-transparent focus:ring-0">
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
        </div>
        
        {/* Main KPIs - Mobile optimized 2x3 grid */}
        <div data-tour="kpi-cards" className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <KPICard 
            title="Inkomsten" 
            value={formatCurrency(totalIncome)} 
            icon={<TrendingUp className="w-full h-full" />} 
            variant="success"
          />
          <KPICard 
            title="Uitgaven" 
            value={formatCurrency(totalExpenses)} 
            icon={<TrendingDown className="w-full h-full" />} 
            variant="accent"
          />
          <KPICard 
            title="Netto" 
            value={formatCurrency(netResult)} 
            icon={<Wallet className="w-full h-full" />} 
            trend={netResult >= 0 ? 'up' : 'down'}
          />
          <KPICard 
            title="Schulden" 
            value={formatCurrency(totalDebtAmount)} 
            icon={<CreditCard className="w-full h-full" />} 
            variant="warning"
          />
          <KPICard 
            title="Leningen" 
            value={formatCurrency(totalLoanAmount)} 
            icon={<Landmark className="w-full h-full" />} 
          />
          <KPICard 
            title="Aflossing/mnd" 
            value={formatCurrency(totalAllPayments)} 
            icon={<Receipt className="w-full h-full" />} 
          />
          <KPICard 
            title="Spaarquote" 
            value={`${savingsRate.toFixed(1)}%`} 
            icon={<PiggyBank className="w-full h-full" />} 
            variant="success"
          />
        </div>

        {/* Charts */}
        <div className="space-y-4 sm:space-y-6">
          <BalanceFlowChart transactions={statsTransactions} />

          <YearlyProjectionChart transactions={statsTransactions} debts={[...filteredDebts, ...filteredLoans]} />

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            <IncomeExpenseChart totalIncome={totalIncome} totalExpenses={totalExpenses} />
            <ExpenseChart transactions={statsTransactions} />
          </div>

          {householdMembers.length > 0 && (
            <SharedExpenseBalance transactions={transactions} householdMembers={householdMembers} />
          )}

          <TransactionBreakdown transactions={filteredTransactions} memberCount={memberCount} view={view} />
          
          {/* Donation Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/50 p-5 sm:p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                <Coffee className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-heading font-bold text-lg sm:text-xl mb-1">
                  Vind je FinOverzicht handig?
                </h3>
                <p className="text-sm text-muted-foreground">
                  FinOverzicht is gratis. Wil je ons steunen? Doneer een klein bedrag!
                </p>
              </div>
              <a 
                href="https://tikkie.me/pay/JOUW-TIKKIE-LINK" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button 
                  className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6"
                >
                  <span className="mr-2">💚</span>
                  Doneer via Tikkie
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
