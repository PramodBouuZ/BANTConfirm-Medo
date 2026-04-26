-- Add location fields to leads table
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS state TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS location TEXT;

-- Add category field to leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS category TEXT;

-- Add visibility field to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;

-- Add similar_products field to products
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS similar_products UUID[];

-- Add is_active field to categories
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Add website_url and contact_email to vendors
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS contact_phone TEXT;

-- Add is_active field to vendors
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- Create lead_history table for tracking changes
CREATE TABLE IF NOT EXISTS public.lead_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on lead_history
ALTER TABLE public.lead_history ENABLE ROW LEVEL SECURITY;

-- Lead history policies
CREATE POLICY "Admins can view all lead history" ON lead_history FOR SELECT TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Admins can create lead history" ON lead_history FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

-- Add notification preferences to website_settings
ALTER TABLE public.website_settings ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{
  "email_notifications": true,
  "lead_notifications": true,
  "vendor_notifications": true
}'::jsonb;

-- Update notifications table to support more types
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS link TEXT;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS action_required BOOLEAN DEFAULT FALSE;

-- Create function to log lead changes
CREATE OR REPLACE FUNCTION log_lead_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    -- Log status changes
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      INSERT INTO public.lead_history (lead_id, user_id, action, old_value, new_value)
      VALUES (NEW.id, auth.uid(), 'status_change', OLD.status::text, NEW.status::text);
    END IF;
    
    -- Log vendor assignment
    IF OLD.assigned_vendor_id IS DISTINCT FROM NEW.assigned_vendor_id THEN
      INSERT INTO public.lead_history (lead_id, user_id, action, old_value, new_value)
      VALUES (NEW.id, auth.uid(), 'vendor_assignment', 
              COALESCE(OLD.assigned_vendor_id::text, 'none'), 
              COALESCE(NEW.assigned_vendor_id::text, 'none'));
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for lead changes
DROP TRIGGER IF EXISTS lead_change_trigger ON public.leads;
CREATE TRIGGER lead_change_trigger
  AFTER UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION log_lead_change();