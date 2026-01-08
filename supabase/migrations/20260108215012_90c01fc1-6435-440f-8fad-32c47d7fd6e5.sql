-- Add type column to debts table to distinguish between debts and loans
ALTER TABLE public.debts 
ADD COLUMN type text NOT NULL DEFAULT 'debt' 
CHECK (type IN ('debt', 'loan'));