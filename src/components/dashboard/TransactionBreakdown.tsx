import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Transaction } from '@/hooks/useTransactions';
import { Calendar, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionBreakdownProps {
  transactions: Transaction[];
  memberCount: number;
  view: 'all' | 'personal' | 'member';
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(value);
}

function normalizeToMonthly(amount: number, frequency: number | null) {
  const freq = frequency || 1;
  return amount / freq;
}

function getFrequencyLabel(frequency: number | null) {
  switch (frequency) {
    case 1:
      return 'maandelijks';
    case 2:
      return 'elke 2 mnd';
    case 3:
      return 'per kwartaal';
    case 6:
      return 'halfjaarlijks';
    case 12:
      return 'jaarlijks';
    default:
      return 'maandelijks';
  }
}

function effectiveMonthlyAmount(t: Transaction, memberCount: number, view: TransactionBreakdownProps['view']) {
  const monthly = normalizeToMonthly(Number(t.amount), t.frequency);
  if (view === 'member' && t.is_shared) return monthly / Math.max(memberCount, 1);
  return monthly;
}

function sortByDay(a: Transaction, b: Transaction) {
  const da = a.day_of_month ?? 999;
  const db = b.day_of_month ?? 999;
  return da - db;
}

function TransactionRow({ t, memberCount, view }: { t: Transaction; memberCount: number; view: TransactionBreakdownProps['view'] }) {
  const monthlyTotal = normalizeToMonthly(Number(t.amount), t.frequency);
  const monthlyEffective = effectiveMonthlyAmount(t, memberCount, view);
  const showSplit = view === 'member' && t.is_shared;

  return (
    <div className="flex items-start justify-between gap-3 py-3 border-b border-border last:border-0">
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-medium truncate">{t.name}</p>
          {t.is_shared && (
            <Badge variant="secondary">Gezamenlijk</Badge>
          )}
          {t.household_members?.name && (
            <span className="text-xs text-muted-foreground">
              • betaald door {t.household_members.name}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2 flex-wrap text-xs text-muted-foreground">
          <span>{t.categories?.name || 'Geen categorie'}</span>
          {t.day_of_month && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {t.day_of_month}e
            </span>
          )}
          {t.frequency && t.frequency !== 1 && (
            <span className="inline-flex items-center gap-1">
              <Repeat className="h-3 w-3" />
              {getFrequencyLabel(t.frequency)}
            </span>
          )}
        </div>

        {showSplit && (
          <p className="mt-1 text-xs text-muted-foreground">
            Jouw deel: <span className="font-medium text-foreground">{formatCurrency(monthlyEffective)}</span> • Totaal: {formatCurrency(monthlyTotal)} /maand
          </p>
        )}
      </div>

      <div className={cn(
        "shrink-0 text-right font-semibold",
        t.type === 'income' ? 'text-success' : 'text-destructive'
      )}>
        {formatCurrency(monthlyEffective)}
        <div className="text-[11px] font-normal text-muted-foreground">/maand</div>
      </div>
    </div>
  );
}

export function TransactionBreakdown({ transactions, memberCount, view }: TransactionBreakdownProps) {
  const income = transactions.filter(t => t.type === 'income').sort(sortByDay);
  const expenses = transactions.filter(t => t.type === 'expense').sort(sortByDay);

  const incomeTotal = income.reduce((sum, t) => sum + effectiveMonthlyAmount(t, memberCount, view), 0);
  const expenseTotal = expenses.reduce((sum, t) => sum + effectiveMonthlyAmount(t, memberCount, view), 0);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="font-heading">Inkomsten (overzicht)</CardTitle>
          <CardDescription>Bedragen zijn omgerekend naar maandbasis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-xl font-semibold text-success">{formatCurrency(incomeTotal)}</p>
          </div>

          {income.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Geen inkomsten gevonden.</p>
          ) : (
            <ScrollArea className="h-[320px] pr-4">
              {income.map((t) => (
                <TransactionRow key={t.id} t={t} memberCount={memberCount} view={view} />
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="font-heading">Uitgaven (overzicht)</CardTitle>
          <CardDescription>
            {view === 'member' ? 'Gezamenlijke uitgaven worden als jouw deel getoond.' : 'Bedragen zijn omgerekend naar maandbasis.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end justify-between">
            <p className="text-sm text-muted-foreground">Totaal</p>
            <p className="text-xl font-semibold text-destructive">{formatCurrency(expenseTotal)}</p>
          </div>

          {expenses.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">Geen uitgaven gevonden.</p>
          ) : (
            <ScrollArea className="h-[320px] pr-4">
              {expenses.map((t) => (
                <TransactionRow key={t.id} t={t} memberCount={memberCount} view={view} />
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
