import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Users, ArrowRight, Check, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Transaction, HouseholdMember } from '@/hooks/useTransactions';

interface SharedExpenseBalanceProps {
  transactions: Transaction[];
  householdMembers: HouseholdMember[];
}

interface MemberBalance {
  member: HouseholdMember;
  paidForShared: number;
  shouldPay: number;
  balance: number;
}

export function SharedExpenseBalance({ transactions, householdMembers }: SharedExpenseBalanceProps) {
  const balanceData = useMemo(() => {
    const SELF_ID = '__self__';

    const selfMember: HouseholdMember = {
      id: SELF_ID,
      name: 'Jij',
      color: 'hsl(var(--primary))',
      created_at: '',
      user_id: '',
    };

    // Include yourself as an implicit participant (household members list usually contains "others").
    const membersWithSelf = [selfMember, ...householdMembers];

    // Only consider shared expenses
    const sharedExpenses = transactions.filter(t => t.type === 'expense' && t.is_shared);

    // Helper function to normalize amounts to monthly basis
    const normalizeToMonthly = (amount: number, frequency: number | null) => {
      const freq = frequency || 1;
      return amount / freq;
    };

    // Calculate total shared expenses (monthly normalized)
    const totalSharedExpenses = sharedExpenses.reduce(
      (sum, t) => sum + normalizeToMonthly(Number(t.amount), t.frequency),
      0
    );

    // Calculate how much each participant paid for shared expenses
    const memberPayments: Record<string, number> = {};

    sharedExpenses.forEach(t => {
      const normalizedAmount = normalizeToMonthly(Number(t.amount), t.frequency);

      // If no member_id is set, treat it as "paid by you".
      const payerId = t.member_id || SELF_ID;
      memberPayments[payerId] = (memberPayments[payerId] || 0) + normalizedAmount;
    });

    // Calculate fair share per participant
    const memberCount = membersWithSelf.length;
    const fairShare = memberCount > 0 ? totalSharedExpenses / memberCount : 0;

    const sharedExpenseItems = sharedExpenses
      .map((t) => {
        const monthlyTotal = normalizeToMonthly(Number(t.amount), t.frequency);
        const payer = t.member_id
          ? householdMembers.find(m => m.id === t.member_id) || null
          : selfMember;

        return {
          id: t.id,
          name: t.name,
          category: t.categories?.name || 'Geen categorie',
          dayOfMonth: t.day_of_month,
          frequency: t.frequency,
          monthlyTotal,
          perPerson: memberCount > 0 ? monthlyTotal / memberCount : monthlyTotal,
          payerName: payer?.name || null,
          payerColor: payer?.color || null,
        };
      })
      .sort((a, b) => b.monthlyTotal - a.monthlyTotal)
      .slice(0, 6);

    // Calculate balance for each participant
    const balances: MemberBalance[] = membersWithSelf.map(member => {
      const paidForShared = memberPayments[member.id] || 0;
      return {
        member,
        paidForShared,
        shouldPay: fairShare,
        balance: paidForShared - fairShare, // Positive = paid more, should receive. Negative = paid less, should pay
      };
    });

    // Sort by balance (who paid most first)
    balances.sort((a, b) => b.balance - a.balance);

    return {
      balances,
      totalSharedExpenses,
      fairShare,
      memberCount,
      sharedExpenseItems,
    };
  }, [transactions, householdMembers]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);

  // Calculate settlement (who pays whom)
  const settlement = useMemo(() => {
    if (balanceData.balances.length !== 2) return null;
    
    const [memberA, memberB] = balanceData.balances;
    const diff = Math.abs(memberA.balance);
    
    if (diff < 0.01) return null; // Already balanced
    
    // The person with negative balance should pay the one with positive balance
    const payer = memberA.balance < memberB.balance ? memberA : memberB;
    const receiver = memberA.balance > memberB.balance ? memberA : memberB;
    
    return {
      payer,
      receiver,
      amount: Math.abs(payer.balance),
    };
  }, [balanceData.balances]);

  if (householdMembers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Gedeelde Kosten Balans
          </CardTitle>
          <CardDescription>
            Voeg eerst gezinsleden toe in Instellingen om de 50/50 balans te zien.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (balanceData.totalSharedExpenses === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Gedeelde Kosten Balans
          </CardTitle>
          <CardDescription>
            Nog geen gedeelde uitgaven gevonden. Markeer uitgaven als "gedeeld" om de balans te zien.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Gedeelde kosten (50/50)
        </CardTitle>
        <CardDescription>
          Duidelijk overzicht: <span className="font-medium text-foreground">totaal</span>,{' '}
          <span className="font-medium text-foreground">jouw deel</span> en{' '}
          <span className="font-medium text-foreground">wie heeft betaald</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Totaal gedeelde kosten</p>
            <p className="text-lg font-semibold">{formatCurrency(balanceData.totalSharedExpenses)}</p>
            <p className="text-xs text-muted-foreground">/maand</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Jouw deel (per persoon)</p>
            <p className="text-lg font-semibold">{formatCurrency(balanceData.fairShare)}</p>
            <p className="text-xs text-muted-foreground">/maand</p>
          </div>
        </div>

        {/* Shared expenses list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Gedeelde uitgaven (top {balanceData.sharedExpenseItems.length})</p>
            <p className="text-xs text-muted-foreground">totaal → jouw deel</p>
          </div>

          <div className="space-y-2">
            {balanceData.sharedExpenseItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3">
                <div className="min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                    {item.dayOfMonth ? ` • ${item.dayOfMonth}e` : ''}
                    {item.frequency && item.frequency !== 1 ? ` • elke ${item.frequency} mnd` : ''}
                    {item.payerName ? (
                      <>
                        {' '}• betaald door{' '}
                        <span className="font-medium" style={{ color: item.payerColor || undefined }}>
                          {item.payerName}
                        </span>
                      </>
                    ) : null}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold">{formatCurrency(item.monthlyTotal)}</p>
                  <p className="text-xs text-muted-foreground">→ {formatCurrency(item.perPerson)} /maand</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Per member breakdown */}
        <div className="space-y-4">
          <p className="text-sm font-medium">Per persoon</p>

          {balanceData.balances.map(({ member, paidForShared, shouldPay, balance }) => {
            const percentage = shouldPay > 0 ? (paidForShared / shouldPay) * 100 : 0;
            const isOverpaying = balance > 0;
            const isUnderpaying = balance < 0;

            return (
              <div key={member.id} className="space-y-2 rounded-lg border border-border p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: member.color || 'hsl(var(--muted-foreground))' }} />
                  <span className="font-medium">{member.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Betaald</p>
                    <p className="font-semibold">{formatCurrency(paidForShared)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Jouw deel</p>
                    <p className="font-semibold">{formatCurrency(shouldPay)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Saldo</p>
                    <p className={cn(
                      "font-semibold",
                      isOverpaying && "text-success",
                      isUnderpaying && "text-warning",
                      !isOverpaying && !isUnderpaying && "text-muted-foreground"
                    )}>
                      {isOverpaying ? 'Te ontvangen ' : isUnderpaying ? 'Te betalen ' : ''}
                      {formatCurrency(Math.abs(balance))}
                    </p>
                  </div>
                </div>

                <Progress
                  value={Math.min(percentage, 100)}
                  className={cn(
                    "h-2",
                    isOverpaying && "[&>div]:bg-success",
                    isUnderpaying && "[&>div]:bg-warning"
                  )}
                />
                <p className="text-xs text-muted-foreground">{percentage.toFixed(0)}% van jouw deel is betaald (door jou).</p>
              </div>
            );
          })}
        </div>

        {/* Settlement suggestion */}
        {settlement && settlement.amount > 0.01 && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Wallet className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-sm">Verrekening voorstel</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium" style={{ color: settlement.payer.member.color || undefined }}>
                    {settlement.payer.member.name}
                  </span>{' '}
                  betaalt{' '}
                  <span className="font-semibold text-foreground">{formatCurrency(settlement.amount)}</span>{' '}
                  aan{' '}
                  <span className="font-medium" style={{ color: settlement.receiver.member.color || undefined }}>
                    {settlement.receiver.member.name}
                  </span>
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </div>
        )}

        {settlement === null && balanceData.balances.length === 2 && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-sm text-success">Alles in balans!</p>
                <p className="text-sm text-muted-foreground">Jullie hebben gelijk betaald voor de gedeelde kosten.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
