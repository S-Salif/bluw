-- Create table for logo orders
CREATE TABLE public.logo_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Company information
  company_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  
  -- Logo information
  logo_name TEXT NOT NULL,
  style TEXT NOT NULL,
  message TEXT NOT NULL,
  formats TEXT[] NOT NULL,
  
  -- Visual preferences (optional)
  preferred_colors TEXT,
  avoided_colors TEXT,
  typography TEXT,
  icons TEXT,
  slogan TEXT,
  examples_url TEXT,
  usage TEXT[],
  
  -- Package and payment
  package TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  
  -- Payment tracking
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.logo_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for inserting and updating orders
CREATE POLICY "allow_insert_logo_orders" 
ON public.logo_orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "admin_access_logo_orders" 
ON public.logo_orders 
FOR ALL 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_logo_orders_updated_at
BEFORE UPDATE ON public.logo_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();