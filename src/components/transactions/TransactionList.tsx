import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction, Category } from '@/hooks/useTransactions';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { TransactionForm } from './TransactionForm';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TransactionListProps {
  type: 'income' | 'expense';
  transactions: Transaction[];
  categories: Category[];
  onAdd: (data: {
    type: 'income' | 'expense';
    name: string;
    amount: number;
    category_id: string | null;
    description?: string;
  }) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({
  type,
  transactions,
  categories,
  onAdd,
  onDelete,
}: TransactionListProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const title = type === 'income' ? 'Inkomsten' : 'Uitgaven';
  const Icon = type === 'income' ? TrendingUp : TrendingDown;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-heading">{title}</CardTitle>
            <p className={cn(
              "text-2xl font-bold mt-2",
              type === 'income' ? "text-success" : "text-destructive"
            )}>
              {formatCurrency(total)}
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Toevoegen
          </Button>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nog geen {type === 'income' ? 'inkomsten' : 'uitgaven'} toegevoegd.
            </p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      type === 'income' 
                        ? "bg-success/10 text-success" 
                        : "bg-destructive/10 text-destructive"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.categories?.name || 'Geen categorie'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={cn(
                      "font-semibold",
                      type === 'income' ? "text-success" : "text-destructive"
                    )}>
                      {formatCurrency(Number(transaction.amount))}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      onClick={() => setDeleteId(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TransactionForm
        open={formOpen}
        onOpenChange={setFormOpen}
        type={type}
        categories={categories}
        onSubmit={onAdd}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Deze {type === 'income' ? 'inkomst' : 'uitgave'} wordt permanent verwijderd.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId);
                  setDeleteId(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}