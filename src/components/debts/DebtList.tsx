import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Debt, DebtType } from '@/hooks/useDebts';
import { HouseholdMember } from '@/hooks/useTransactions';
import { Plus, Trash2, CreditCard, Calendar, Users, Minus, Pencil, Landmark } from 'lucide-react';
import { DebtForm } from './DebtForm';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface DebtListProps {
  debts: Debt[];
  loans: Debt[];
  householdMembers: HouseholdMember[];
  totalDebt: number;
  totalDebtMonthlyPayments: number;
  totalLoans: number;
  totalLoanMonthlyPayments: number;
  onAdd: (data: {
    name: string;
    creditor?: string;
    original_amount: number;
    remaining_amount: number;
    monthly_payment: number;
    day_of_month?: number | null;
    member_id?: string | null;
    description?: string;
    type?: DebtType;
  }) => void;
  onUpdate: (data: {
    id: string;
    name: string;
    creditor?: string;
    original_amount: number;
    remaining_amount: number;
    monthly_payment: number;
    day_of_month?: number | null;
    member_id?: string | null;
    description?: string;
    type?: DebtType;
  }) => void;
  onDelete: (id: string) => void;
  onPayment: (data: { id: string; amount: number }) => void;
}

export function DebtList({
  debts,
  loans,
  householdMembers,
  totalDebt,
  totalDebtMonthlyPayments,
  totalLoans,
  totalLoanMonthlyPayments,
  onAdd,
  onUpdate,
  onDelete,
  onPayment,
}: DebtListProps) {
  const [debtFormOpen, setDebtFormOpen] = useState(false);
  const [loanFormOpen, setLoanFormOpen] = useState(false);
  const [editDebt, setEditDebt] = useState<Debt | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [paymentDebt, setPaymentDebt] = useState<Debt | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const handlePayment = () => {
    if (paymentDebt && paymentAmount) {
      onPayment({ id: paymentDebt.id, amount: parseFloat(paymentAmount) });
      setPaymentDebt(null);
      setPaymentAmount('');
    }
  };

  const renderDebtItem = (debt: Debt, isLoan: boolean) => {
    const progress = ((debt.original_amount - debt.remaining_amount) / debt.original_amount) * 100;
    const isPaidOff = debt.remaining_amount <= 0;
    
    return (
      <div
        key={debt.id}
        className={cn(
          "p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group",
          isPaidOff && "bg-success/10"
        )}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              isPaidOff ? "bg-success/10 text-success" : isLoan ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            )}>
              {isLoan ? <Landmark className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{debt.name}</p>
                {isPaidOff && (
                  <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                    Afbetaald
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                {debt.creditor && <span>{debt.creditor}</span>}
                {debt.day_of_month && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {debt.day_of_month}e
                  </span>
                )}
                {debt.household_members && (
                  <span 
                    className="flex items-center gap-1"
                    style={{ color: debt.household_members.color || '#6B7280' }}
                  >
                    <Users className="h-3 w-3" />
                    {debt.household_members.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isPaidOff && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPaymentDebt(debt);
                  setPaymentAmount(debt.monthly_payment.toString());
                }}
              >
                <Minus className="h-4 w-4 mr-1" />
                Betaling
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
              onClick={() => setEditDebt(debt)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
              onClick={() => setDeleteId(debt.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Resterend: <span className="font-medium text-foreground">{formatCurrency(debt.remaining_amount)}</span>
            </span>
            <span className="text-muted-foreground">
              van {formatCurrency(debt.original_amount)}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progress.toFixed(0)}% afbetaald</span>
            <span>{formatCurrency(debt.monthly_payment)}/maand</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Schulden sectie */}
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-heading flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-destructive" />
              Schulden
            </CardTitle>
            <div className="flex gap-6 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Totale schuld</p>
                <p className="text-2xl font-bold text-destructive">
                  {formatCurrency(totalDebt)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maandelijkse aflossing</p>
                <p className="text-xl font-semibold text-warning">
                  {formatCurrency(totalDebtMonthlyPayments)}
                </p>
              </div>
            </div>
          </div>
          <Button onClick={() => setDebtFormOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schuld toevoegen
          </Button>
        </CardHeader>
        <CardContent>
          {debts.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nog geen schulden toegevoegd.
            </p>
          ) : (
            <div className="space-y-4">
              {debts.map((debt) => renderDebtItem(debt, false))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leningen sectie */}
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="font-heading flex items-center gap-2">
              <Landmark className="h-5 w-5 text-primary" />
              Leningen
            </CardTitle>
            <div className="flex gap-6 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Totale leningen</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(totalLoans)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maandelijkse aflossing</p>
                <p className="text-xl font-semibold text-warning">
                  {formatCurrency(totalLoanMonthlyPayments)}
                </p>
              </div>
            </div>
          </div>
          <Button onClick={() => setLoanFormOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Lening toevoegen
          </Button>
        </CardHeader>
        <CardContent>
          {loans.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nog geen leningen toegevoegd.
            </p>
          ) : (
            <div className="space-y-4">
              {loans.map((loan) => renderDebtItem(loan, true))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Forms for adding */}
      <DebtForm
        open={debtFormOpen}
        onOpenChange={setDebtFormOpen}
        householdMembers={householdMembers}
        debtType="debt"
        onSubmit={onAdd}
      />

      <DebtForm
        open={loanFormOpen}
        onOpenChange={setLoanFormOpen}
        householdMembers={householdMembers}
        debtType="loan"
        onSubmit={onAdd}
      />

      {/* Form for editing */}
      <DebtForm
        open={!!editDebt}
        onOpenChange={(open) => !open && setEditDebt(null)}
        householdMembers={householdMembers}
        debt={editDebt || undefined}
        debtType={editDebt?.type || 'debt'}
        onSubmit={(data) => {
          if (editDebt) {
            onUpdate({ id: editDebt.id, ...data });
            setEditDebt(null);
          }
        }}
      />

      <Dialog open={!!paymentDebt} onOpenChange={() => setPaymentDebt(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Betaling registreren</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Registreer een betaling voor <strong>{paymentDebt?.name}</strong>
            </p>
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Bedrag</Label>
              <Input
                id="paymentAmount"
                type="number"
                step="0.01"
                min="0"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPaymentDebt(null)}>
              Annuleren
            </Button>
            <Button onClick={handlePayment}>
              Betaling registreren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
            <AlertDialogDescription>
              Dit item wordt permanent verwijderd.
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