import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { nl } from "date-fns/locale";
import {
  Shield,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Edit,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useSubscriptions,
  Subscription,
  BILLING_CYCLE_LABELS,
  STATUS_LABELS,
} from "@/hooks/useSubscriptions";
import { SubscriptionForm } from "@/components/subscriptions/SubscriptionForm";

const StatusBadge = ({ status }: { status: Subscription["status"] }) => {
  const colors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    paused: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    expired: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };

  return (
    <Badge variant="outline" className={colors[status]}>
      {STATUS_LABELS[status]}
    </Badge>
  );
};

const Insurance = () => {
  const {
    subscriptions,
    isLoading,
    deleteSubscription,
    calculateMonthlyCost,
  } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null);

  const insuranceItems = subscriptions.filter(
    (s) => s.category === "insurance"
  );
  const activeInsurance = insuranceItems.filter((s) => s.status === "active");

  const totalMonthly = activeInsurance.reduce(
    (sum, sub) => sum + calculateMonthlyCost(sub),
    0
  );
  const totalYearly = totalMonthly * 12;

  const expiringContracts = activeInsurance
    .filter((sub) => {
      if (!sub.contract_end_date) return false;
      const diffDays = differenceInDays(
        new Date(sub.contract_end_date),
        new Date()
      );
      return diffDays >= 0 && diffDays <= 90;
    })
    .sort((a, b) =>
      new Date(a.contract_end_date!).getTime() -
      new Date(b.contract_end_date!).getTime()
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-emerald-500" />
              Verzekeringen
            </h1>
            <p className="text-muted-foreground">
              Beheer al je verzekeringen en polissen op één plek.
            </p>
          </div>
          <SubscriptionForm />
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Maandelijkse premies
              </CardTitle>
              <CreditCard className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{totalMonthly.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeInsurance.length} actieve verzekering
                {activeInsurance.length !== 1 ? "en" : ""}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Jaarlijkse premies
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{totalYearly.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Projectie op jaarbasis
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Aflopende polissen
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {expiringContracts.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                In de komende 90 dagen
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Insurance List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-16 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : insuranceItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">
                Je hebt nog geen verzekeringen toegevoegd.
              </p>
              <p className="text-sm text-muted-foreground">
                Voeg je eerste verzekering toe via de knop hierboven. Kies
                categorie "Verzekeringen" bij het toevoegen.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {insuranceItems.map((sub) => {
              const monthlyAmount = calculateMonthlyCost(sub);
              const daysUntilContractEnd = sub.contract_end_date
                ? differenceInDays(
                    new Date(sub.contract_end_date),
                    new Date()
                  )
                : null;

              return (
                <Card
                  key={sub.id}
                  className="group hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 bg-emerald-500/10">
                          🛡️
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold truncate">
                              {sub.name}
                            </h3>
                            <StatusBadge status={sub.status} />
                          </div>
                          {sub.provider && (
                            <p className="text-sm text-muted-foreground truncate">
                              {sub.provider}
                            </p>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {BILLING_CYCLE_LABELS[sub.billing_cycle]}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-lg">
                          €{sub.amount.toFixed(2)}
                        </div>
                        {sub.billing_cycle !== "monthly" && (
                          <div className="text-xs text-muted-foreground">
                            €{monthlyAmount.toFixed(2)}/mnd
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Warnings */}
                    {daysUntilContractEnd !== null &&
                      daysUntilContractEnd >= 0 &&
                      daysUntilContractEnd <= 90 && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 rounded px-2 py-1">
                          <AlertTriangle className="h-3 w-3" />
                          Polis eindigt over {daysUntilContractEnd} dag
                          {daysUntilContractEnd !== 1 ? "en" : ""}
                        </div>
                      )}

                    {/* Details */}
                    {(sub.next_billing_date ||
                      sub.contract_end_date ||
                      sub.website ||
                      sub.notes) && (
                      <div className="mt-3 pt-3 border-t text-xs text-muted-foreground space-y-1">
                        {sub.contract_start_date && (
                          <div>
                            Ingangsdatum:{" "}
                            {format(
                              new Date(sub.contract_start_date),
                              "d MMMM yyyy",
                              { locale: nl }
                            )}
                          </div>
                        )}
                        {sub.contract_end_date && (
                          <div>
                            Einddatum:{" "}
                            {format(
                              new Date(sub.contract_end_date),
                              "d MMMM yyyy",
                              { locale: nl }
                            )}
                          </div>
                        )}
                        {sub.cancellation_period_days && (
                          <div>
                            Opzegtermijn: {sub.cancellation_period_days} dagen
                          </div>
                        )}
                        {sub.next_billing_date && (
                          <div>
                            Volgende betaling:{" "}
                            {format(
                              new Date(sub.next_billing_date),
                              "d MMMM yyyy",
                              { locale: nl }
                            )}
                          </div>
                        )}
                        {sub.website && (
                          <a
                            href={sub.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Website
                          </a>
                        )}
                        {sub.notes && (
                          <p className="italic">{sub.notes}</p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingSubscription(sub)}
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Bewerken
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Verzekering verwijderen?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Weet je zeker dat je "{sub.name}" wilt verwijderen?
                              Dit kan niet ongedaan worden gemaakt.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuleren</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteSubscription.mutate(sub.id)
                              }
                            >
                              Verwijderen
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog
        open={!!editingSubscription}
        onOpenChange={() => setEditingSubscription(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verzekering bewerken</DialogTitle>
          </DialogHeader>
          {editingSubscription && (
            <SubscriptionForm
              subscription={editingSubscription}
              onSuccess={() => setEditingSubscription(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Insurance;
