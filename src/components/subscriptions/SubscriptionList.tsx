import { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  Edit,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  useSubscriptions,
  Subscription,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  BILLING_CYCLE_LABELS,
  STATUS_LABELS,
  SubscriptionCategory,
} from "@/hooks/useSubscriptions";
import { SubscriptionForm } from "./SubscriptionForm";

const StatusBadge = ({ status }: { status: Subscription['status'] }) => {
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

const SubscriptionCard = ({
  subscription,
  onEdit,
  onDelete,
  monthlyAmount,
}: {
  subscription: Subscription;
  onEdit: () => void;
  onDelete: () => void;
  monthlyAmount: number;
}) => {
  const daysUntilRenewal = subscription.next_billing_date
    ? Math.ceil(
        (new Date(subscription.next_billing_date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const daysUntilContractEnd = subscription.contract_end_date
    ? Math.ceil(
        (new Date(subscription.contract_end_date).getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
              style={{ backgroundColor: `${CATEGORY_COLORS[subscription.category]}20` }}
            >
              {CATEGORY_ICONS[subscription.category]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold truncate">{subscription.name}</h3>
                <StatusBadge status={subscription.status} />
              </div>
              {subscription.provider && (
                <p className="text-sm text-muted-foreground truncate">
                  {subscription.provider}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {CATEGORY_LABELS[subscription.category]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {BILLING_CYCLE_LABELS[subscription.billing_cycle]}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="font-bold text-lg">
              €{subscription.amount.toFixed(2)}
            </div>
            {subscription.billing_cycle !== 'monthly' && (
              <div className="text-xs text-muted-foreground">
                €{monthlyAmount.toFixed(2)}/mnd
              </div>
            )}
          </div>
        </div>

        {/* Warnings */}
        <div className="mt-3 space-y-1">
          {daysUntilRenewal !== null && daysUntilRenewal >= 0 && daysUntilRenewal <= 7 && (
            <div className="flex items-center gap-2 text-xs text-orange-500 bg-orange-500/10 rounded px-2 py-1">
              <Calendar className="h-3 w-3" />
              Betaling over {daysUntilRenewal} dagen
            </div>
          )}
          {daysUntilContractEnd !== null && daysUntilContractEnd >= 0 && daysUntilContractEnd <= 30 && (
            <div className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 rounded px-2 py-1">
              <AlertTriangle className="h-3 w-3" />
              Contract eindigt over {daysUntilContractEnd} dagen
            </div>
          )}
        </div>

        {/* Details */}
        {(subscription.next_billing_date || subscription.contract_end_date || subscription.website) && (
          <div className="mt-3 pt-3 border-t text-xs text-muted-foreground space-y-1">
            {subscription.next_billing_date && (
              <div>
                Volgende betaling:{" "}
                {format(new Date(subscription.next_billing_date), "d MMMM yyyy", { locale: nl })}
              </div>
            )}
            {subscription.contract_end_date && (
              <div>
                Contract tot:{" "}
                {format(new Date(subscription.contract_end_date), "d MMMM yyyy", { locale: nl })}
              </div>
            )}
            {subscription.website && (
              <a
                href={subscription.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                Website
              </a>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t">
          <Button variant="ghost" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-4 w-4 mr-1" />
            Bewerken
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Abonnement verwijderen?</AlertDialogTitle>
                <AlertDialogDescription>
                  Weet je zeker dat je "{subscription.name}" wilt verwijderen? Dit kan niet ongedaan worden gemaakt.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Verwijderen</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export const SubscriptionList = () => {
  const { subscriptions, isLoading, deleteSubscription, calculateMonthlyCost } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Group subscriptions by category
  const groupedSubscriptions = subscriptions.reduce((acc, sub) => {
    if (!acc[sub.category]) {
      acc[sub.category] = [];
    }
    acc[sub.category].push(sub);
    return acc;
  }, {} as Record<SubscriptionCategory, Subscription[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Je hebt nog geen abonnementen toegevoegd.
          </p>
          <p className="text-sm text-muted-foreground">
            Voeg je eerste abonnement toe om een overzicht te krijgen van je vaste lasten.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {(Object.keys(groupedSubscriptions) as SubscriptionCategory[]).map((category) => {
          const categorySubscriptions = groupedSubscriptions[category];
          const categoryTotal = categorySubscriptions.reduce(
            (sum, sub) => sum + (sub.status === 'active' ? calculateMonthlyCost(sub) : 0),
            0
          );
          const isExpanded = expandedCategories.has(category);
          const activeCount = categorySubscriptions.filter(s => s.status === 'active').length;

          return (
            <Collapsible
              key={category}
              open={isExpanded}
              onOpenChange={() => toggleCategory(category)}
            >
              <Card>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                          style={{ backgroundColor: `${CATEGORY_COLORS[category]}20` }}
                        >
                          {CATEGORY_ICONS[category]}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {CATEGORY_LABELS[category]}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {activeCount} actief{activeCount !== 1 ? '' : ''} abonnement{categorySubscriptions.length !== 1 ? 'en' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">€{categoryTotal.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">per maand</div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid gap-3">
                      {categorySubscriptions.map((subscription) => (
                        <SubscriptionCard
                          key={subscription.id}
                          subscription={subscription}
                          monthlyAmount={calculateMonthlyCost(subscription)}
                          onEdit={() => setEditingSubscription(subscription)}
                          onDelete={() => deleteSubscription.mutate(subscription.id)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      <Dialog open={!!editingSubscription} onOpenChange={() => setEditingSubscription(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Abonnement bewerken</DialogTitle>
          </DialogHeader>
          {editingSubscription && (
            <SubscriptionForm
              subscription={editingSubscription}
              onSuccess={() => setEditingSubscription(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
