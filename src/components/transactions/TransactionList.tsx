import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Transaction, Category, HouseholdMember } from '@/hooks/useTransactions';
import { Plus, Trash2, TrendingUp, TrendingDown, Calendar, Users, Filter } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TransactionListProps {
  type: 'income' | 'expense';
  transactions: Transaction[];
  categories: Category[];
  householdMembers: HouseholdMember[];
  onAdd: (data: {
    type: 'income' | 'expense';
    name: string;
    amount: number;
    category_id: string | null;
    description?: string;
    day_of_month?: number | null;
    member_id?: string | null;
    is_shared?: boolean;
  }) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({
  type,
  transactions,
  categories,
  householdMembers,
  onAdd,
  onDelete,
}: TransactionListProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [memberFilter, setMemberFilter] = useState<string>('all');

  const title = type === 'income' ? 'Inkomsten' : 'Uitgaven';
  const Icon = type === 'income' ? TrendingUp : TrendingDown;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  // Filter transactions by household member
  const filteredTransactions = transactions.filter((t) => {
    if (memberFilter === 'all') return true;
    if (memberFilter === 'shared') return t.is_shared;
    if (memberFilter === 'none') return !t.member_id && !t.is_shared;
    return t.member_id === memberFilter;
  });

  const total = filteredTransactions.reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-heading">{title}</CardTitle>
            <p className={cn(
              "text-2xl font-bold mt-2",
              type === 'income' ? "text-success" : "text-destructive"
            )}>
              {formatCurrency(total)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={memberFilter} onValueChange={setMemberFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter op lid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Iedereen</SelectItem>
                  <SelectItem value="shared">Gezamenlijk</SelectItem>
                  <SelectItem value="none">Niet toegewezen</SelectItem>
                  {householdMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: member.color || '#6B7280' }}
                        />
                        {member.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setFormOpen(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Toevoegen
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              {memberFilter === 'all' 
                ? `Nog geen ${type === 'income' ? 'inkomsten' : 'uitgaven'} toegevoegd.`
                : `Geen ${type === 'income' ? 'inkomsten' : 'uitgaven'} gevonden voor dit filter.`
              }
            </p>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
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
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{transaction.name}</p>
                        {transaction.is_shared && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            Gezamenlijk
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{transaction.categories?.name || 'Geen categorie'}</span>
                        {transaction.day_of_month && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {transaction.day_of_month}e
                          </span>
                        )}
                        {transaction.household_members && (
                          <span 
                            className="flex items-center gap-1"
                            style={{ color: transaction.household_members.color || '#6B7280' }}
                          >
                            <Users className="h-3 w-3" />
                            {transaction.household_members.name}
                          </span>
                        )}
                      </div>
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
        householdMembers={householdMembers}
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