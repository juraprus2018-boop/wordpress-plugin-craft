-- Add day_of_month column to transactions for recurring payments
ALTER TABLE public.transactions 
ADD COLUMN day_of_month integer CHECK (day_of_month >= 1 AND day_of_month <= 31);

-- Create household_members table for family tracking
CREATE TABLE public.household_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  name text NOT NULL,
  color text DEFAULT '#6B7280',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.household_members ENABLE ROW LEVEL SECURITY;

-- RLS policies for household_members
CREATE POLICY "Users can view their own household members" 
ON public.household_members 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own household members" 
ON public.household_members 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own household members" 
ON public.household_members 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own household members" 
ON public.household_members 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add member_id to transactions (nullable for shared/personal transactions)
ALTER TABLE public.transactions 
ADD COLUMN member_id uuid REFERENCES public.household_members(id) ON DELETE SET NULL;

-- Add is_shared column to mark transactions as shared household expenses
ALTER TABLE public.transactions 
ADD COLUMN is_shared boolean DEFAULT false;