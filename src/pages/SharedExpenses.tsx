import { useTransactions } from "@/hooks/useTransactions";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingDown } from "lucide-react";

const SharedExpenses = () => {
  const { transactions, categories, householdMembers, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const sharedExpenses = transactions.filter(
    (t) => t.type === "expense" && t.is_shared
  );

  // Group by category
  const expensesByCategory = sharedExpenses.reduce((acc, expense) => {
    const categoryId = expense.category_id || "uncategorized";
    if (!acc[categoryId]) {
      acc[categoryId] = [];
    }
    acc[categoryId].push(expense);
    return acc;
  }, {} as Record<string, typeof sharedExpenses>);

  // Calculate totals per member
  const memberTotals = householdMembers.reduce((acc, member) => {
    const memberExpenses = sharedExpenses.filter((e) => e.member_id === member.id);
    const total = memberExpenses.reduce((sum, e) => {
      const monthlyAmount = e.is_recurring && e.frequency
        ? e.amount / e.frequency
        : e.amount;
      return sum + monthlyAmount;
    }, 0);
    acc[member.id] = { name: member.name, color: member.color, total };
    return acc;
  }, {} as Record<string, { name: string; color: string | null; total: number }>);

  const totalShared = sharedExpenses.reduce((sum, e) => {
    const monthlyAmount = e.is_recurring && e.frequency
      ? e.amount / e.frequency
      : e.amount;
    return sum + monthlyAmount;
  }, 0);

  const getCategoryName = (categoryId: string) => {
    if (categoryId === "uncategorized") return "Overig";
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Onbekend";
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "#6B7280";
  };

  const getMemberName = (memberId: string | null) => {
    if (!memberId) return "Niet toegewezen";
    const member = householdMembers.find((m) => m.id === memberId);
    return member?.name || "Onbekend";
  };

  const getMemberColor = (memberId: string | null) => {
    if (!memberId) return "#6B7280";
    const member = householdMembers.find((m) => m.id === memberId);
    return member?.color || "#6B7280";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gedeelde Kosten</h1>
          <p className="text-muted-foreground mt-1">
            Gedetailleerd overzicht van alle gedeelde uitgaven
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totaal Gedeeld</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                €{totalShared.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">per maand</p>
            </CardContent>
          </Card>

          {Object.entries(memberTotals).map(([memberId, data]) => (
            <Card key={memberId}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: data.color || "#6B7280" }}
                  />
                  {data.name}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€{data.total.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {totalShared > 0
                    ? `${((data.total / totalShared) * 100).toFixed(0)}% van totaal`
                    : "0% van totaal"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expenses by Category */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Per Categorie</h2>
          
          {Object.keys(expensesByCategory).length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Nog geen gedeelde kosten gevonden. Markeer uitgaven als "gedeeld" om ze hier te zien.
              </CardContent>
            </Card>
          ) : (
            Object.entries(expensesByCategory).map(([categoryId, expenses]) => {
              const categoryTotal = expenses.reduce((sum, e) => {
                const monthlyAmount = e.is_recurring && e.frequency
                  ? e.amount / e.frequency
                  : e.amount;
                return sum + monthlyAmount;
              }, 0);

              return (
                <Card key={categoryId}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: getCategoryColor(categoryId) }}
                        />
                        {getCategoryName(categoryId)}
                      </div>
                      <span className="text-destructive">
                        €{categoryTotal.toFixed(2)}/maand
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {expenses.map((expense) => {
                        const monthlyAmount = expense.is_recurring && expense.frequency
                          ? expense.amount / expense.frequency
                          : expense.amount;

                        return (
                          <div
                            key={expense.id}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-foreground">{expense.name}</p>
                              {expense.description && (
                                <p className="text-sm text-muted-foreground">
                                  {expense.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge
                                variant="outline"
                                style={{
                                  borderColor: getMemberColor(expense.member_id),
                                  color: getMemberColor(expense.member_id),
                                }}
                              >
                                {getMemberName(expense.member_id)}
                              </Badge>
                              <span className="font-semibold text-foreground min-w-[80px] text-right">
                                €{monthlyAmount.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SharedExpenses;
