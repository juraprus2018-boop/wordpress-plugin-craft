import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Transaction } from '@/hooks/useTransactions';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecentTransactionsProps {
  transactions: Transaction[];
  memberCount?: number;
}

export function RecentTransactions({ transactions, memberCount = 1 }: RecentTransactionsProps) {
  const recentTransactions = transactions.slice(0, 5);

  const getEffectiveAmount = (t: Transaction) => {
    const amount = Number(t.amount);
    const freq = t.frequency || 1;
    const monthly = amount / freq;
    return t.is_shared && memberCount > 1 ? monthly / memberCount : monthly;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (recentTransactions.length === 0) {
    return (
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="font-heading">Recente transacties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nog geen transacties. Voeg inkomsten of uitgaven toe om ze hier te zien.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="font-heading">Recente transacties</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  transaction.type === 'income' 
                    ? "bg-success/10 text-success" 
                    : "bg-destructive/10 text-destructive"
                )}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.categories?.name || 'Geen categorie'} • {formatDate(transaction.created_at)}
                  </p>
                </div>
              </div>
              <p className={cn(
                "font-semibold",
                transaction.type === 'income' ? "text-success" : "text-destructive"
              )}>
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(getEffectiveAmount(transaction))}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}