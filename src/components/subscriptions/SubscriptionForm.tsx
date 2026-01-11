import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { CalendarIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  useSubscriptions,
  SubscriptionInsert,
  SubscriptionCategory,
  BillingCycle,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  BILLING_CYCLE_LABELS,
  Subscription,
} from "@/hooks/useSubscriptions";

const formSchema = z.object({
  name: z.string().min(1, "Naam is verplicht"),
  provider: z.string().optional(),
  category: z.enum([
    'streaming', 'internet_telecom', 'energy', 'water', 'insurance',
    'sports_fitness', 'software', 'news_magazines', 'music', 'gaming',
    'cloud_storage', 'food_delivery', 'transportation', 'education', 'other'
  ] as const),
  amount: z.number().min(0.01, "Bedrag moet groter zijn dan 0"),
  billing_cycle: z.enum(['weekly', 'monthly', 'quarterly', 'half_yearly', 'yearly'] as const),
  billing_day: z.number().min(1).max(31).optional(),
  contract_start_date: z.date().optional(),
  contract_end_date: z.date().optional(),
  cancellation_period_days: z.number().min(0).optional(),
  auto_renewal: z.boolean(),
  next_billing_date: z.date().optional(),
  website: z.string().url("Voer een geldige URL in").optional().or(z.literal("")),
  notes: z.string().optional(),
  is_shared: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface SubscriptionFormProps {
  subscription?: Subscription;
  onSuccess?: () => void;
}

export const SubscriptionForm = ({ subscription, onSuccess }: SubscriptionFormProps) => {
  const [open, setOpen] = useState(false);
  const { createSubscription, updateSubscription } = useSubscriptions();

  const isEditing = !!subscription;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subscription?.name || "",
      provider: subscription?.provider || "",
      category: subscription?.category || "other",
      amount: subscription?.amount || 0,
      billing_cycle: subscription?.billing_cycle || "monthly",
      billing_day: subscription?.billing_day || undefined,
      contract_start_date: subscription?.contract_start_date 
        ? new Date(subscription.contract_start_date) 
        : undefined,
      contract_end_date: subscription?.contract_end_date 
        ? new Date(subscription.contract_end_date) 
        : undefined,
      cancellation_period_days: subscription?.cancellation_period_days || 30,
      auto_renewal: subscription?.auto_renewal ?? true,
      next_billing_date: subscription?.next_billing_date 
        ? new Date(subscription.next_billing_date) 
        : undefined,
      website: subscription?.website || "",
      notes: subscription?.notes || "",
      is_shared: subscription?.is_shared ?? false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const data: SubscriptionInsert = {
      name: values.name,
      provider: values.provider || null,
      category: values.category,
      amount: values.amount,
      billing_cycle: values.billing_cycle,
      billing_day: values.billing_day || null,
      contract_start_date: values.contract_start_date 
        ? format(values.contract_start_date, 'yyyy-MM-dd') 
        : null,
      contract_end_date: values.contract_end_date 
        ? format(values.contract_end_date, 'yyyy-MM-dd') 
        : null,
      cancellation_period_days: values.cancellation_period_days || null,
      auto_renewal: values.auto_renewal,
      next_billing_date: values.next_billing_date 
        ? format(values.next_billing_date, 'yyyy-MM-dd') 
        : null,
      website: values.website || null,
      notes: values.notes || null,
      is_shared: values.is_shared,
    };

    if (isEditing && subscription) {
      await updateSubscription.mutateAsync({ id: subscription.id, ...data });
    } else {
      await createSubscription.mutateAsync(data);
    }

    form.reset();
    setOpen(false);
    onSuccess?.();
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Naam *</FormLabel>
                <FormControl>
                  <Input placeholder="bijv. Netflix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aanbieder</FormLabel>
                <FormControl>
                  <Input placeholder="bijv. Netflix B.V." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categorie *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer categorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(Object.keys(CATEGORY_LABELS) as SubscriptionCategory[]).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bedrag (€) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="billing_cycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Betaalperiode *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer periode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(Object.keys(BILLING_CYCLE_LABELS) as BillingCycle[]).map((cycle) => (
                      <SelectItem key={cycle} value={cycle}>
                        {BILLING_CYCLE_LABELS[cycle]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="billing_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Betaaldag</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="1-31"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                  />
                </FormControl>
                <FormDescription>Dag van de maand</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contract_start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Contract startdatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "d MMMM yyyy", { locale: nl })
                        ) : (
                          <span>Selecteer datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contract_end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Contract einddatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "d MMMM yyyy", { locale: nl })
                        ) : (
                          <span>Selecteer datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cancellation_period_days"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opzegtermijn (dagen)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="30"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="next_billing_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Volgende betaaldatum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "d MMMM yyyy", { locale: nl })
                        ) : (
                          <span>Selecteer datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://www.example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notities</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Extra informatie over dit abonnement..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="auto_renewal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Automatische verlenging</FormLabel>
                  <FormDescription>
                    Wordt automatisch verlengd
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_shared"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Gedeelde kosten</FormLabel>
                  <FormDescription>
                    Wordt gedeeld met huishouden
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={createSubscription.isPending || updateSubscription.isPending}>
          {isEditing ? "Opslaan" : "Toevoegen"}
        </Button>
      </form>
    </Form>
  );

  if (isEditing) {
    return formContent;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Abonnement toevoegen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nieuw abonnement</DialogTitle>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
};
