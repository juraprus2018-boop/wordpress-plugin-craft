import { useEffect, useState, useMemo } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { useSubscriptions, CATEGORY_LABELS, CATEGORY_ICONS } from '@/hooks/useSubscriptions';
import { useDebts } from '@/hooks/useDebts';
import { useNotifications } from '@/hooks/useNotifications';
import { useOnboardingTour } from '@/hooks/useOnboardingTour';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NotificationPrompt } from '@/components/notifications/NotificationPrompt';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { TourTrigger } from '@/components/onboarding/TourTrigger';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, ReferenceLine } from 'recharts';
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Receipt,
  Users, Loader2, Landmark, CalendarCheck, ArrowUpRight, ArrowDownRight,
  Minus, ChevronRight, CircleDollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);

const formatCurrencyShort = (value: number) =>
  new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

export default function Dashboard() {
  useSEO({
    title: 'Dashboard - FinOverzicht',
    description: 'Bekijk je financieel overzicht in het dashboard.',
  });

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { transactions, householdMembers, isLoading } = useTransactions();
  const { debts, loans, totalAll, totalMonthlyPayments, isLoading: debtsLoading } = useDebts();
  const { activeSubscriptions, totalMonthly: subscriptionMonthly, isLoading: subsLoading, calculateMonthlyCost } = useSubscriptions();
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
    if (view === 'personal') return transactions.filter(t => !t.member_id || t.is_shared);
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
      const shouldDivide = t.is_shared && memberCount > 1;
      const effectiveAmount = shouldDivide ? monthlyAmount / memberCount : monthlyAmount;
      return { ...t, amount: effectiveAmount };
    });
  }, [filteredTransactions, memberCount, view]);

  const incomeTransactions = statsTransactions.filter(t => t.type === 'income');
  const expenseTransactions = statsTransactions.filter(t => t.type === 'expense');

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalTransactionExpenses = expenseTransactions.reduce((sum, t) => sum + Number(t.amount), 0);
  const totalSubscriptions = subscriptionMonthly;
  const totalExpenses = totalTransactionExpenses + totalSubscriptions;
  const totalDebtPayments = [...filteredDebts, ...filteredLoans].reduce((sum, d) => sum + Number(d.monthly_payment), 0);
  
  const netResult = totalIncome - totalExpenses - totalDebtPayments;
  const savingsRate = totalIncome > 0 ? (netResult / totalIncome) * 100 : 0;
  
  const totalDebtAmount = filteredDebts.reduce((sum, d) => sum + Number(d.remaining_amount), 0);
  const totalLoanAmount = filteredLoans.reduce((sum, l) => sum + Number(l.remaining_amount), 0);

  // Subscription breakdown by category for pie chart
  const subscriptionsByCategory = useMemo(() => {
    const cats: Record<string, number> = {};
    activeSubscriptions.forEach(sub => {
      const monthly = calculateMonthlyCost(sub);
      const label = CATEGORY_LABELS[sub.category] || sub.category;
      cats[label] = (cats[label] || 0) + monthly;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [activeSubscriptions, calculateMonthlyCost]);

  // Combined expense breakdown (transactions + subscriptions)
  const combinedExpenseBreakdown = useMemo(() => {
    const cats: Record<string, number> = {};
    expenseTransactions.forEach(t => {
      const cat = t.categories?.name || 'Overig';
      cats[cat] = (cats[cat] || 0) + Number(t.amount);
    });
    activeSubscriptions.forEach(sub => {
      const label = CATEGORY_LABELS[sub.category] || 'Abonnementen';
      cats[label] = (cats[label] || 0) + calculateMonthlyCost(sub);
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [expenseTransactions, activeSubscriptions, calculateMonthlyCost]);

  // Balance flow including subscriptions
  const balanceFlowData = useMemo(() => {
    const dailyData: { day: number; income: number; expense: number }[] = [];
    for (let day = 1; day <= 31; day++) {
      dailyData.push({ day, income: 0, expense: 0 });
    }
    statsTransactions.forEach((t) => {
      const dayOfMonth = t.day_of_month;
      if (dayOfMonth && dayOfMonth >= 1 && dayOfMonth <= 31) {
        if (t.type === 'income') {
          dailyData[dayOfMonth - 1].income += Number(t.amount);
        } else {
          dailyData[dayOfMonth - 1].expense += Number(t.amount);
        }
      }
    });
    // Spread subscriptions across their billing days
    activeSubscriptions.forEach(sub => {
      const day = sub.billing_day || 1;
      const monthlyAmount = calculateMonthlyCost(sub);
      if (day >= 1 && day <= 31) {
        dailyData[day - 1].expense += monthlyAmount;
      }
    });

    let runningBalance = 0;
    return dailyData.map((item) => {
      runningBalance += item.income - item.expense;
      return { day: item.day, saldo: runningBalance, inkomen: item.income, uitgaven: item.expense };
    });
  }, [statsTransactions, activeSubscriptions, calculateMonthlyCost]);

  if (loading || isLoading || debtsLoading || subsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Laden...</p>
      </div>
    );
  }

  const CHART_COLORS = [
    'hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))',
    'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))', 'hsl(var(--chart-7))',
  ];

  return (
    <DashboardLayout>
      <NotificationPrompt />
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

      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight">
              Financieel Overzicht
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Alles wat je maandelijks verdient, uitgeeft en overhoudt
            </p>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border/50 rounded-xl p-1">
            <div className="p-2 rounded-lg bg-muted/50">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger className="w-[160px] sm:w-[180px] border-0 bg-transparent focus:ring-0">
                <SelectValue placeholder="Filter op lid" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Samen (iedereen)</SelectItem>
                <SelectItem value="personal">Alleen mijn eigen</SelectItem>
                {householdMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: member.color || 'hsl(var(--muted-foreground))' }} />
                      {member.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Hero Summary Card ── */}
        <Card className="bg-gradient-to-br from-card to-muted/30 border-border/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* Income */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                  Inkomsten
                </div>
                <p className="text-lg sm:text-2xl font-bold text-success">{formatCurrency(totalIncome)}</p>
                <p className="text-[11px] text-muted-foreground">/maand</p>
              </div>
              {/* Total expenses */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
                  Totale uitgaven
                </div>
                <p className="text-lg sm:text-2xl font-bold text-destructive">{formatCurrency(totalExpenses + totalDebtPayments)}</p>
                <p className="text-[11px] text-muted-foreground">/maand</p>
              </div>
              {/* Net */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <Wallet className="h-3.5 w-3.5 text-primary" />
                  Vrij besteedbaar
                </div>
                <p className={cn("text-lg sm:text-2xl font-bold", netResult >= 0 ? "text-primary" : "text-destructive")}>
                  {formatCurrency(netResult)}
                </p>
                <p className="text-[11px] text-muted-foreground">/maand</p>
              </div>
              {/* Savings rate */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <PiggyBank className="h-3.5 w-3.5 text-success" />
                  Spaarquote
                </div>
                <p className={cn("text-lg sm:text-2xl font-bold", savingsRate >= 0 ? "text-success" : "text-destructive")}>
                  {savingsRate.toFixed(1)}%
                </p>
                <p className="text-[11px] text-muted-foreground">van inkomen</p>
              </div>
            </div>

            {/* Visual breakdown bar */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Verdeling van je inkomen</span>
                <span>{formatCurrency(totalIncome)}</span>
              </div>
              {totalIncome > 0 ? (
                <div className="flex h-3 rounded-full overflow-hidden bg-muted">
                  {totalTransactionExpenses > 0 && (
                    <div
                      className="bg-destructive/80 transition-all"
                      style={{ width: `${Math.min((totalTransactionExpenses / totalIncome) * 100, 100)}%` }}
                      title={`Vaste uitgaven: ${formatCurrency(totalTransactionExpenses)}`}
                    />
                  )}
                  {totalSubscriptions > 0 && (
                    <div
                      className="bg-accent/80 transition-all"
                      style={{ width: `${Math.min((totalSubscriptions / totalIncome) * 100, 100)}%` }}
                      title={`Abonnementen: ${formatCurrency(totalSubscriptions)}`}
                    />
                  )}
                  {totalDebtPayments > 0 && (
                    <div
                      className="bg-warning/80 transition-all"
                      style={{ width: `${Math.min((totalDebtPayments / totalIncome) * 100, 100)}%` }}
                      title={`Aflossingen: ${formatCurrency(totalDebtPayments)}`}
                    />
                  )}
                  {netResult > 0 && (
                    <div
                      className="bg-success/60 transition-all"
                      style={{ width: `${Math.min((netResult / totalIncome) * 100, 100)}%` }}
                      title={`Over: ${formatCurrency(netResult)}`}
                    />
                  )}
                </div>
              ) : (
                <div className="h-3 rounded-full bg-muted" />
              )}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                {totalTransactionExpenses > 0 && (
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive/80" /> Uitgaven {formatCurrency(totalTransactionExpenses)}</span>
                )}
                {totalSubscriptions > 0 && (
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent/80" /> Abonnementen {formatCurrency(totalSubscriptions)}</span>
                )}
                {totalDebtPayments > 0 && (
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning/80" /> Aflossingen {formatCurrency(totalDebtPayments)}</span>
                )}
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success/60" /> Over {formatCurrency(Math.max(netResult, 0))}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Detail KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <MiniKPI label="Vaste uitgaven" value={formatCurrency(totalTransactionExpenses)} icon={<TrendingDown className="h-4 w-4" />} color="text-destructive" />
          <MiniKPI label="Abonnementen" value={formatCurrency(totalSubscriptions)} icon={<CalendarCheck className="h-4 w-4" />} color="text-accent" />
          <MiniKPI label="Schulden" value={formatCurrency(totalDebtAmount)} icon={<CreditCard className="h-4 w-4" />} color="text-warning" />
          <MiniKPI label="Aflossing/mnd" value={formatCurrency(totalDebtPayments)} icon={<Receipt className="h-4 w-4" />} color="text-muted-foreground" />
        </div>

        {/* ── Charts Row ── */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Balance flow */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Saldo verloop per maand</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={balanceFlowData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="saldoGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={formatCurrencyShort} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      formatter={(value: number) => [formatCurrency(value), 'Saldo']}
                      labelFormatter={(day) => `Dag ${day}`}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', fontSize: '0.875rem' }}
                    />
                    <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                    <Area type="monotone" dataKey="saldo" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#saldoGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expense distribution pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Waar gaat je geld naartoe?</CardTitle>
              <CardDescription className="text-xs">Uitgaven + abonnementen per categorie</CardDescription>
            </CardHeader>
            <CardContent>
              {combinedExpenseBreakdown.length === 0 ? (
                <div className="h-[260px] flex items-center justify-center text-muted-foreground text-sm">
                  Nog geen uitgaven
                </div>
              ) : (
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={combinedExpenseBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                        {combinedExpenseBreakdown.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem', fontSize: '0.875rem' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              {combinedExpenseBreakdown.length > 0 && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {combinedExpenseBreakdown.slice(0, 6).map((item, i) => (
                    <span key={item.name} className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                      {item.name}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Income vs Expenses bar ── */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-heading">Inkomsten vs. Totale lasten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Inkomsten', bedrag: totalIncome, fill: 'hsl(var(--chart-income))' },
                    { name: 'Uitgaven', bedrag: totalTransactionExpenses, fill: 'hsl(var(--chart-expense))' },
                    { name: 'Abonnementen', bedrag: totalSubscriptions, fill: 'hsl(var(--accent))' },
                    { name: 'Aflossingen', bedrag: totalDebtPayments, fill: 'hsl(var(--warning))' },
                  ]}
                  layout="vertical"
                  margin={{ left: 10, right: 10 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical stroke="hsl(var(--border))" />
                  <XAxis type="number" tickFormatter={formatCurrencyShort} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.75rem' }} />
                  <Bar dataKey="bedrag" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ── Subscriptions list ── */}
        {activeSubscriptions.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-heading">Actieve abonnementen</CardTitle>
                <Badge variant="secondary">{activeSubscriptions.length} actief</Badge>
              </div>
              <CardDescription className="text-xs">Totaal: {formatCurrency(totalSubscriptions)}/maand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {activeSubscriptions.map(sub => {
                  const monthly = calculateMonthlyCost(sub);
                  return (
                    <div key={sub.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-lg shrink-0">{CATEGORY_ICONS[sub.category] || '📦'}</span>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{sub.name}</p>
                          <p className="text-[11px] text-muted-foreground">{CATEGORY_LABELS[sub.category]}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-sm text-destructive shrink-0">{formatCurrency(monthly)}/mnd</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Transaction Breakdown ── */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Income list */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Inkomsten</CardTitle>
              <CardDescription className="text-xs">Genormaliseerd naar maandbedragen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-3">
                <span className="text-xs text-muted-foreground">Totaal</span>
                <span className="text-lg font-bold text-success">{formatCurrency(totalIncome)}</span>
              </div>
              {incomeTransactions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">Geen inkomsten</p>
              ) : (
                <ScrollArea className="h-[280px]">
                  {incomeTransactions.map(t => (
                    <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{t.name}</p>
                        <p className="text-[11px] text-muted-foreground">{t.categories?.name || 'Geen categorie'}</p>
                      </div>
                      <span className="font-semibold text-sm text-success shrink-0">+{formatCurrency(Number(t.amount))}</span>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
          </Card>

          {/* Expense list (transactions + subscriptions) */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-heading">Uitgaven & Abonnementen</CardTitle>
              <CardDescription className="text-xs">Alles wat je maandelijks uitgeeft</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-3">
                <span className="text-xs text-muted-foreground">Totaal</span>
                <span className="text-lg font-bold text-destructive">{formatCurrency(totalExpenses)}</span>
              </div>
              <ScrollArea className="h-[280px]">
                {expenseTransactions.map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.categories?.name || 'Geen categorie'}</p>
                    </div>
                    <span className="font-semibold text-sm text-destructive shrink-0">-{formatCurrency(Number(t.amount))}</span>
                  </div>
                ))}
                {activeSubscriptions.map(sub => {
                  const monthly = calculateMonthlyCost(sub);
                  return (
                    <div key={sub.id} className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm">{CATEGORY_ICONS[sub.category] || '📦'}</span>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{sub.name}</p>
                          <p className="text-[11px] text-muted-foreground">{CATEGORY_LABELS[sub.category]} • Abonnement</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm text-destructive shrink-0">-{formatCurrency(monthly)}</span>
                    </div>
                  );
                })}
                {expenseTransactions.length === 0 && activeSubscriptions.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-6">Geen uitgaven</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MiniKPI({ label, value, icon, color }: { label: string; value: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-card border border-border/50 p-3 sm:p-4">
      <div className={cn("shrink-0", color)}>{icon}</div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground truncate">{label}</p>
        <p className="text-sm sm:text-base font-bold truncate">{value}</p>
      </div>
    </div>
  );
}
