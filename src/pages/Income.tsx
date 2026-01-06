import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useTransactions } from '@/hooks/useTransactions';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TransactionList } from '@/components/transactions/TransactionList';

export default function Income() {
  useSEO({
    title: 'Inkomsten - FinOverzicht',
    description: 'Beheer je inkomsten in FinOverzicht. Voeg salaris, bijverdiensten en andere inkomstenbronnen toe.',
  });

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { incomeTransactions, incomeCategories, householdMembers, addTransaction, updateTransaction, deleteTransaction, addHouseholdMember } = useTransactions();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Laden...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">Inkomsten</h1>
        <TransactionList
          type="income"
          transactions={incomeTransactions}
          categories={incomeCategories}
          householdMembers={householdMembers}
          onAdd={(data) => addTransaction.mutate(data)}
          onUpdate={(data) => updateTransaction.mutate(data)}
          onDelete={(id) => deleteTransaction.mutate(id)}
          onAddMember={(data) => addHouseholdMember.mutate(data)}
        />
      </div>
    </DashboardLayout>
  );
}