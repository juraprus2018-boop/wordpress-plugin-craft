import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IncomeExpenseChartProps {
  totalIncome: number;
  totalExpenses: number;
}

export function IncomeExpenseChart({ totalIncome, totalExpenses }: IncomeExpenseChartProps) {
  const data = [
    {
      name: 'Inkomsten',
      bedrag: totalIncome,
      fill: 'hsl(var(--chart-income))',
    },
    {
      name: 'Uitgaven',
      bedrag: totalExpenses,
      fill: 'hsl(var(--chart-expense))',
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-heading">Inkomsten vs Uitgaven</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" tickFormatter={formatCurrency} />
              <YAxis type="category" dataKey="name" width={80} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Bar dataKey="bedrag" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}