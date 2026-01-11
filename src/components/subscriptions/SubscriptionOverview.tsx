import { format, differenceInDays } from "date-fns";
import { nl } from "date-fns/locale";
import {
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Calendar,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  useSubscriptions,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  SubscriptionCategory,
} from "@/hooks/useSubscriptions";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export const SubscriptionOverview = () => {
  const {
    activeSubscriptions,
    totalMonthly,
    totalYearly,
    costsByCategory,
    upcomingRenewals,
    expiringContracts,
    isLoading,
  } = useSubscriptions();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Prepare pie chart data
  const pieChartData = Object.entries(costsByCategory)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      name: CATEGORY_LABELS[category as SubscriptionCategory],
      value: Math.round(value * 100) / 100,
      icon: CATEGORY_ICONS[category as SubscriptionCategory],
      color: CATEGORY_COLORS[category as SubscriptionCategory],
    }))
    .sort((a, b) => b.value - a.value);

  // Calculate percentages for the breakdown
  const categoryBreakdown = Object.entries(costsByCategory)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      category: category as SubscriptionCategory,
      amount: value,
      percentage: totalMonthly > 0 ? (value / totalMonthly) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Maandelijkse kosten</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalMonthly.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeSubscriptions.length} actieve abonnementen
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jaarlijkse kosten</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalYearly.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Projectie op jaarbasis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Komende betalingen</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingRenewals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In de komende 30 dagen
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aflopende contracten</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiringContracts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              In de komende 60 dagen
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        {pieChartData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Verdeling per categorie
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`€${value.toFixed(2)}`, 'Per maand']}
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend
                      formatter={(value, entry: any) => (
                        <span className="text-sm">
                          {entry.payload?.icon} {value}
                        </span>
                      )}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Kosten per categorie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryBreakdown.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Geen actieve abonnementen om te analyseren.
              </p>
            ) : (
              categoryBreakdown.map(({ category, amount, percentage }) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{CATEGORY_ICONS[category]}</span>
                      <span className="text-sm font-medium">
                        {CATEGORY_LABELS[category]}
                      </span>
                    </div>
                    <span className="text-sm font-bold">€{amount.toFixed(2)}</span>
                  </div>
                  <Progress
                    value={percentage}
                    className="h-2"
                    style={{
                      ['--progress-foreground' as any]: CATEGORY_COLORS[category],
                    }}
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Renewals & Expiring Contracts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {upcomingRenewals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                Komende betalingen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingRenewals.slice(0, 5).map((sub) => {
                  const daysUntil = differenceInDays(
                    new Date(sub.next_billing_date!),
                    new Date()
                  );
                  return (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {CATEGORY_ICONS[sub.category]}
                        </span>
                        <div>
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(sub.next_billing_date!), "d MMMM", {
                              locale: nl,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">€{sub.amount.toFixed(2)}</p>
                        <p className="text-xs text-orange-500">
                          over {daysUntil} dag{daysUntil !== 1 ? "en" : ""}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {expiringContracts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Aflopende contracten
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringContracts.slice(0, 5).map((sub) => {
                  const daysUntil = differenceInDays(
                    new Date(sub.contract_end_date!),
                    new Date()
                  );
                  return (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {CATEGORY_ICONS[sub.category]}
                        </span>
                        <div>
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Eindigt{" "}
                            {format(new Date(sub.contract_end_date!), "d MMMM", {
                              locale: nl,
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-yellow-500 font-medium">
                          {daysUntil} dag{daysUntil !== 1 ? "en" : ""} resterend
                        </p>
                        {sub.cancellation_period_days && (
                          <p className="text-xs text-muted-foreground">
                            Opzegtermijn: {sub.cancellation_period_days} dagen
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
