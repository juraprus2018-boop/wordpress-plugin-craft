import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { ExpenseChart } from '@/components/dashboard/ExpenseChart';
import { IncomeExpenseChart } from '@/components/dashboard/IncomeExpenseChart';
import { BalanceFlowChart } from '@/components/dashboard/BalanceFlowChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { transactions, totalIncome, totalExpenses, netResult, savingsRate, isLoading } = useTransactions();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Laden...</div>;
  }

  const formatCurrency = (value: number) => new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Totale Inkomsten" value={formatCurrency(totalIncome)} icon={<TrendingUp className="h-6 w-6" />} />
          <KPICard title="Totale Uitgaven" value={formatCurrency(totalExpenses)} icon={<TrendingDown className="h-6 w-6" />} />
          <KPICard title="Netto Resultaat" value={formatCurrency(netResult)} icon={<Wallet className="h-6 w-6" />} trend={netResult >= 0 ? 'up' : 'down'} />
          <KPICard title="Spaarquote" value={`${savingsRate.toFixed(1)}%`} icon={<PiggyBank className="h-6 w-6" />} />
        </div>

        <BalanceFlowChart transactions={transactions} />

        <div className="grid lg:grid-cols-2 gap-6">
          <IncomeExpenseChart totalIncome={totalIncome} totalExpenses={totalExpenses} />
          <ExpenseChart transactions={transactions} />
        </div>

        <RecentTransactions transactions={transactions} />
      </div>
    </DashboardLayout>
  );
}