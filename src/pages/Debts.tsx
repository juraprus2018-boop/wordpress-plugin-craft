import { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { useDebts } from '@/hooks/useDebts';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DebtList } from '@/components/debts/DebtList';

export default function Debts() {
  useSEO({
    title: 'Schulden - FinOverzicht',
    description: 'Beheer je schulden in FinOverzicht. Houd aflossingen bij en volg je voortgang naar schuldenvrij.',
  });

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { debts, loans, householdMembers, totalDebt, totalDebtMonthlyPayments, totalLoans, totalLoanMonthlyPayments, addDebt, updateDebt, deleteDebt, makePayment } = useDebts();

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Laden...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="font-heading text-2xl lg:text-3xl font-bold">Schulden & Leningen</h1>
        <DebtList
          debts={debts}
          loans={loans}
          householdMembers={householdMembers}
          totalDebt={totalDebt}
          totalDebtMonthlyPayments={totalDebtMonthlyPayments}
          totalLoans={totalLoans}
          totalLoanMonthlyPayments={totalLoanMonthlyPayments}
          onAdd={(data) => addDebt.mutate(data)}
          onUpdate={(data) => updateDebt.mutate({ id: data.id, ...data })}
          onDelete={(id) => deleteDebt.mutate(id)}
          onPayment={(data) => makePayment.mutate(data)}
        />
      </div>
    </DashboardLayout>
  );
}
