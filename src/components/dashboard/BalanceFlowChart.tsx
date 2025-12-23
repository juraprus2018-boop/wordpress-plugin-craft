import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/hooks/useTransactions';

interface BalanceFlowChartProps {
  transactions: Transaction[];
}

export function BalanceFlowChart({ transactions }: BalanceFlowChartProps) {
  const chartData = useMemo(() => {
    // Group transactions by day of month and calculate running balance
    const dailyData: { day: number; income: number; expense: number }[] = [];
    
    // Initialize all days
    for (let day = 1; day <= 31; day++) {
      dailyData.push({ day, income: 0, expense: 0 });
    }

    // Sum transactions per day
    transactions.forEach((t) => {
      const dayOfMonth = t.day_of_month;
      if (dayOfMonth && dayOfMonth >= 1 && dayOfMonth <= 31) {
        if (t.type === 'income') {
          dailyData[dayOfMonth - 1].income += Number(t.amount);
        } else {
          dailyData[dayOfMonth - 1].expense += Number(t.amount);
        }
      }
    });

    // Calculate running balance
    let runningBalance = 0;
    return dailyData.map((item) => {
      runningBalance += item.income - item.expense;
      return {
        day: item.day,
        saldo: runningBalance,
        inkomen: item.income,
        uitgaven: item.expense,
      };
    });
  }, [transactions]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const minBalance = Math.min(...chartData.map(d => d.saldo));
  const maxBalance = Math.max(...chartData.map(d => d.saldo));

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-heading">Saldo Verloop per Maand</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-income))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-income))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-expense))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-expense))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="day" 
                tickFormatter={(day) => `${day}`}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tickFormatter={formatCurrency} 
                domain={[Math.min(minBalance, 0), Math.max(maxBalance, 0)]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === 'saldo' ? 'Saldo' : name === 'inkomen' ? 'Inkomen' : 'Uitgaven'
                ]}
                labelFormatter={(day) => `Dag ${day}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="saldo"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorPositive)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Positief saldo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Negatief saldo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}