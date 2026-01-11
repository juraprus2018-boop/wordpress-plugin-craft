-- Create subscription categories enum type
CREATE TYPE subscription_category AS ENUM (
  'streaming',
  'internet_telecom', 
  'energy',
  'water',
  'insurance',
  'sports_fitness',
  'software',
  'news_magazines',
  'music',
  'gaming',
  'cloud_storage',
  'food_delivery',
  'transportation',
  'education',
  'other'
);

-- Create billing cycle enum type
CREATE TYPE billing_cycle AS ENUM (
  'weekly',
  'monthly',
  'quarterly',
  'half_yearly',
  'yearly'
);

-- Create subscription status enum type
CREATE TYPE subscription_status AS ENUM (
  'active',
  'cancelled',
  'paused',
  'expired'
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  provider TEXT,
  category subscription_category NOT NULL DEFAULT 'other',
  amount NUMERIC NOT NULL,
  billing_cycle billing_cycle NOT NULL DEFAULT 'monthly',
  billing_day INTEGER CHECK (billing_day >= 1 AND billing_day <= 31),
  status subscription_status NOT NULL DEFAULT 'active',
  contract_start_date DATE,
  contract_end_date DATE,
  cancellation_period_days INTEGER DEFAULT 30,
  auto_renewal BOOLEAN DEFAULT true,
  next_billing_date DATE,
  website TEXT,
  notes TEXT,
  member_id UUID REFERENCES public.household_members(id) ON DELETE SET NULL,
  is_shared BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
ON public.subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subscriptions" 
ON public.subscriptions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_category ON public.subscriptions(category);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_next_billing ON public.subscriptions(next_billing_date);