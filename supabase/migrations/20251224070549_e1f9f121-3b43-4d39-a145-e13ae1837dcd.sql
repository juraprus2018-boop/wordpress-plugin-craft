-- Create debts table
CREATE TABLE public.debts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  creditor TEXT,
  original_amount NUMERIC NOT NULL,
  remaining_amount NUMERIC NOT NULL,
  monthly_payment NUMERIC NOT NULL DEFAULT 0,
  day_of_month INTEGER,
  member_id UUID REFERENCES public.household_members(id) ON DELETE SET NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.debts ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own debts"
ON public.debts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debts"
ON public.debts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debts"
ON public.debts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debts"
ON public.debts FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_debts_updated_at
BEFORE UPDATE ON public.debts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();