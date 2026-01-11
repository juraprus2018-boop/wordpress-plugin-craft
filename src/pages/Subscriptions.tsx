import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SubscriptionForm } from "@/components/subscriptions/SubscriptionForm";
import { SubscriptionList } from "@/components/subscriptions/SubscriptionList";
import { SubscriptionOverview } from "@/components/subscriptions/SubscriptionOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, List, Settings } from "lucide-react";

const Subscriptions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Abonnementen & Vaste Lasten</h1>
            <p className="text-muted-foreground">
              Beheer al je abonnementen, contracten en vaste lasten op één plek.
            </p>
          </div>
          <SubscriptionForm />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overzicht</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Alle abonnementen</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SubscriptionOverview />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <SubscriptionList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
