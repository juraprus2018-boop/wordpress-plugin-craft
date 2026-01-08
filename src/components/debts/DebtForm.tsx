import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HouseholdMember } from '@/hooks/useTransactions';
import { Debt, DebtType } from '@/hooks/useDebts';

interface DebtFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  householdMembers: HouseholdMember[];
  debt?: Debt;
  debtType: DebtType;
  onSubmit: (data: {
    name: string;
    creditor?: string;
    original_amount: number;
    remaining_amount: number;
    monthly_payment: number;
    day_of_month?: number | null;
    member_id?: string | null;
    description?: string;
    type: DebtType;
  }) => void;
}

export function DebtForm({ open, onOpenChange, householdMembers, debt, debtType, onSubmit }: DebtFormProps) {
  const [name, setName] = useState('');
  const [creditor, setCreditor] = useState('');
  const [originalAmount, setOriginalAmount] = useState('');
  const [remainingAmount, setRemainingAmount] = useState('');
  const [hasPaymentPlan, setHasPaymentPlan] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (open && debt) {
      setName(debt.name);
      setCreditor(debt.creditor || '');
      setOriginalAmount(debt.original_amount.toString());
      setRemainingAmount(debt.remaining_amount.toString());
      const hasPlan = debt.monthly_payment > 0;
      setHasPaymentPlan(hasPlan);
      setMonthlyPayment(debt.monthly_payment.toString());
      setDayOfMonth(debt.day_of_month?.toString() || '');
      setMemberId(debt.member_id || '');
      setDescription(debt.description || '');
    } else if (open) {
      resetForm();
    }
  }, [open, debt]);

  const resetForm = () => {
    setName('');
    setCreditor('');
    setOriginalAmount('');
    setRemainingAmount('');
    setHasPaymentPlan(false);
    setMonthlyPayment('');
    setDayOfMonth('');
    setMemberId('');
    setDescription('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      name,
      creditor: creditor || undefined,
      original_amount: parseFloat(originalAmount),
      remaining_amount: parseFloat(remainingAmount || originalAmount),
      monthly_payment: hasPaymentPlan ? (parseFloat(monthlyPayment) || 0) : 0,
      day_of_month: hasPaymentPlan && dayOfMonth ? parseInt(dayOfMonth) : null,
      member_id: memberId && memberId !== 'none' ? memberId : null,
      description: description || undefined,
      type: debtType,
    });

    resetForm();
    onOpenChange(false);
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const isLoan = debtType === 'loan';
  const typeLabel = isLoan ? 'Lening' : 'Schuld';
  const title = debt ? `${typeLabel} bewerken` : `${typeLabel} toevoegen`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Naam *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bijv. Lening auto"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditor">{isLoan ? 'Verstrekker' : 'Schuldeiser'}</Label>
            <Input
              id="creditor"
              value={creditor}
              onChange={(e) => setCreditor(e.target.value)}
              placeholder={isLoan ? 'Bijv. Bank, Financiering' : 'Bijv. Giro, Bank'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalAmount">Oorspronkelijk bedrag *</Label>
              <Input
                id="originalAmount"
                type="number"
                step="0.01"
                min="0"
                value={originalAmount}
                onChange={(e) => setOriginalAmount(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remainingAmount">Resterend bedrag</Label>
              <Input
                id="remainingAmount"
                type="number"
                step="0.01"
                min="0"
                value={remainingAmount}
                onChange={(e) => setRemainingAmount(e.target.value)}
                placeholder={originalAmount || '0.00'}
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-y">
            <Label htmlFor="hasPaymentPlan" className="cursor-pointer">
              Heb je een betalingsregeling?
            </Label>
            <Switch
              id="hasPaymentPlan"
              checked={hasPaymentPlan}
              onCheckedChange={setHasPaymentPlan}
            />
          </div>

          {hasPaymentPlan && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyPayment">Maandelijkse aflossing *</Label>
                <Input
                  id="monthlyPayment"
                  type="number"
                  step="0.01"
                  min="0"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  placeholder="0.00"
                  required={hasPaymentPlan}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dayOfMonth">Dag van de maand</Label>
                <Select value={dayOfMonth} onValueChange={setDayOfMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kies dag" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}e
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="member">Gezinslid</Label>
            <Select value={memberId} onValueChange={setMemberId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer gezinslid" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Geen</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="description">Omschrijving</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Extra informatie..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Annuleren
            </Button>
            <Button type="submit" className="flex-1">
              {debt ? 'Opslaan' : 'Toevoegen'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}