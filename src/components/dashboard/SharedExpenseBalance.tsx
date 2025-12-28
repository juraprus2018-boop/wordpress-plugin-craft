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
    
    // Calculate how much each member paid for shared expenses
    const memberPayments: Record<string, number> = {};
    
    sharedExpenses.forEach(t => {
      if (t.member_id) {
        const normalizedAmount = normalizeToMonthly(Number(t.amount), t.frequency);
        memberPayments[t.member_id] = (memberPayments[t.member_id] || 0) + normalizedAmount;
      }
    });
    
    // Calculate fair share per member
    const memberCount = householdMembers.length;
    const fairShare = memberCount > 0 ? totalSharedExpenses / memberCount : 0;
    
    // Calculate balance for each member
    const balances: MemberBalance[] = householdMembers.map(member => {
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
          Gedeelde Kosten Balans
        </CardTitle>
        <CardDescription>
          Overzicht van wie wat heeft betaald voor gedeelde uitgaven (50/50 verdeling)
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
            <p className="text-xs text-muted-foreground mb-1">Eerlijke verdeling p.p.</p>
            <p className="text-lg font-semibold">{formatCurrency(balanceData.fairShare)}</p>
            <p className="text-xs text-muted-foreground">/maand</p>
          </div>
        </div>

        {/* Per member breakdown */}
        <div className="space-y-4">
          {balanceData.balances.map(({ member, paidForShared, shouldPay, balance }) => {
            const percentage = shouldPay > 0 ? (paidForShared / shouldPay) * 100 : 0;
            const isOverpaying = balance > 0;
            const isUnderpaying = balance < 0;
            
            return (
              <div key={member.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: member.color || '#6B7280' }}
                    />
                    <span className="font-medium">{member.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">{formatCurrency(paidForShared)}</span>
                    <span className="text-muted-foreground text-sm"> / {formatCurrency(shouldPay)}</span>
                  </div>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={cn(
                    "h-2",
                    isOverpaying && "[&>div]:bg-green-500",
                    isUnderpaying && "[&>div]:bg-orange-500"
                  )}
                />
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {percentage.toFixed(0)}% van eerlijk deel betaald
                  </span>
                  <span className={cn(
                    "font-medium",
                    isOverpaying && "text-green-600 dark:text-green-400",
                    isUnderpaying && "text-orange-600 dark:text-orange-400",
                    !isOverpaying && !isUnderpaying && "text-muted-foreground"
                  )}>
                    {isOverpaying ? '+' : ''}{formatCurrency(balance)}
                  </span>
                </div>
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
                <p className="font-medium text-sm">Verrekening nodig</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium" style={{ color: settlement.payer.member.color || undefined }}>
                    {settlement.payer.member.name}
                  </span>
                  {' '}betaalt{' '}
                  <span className="font-semibold text-foreground">
                    {formatCurrency(settlement.amount)}
                  </span>
                  {' '}aan{' '}
                  <span className="font-medium" style={{ color: settlement.receiver.member.color || undefined }}>
                    {settlement.receiver.member.name}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        )}

        {settlement === null && balanceData.balances.length === 2 && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-sm text-green-600 dark:text-green-400">Alles in balans!</p>
                <p className="text-sm text-muted-foreground">
                  Jullie hebben gelijk betaald voor de gedeelde kosten.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
