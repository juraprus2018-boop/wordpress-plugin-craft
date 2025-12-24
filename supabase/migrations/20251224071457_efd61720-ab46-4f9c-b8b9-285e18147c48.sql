-- Add frequency column to transactions table
-- Values: 1 = monthly, 2 = every 2 months, 3 = quarterly
ALTER TABLE public.transactions 
ADD COLUMN frequency integer DEFAULT 1;