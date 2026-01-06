import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/hooks/useTransactions';
import { Debt } from '@/hooks/useDebts';
import { addMonths, format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface YearlyProjectionChartProps {
  transactions: Transaction[];
  debts: Debt[];
}

export function YearlyProjectionChart({ transactions, debts }: YearlyProjectionChartProps) {
  const chartData = useMemo(() => {
    const today = new Date();
    const months: { month: string; monthIndex: number; income: number; expenses: number; debtPayments: number; netResult: number }[] = [];

    // Calculate base monthly income (normalized)
    const monthlyIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => {
        const freq = t.frequency || 1;
        return sum + Number(t.amount) / freq;
      }, 0);

    // Calculate base monthly expenses (excluding debt payments, normalized)
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => {
        const freq = t.frequency || 1;
        return sum + Number(t.amount) / freq;
      }, 0);

    // For each of the next 12 months
    for (let i = 0; i < 12; i++) {
      const monthDate = addMonths(today, i);
      const monthLabel = format(monthDate, 'MMM yyyy', { locale: nl });

      // Calculate which debts are still active this month
      let activeDebtPayments = 0;
      debts.forEach(debt => {
        const remainingAmount = Number(debt.remaining_amount);
        const monthlyPayment = Number(debt.monthly_payment);
        
        if (monthlyPayment > 0 && remainingAmount > 0) {
          // Calculate how many months until this debt is paid off
          const monthsUntilPaidOff = Math.ceil(remainingAmount / monthlyPayment);
          
          // If debt is still active in this month
          if (i < monthsUntilPaidOff) {
            // For the last month, might be a partial payment
            if (i === monthsUntilPaidOff - 1) {
              const paidSoFar = i * monthlyPayment;
              const remaining = remainingAmount - paidSoFar;
              activeDebtPayments += Math.min(remaining, monthlyPayment);
            } else {
              activeDebtPayments += monthlyPayment;
            }
          }
        }
      });

      const totalExpensesThisMonth = monthlyExpenses + activeDebtPayments;
      const netResult = monthlyIncome - totalExpensesThisMonth;

      months.push({
        month: monthLabel,
        monthIndex: i,
        income: Math.round(monthlyIncome),
        expenses: Math.round(monthlyExpenses),
        debtPayments: Math.round(activeDebtPayments),
        netResult: Math.round(netResult),
      });
    }

    return months;
  }, [transactions, debts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const minValue = Math.min(...chartData.map(d => Math.min(d.netResult, 0)));
  const maxValue = Math.max(...chartData.map(d => Math.max(d.income, d.expenses + d.debtPayments)));

  // Find if/when debts are paid off
  const debtFreeMonth = chartData.find((d, i) => i > 0 && d.debtPayments === 0 && chartData[i - 1].debtPayments > 0);

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-heading">12-Maanden Prognose</CardTitle>
        {debtFreeMonth && (
          <p className="text-sm text-muted-foreground">
            🎉 Schulden afgelost in <span className="font-medium text-success">{debtFreeMonth.month}</span> — daarna €{Math.abs(chartData[0].debtPayments - debtFreeMonth.debtPayments)} per maand extra!
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={formatCurrency} 
                domain={[Math.min(minValue - 100, 0), maxValue + 100]}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = {
                    income: 'Inkomsten',
                    expenses: 'Vaste lasten',
                    debtPayments: 'Schuldaflossing',
                    netResult: 'Over per maand',
                  };
                  return [formatCurrency(value), labels[name] || name];
                }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend 
                formatter={(value) => {
                  const labels: Record<string, string> = {
                    income: 'Inkomsten',
                    expenses: 'Vaste lasten',
                    debtPayments: 'Schuldaflossing',
                    netResult: 'Over per maand',
                  };
                  return labels[value] || value;
                }}
              />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="hsl(var(--chart-income))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--chart-expense))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="debtPayments"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="netResult"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
