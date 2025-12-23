import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Category, Transaction, HouseholdMember } from '@/hooks/useTransactions';

const transactionSchema = z.object({
  name: z.string().min(1, 'Naam is verplicht').max(100, 'Naam mag maximaal 100 karakters zijn'),
  amount: z.string().min(1, 'Bedrag is verplicht').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Voer een geldig bedrag in'
  ),
  category_id: z.string().optional(),
  description: z.string().max(500, 'Beschrijving mag maximaal 500 karakters zijn').optional(),
  day_of_month: z.string().optional(),
  member_id: z.string().optional(),
  is_shared: z.boolean().default(false),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

interface TransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'income' | 'expense';
  categories: Category[];
  householdMembers: HouseholdMember[];
  transaction?: Transaction;
  onSubmit: (data: {
    type: 'income' | 'expense';
    name: string;
    amount: number;
    category_id: string | null;
    description?: string;
    day_of_month?: number | null;
    member_id?: string | null;
    is_shared?: boolean;
  }) => void;
}

export function TransactionForm({
  open,
  onOpenChange,
  type,
  categories,
  householdMembers,
  transaction,
  onSubmit,
}: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      name: transaction?.name || '',
      amount: transaction?.amount ? String(transaction.amount) : '',
      category_id: transaction?.category_id || '',
      description: transaction?.description || '',
      day_of_month: transaction?.day_of_month ? String(transaction.day_of_month) : '',
      member_id: transaction?.member_id || '',
      is_shared: transaction?.is_shared || false,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: transaction?.name || '',
        amount: transaction?.amount ? String(transaction.amount) : '',
        category_id: transaction?.category_id || '',
        description: transaction?.description || '',
        day_of_month: transaction?.day_of_month ? String(transaction.day_of_month) : '',
        member_id: transaction?.member_id || '',
        is_shared: transaction?.is_shared || false,
      });
    }
  }, [open, transaction, form]);

  const handleSubmit = async (data: TransactionFormData) => {
    setIsSubmitting(true);
    try {
      onSubmit({
        type,
        name: data.name,
        amount: parseFloat(data.amount),
        category_id: data.category_id || null,
        description: data.description,
        day_of_month: data.day_of_month ? parseInt(data.day_of_month) : null,
        member_id: data.member_id || null,
        is_shared: data.is_shared,
      });
      form.reset();
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = transaction 
    ? (type === 'income' ? 'Inkomen bewerken' : 'Uitgave bewerken')
    : (type === 'income' ? 'Inkomen toevoegen' : 'Uitgave toevoegen');

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-heading">{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input placeholder="bijv. Salaris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrag (€)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="day_of_month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dag van de maand</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer dag" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {daysOfMonth.map((day) => (
                        <SelectItem key={day} value={String(day)}>
                          {day}e
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
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorie</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecteer categorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {householdMembers.length > 0 && (
              <>
                <FormField
                  control={form.control}
                  name="member_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gezinslid</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer gezinslid (optioneel)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Geen specifiek lid</SelectItem>
                          {householdMembers.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              <span className="flex items-center gap-2">
                                <span 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: member.color || '#6B7280' }}
                                />
                                {member.name}
                              </span>
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
                  name="is_shared"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Gezamenlijke {type === 'income' ? 'inkomst' : 'uitgave'}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beschrijving (optioneel)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Extra notities..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Annuleren
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Opslaan...' : 'Opslaan'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}