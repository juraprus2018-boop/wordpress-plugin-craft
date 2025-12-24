import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionList } from '@/components/transactions/TransactionList';

export default function Expenses() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { expenseTransactions, expenseCategories, householdMembers, addTransaction, updateTransaction, deleteTransaction } = useTransactions();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Laden...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">Uitgaven</h1>
        <TransactionList
          type="expense"
          transactions={expenseTransactions}
          categories={expenseCategories}
          householdMembers={householdMembers}
          onAdd={(data) => addTransaction.mutate(data)}
          onUpdate={(data) => updateTransaction.mutate(data)}
          onDelete={(id) => deleteTransaction.mutate(id)}
        />
      </div>
    </DashboardLayout>
  );
}