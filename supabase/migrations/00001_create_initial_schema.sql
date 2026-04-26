-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'vendor', 'admin');

-- Create vendor status enum
CREATE TYPE public.vendor_status AS ENUM ('pending', 'approved', 'rejected');

-- Create lead status enum
CREATE TYPE public.lead_status AS ENUM ('new', 'assigned', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost');

-- Create category type enum
CREATE TYPE public.category_type AS ENUM ('software', 'telecom', 'all');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  phone TEXT,
  full_name TEXT,
  role public.user_role NOT NULL DEFAULT 'user'::public.user_role,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create vendors table
CREATE TABLE public.vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  status public.vendor_status NOT NULL DEFAULT 'pending'::public.vendor_status,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type public.category_type NOT NULL DEFAULT 'all'::public.category_type,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES public.vendors(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  features TEXT[],
  price TEXT,
  images TEXT[],
  rating NUMERIC(2,1) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  requirement_details TEXT NOT NULL,
  budget TEXT,
  authority TEXT,
  need TEXT,
  timing TEXT,
  bant_score NUMERIC(3,1),
  status public.lead_status NOT NULL DEFAULT 'new'::public.lead_status,
  assigned_vendor_id UUID REFERENCES public.vendors(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create lead_remarks table
CREATE TABLE public.lead_remarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  remark TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  seo_title TEXT,
  seo_description TEXT,
  featured_image TEXT,
  show_on_homepage BOOLEAN DEFAULT FALSE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create website_settings table
CREATE TABLE public.website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url TEXT,
  favicon_url TEXT,
  whatsapp_number TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  footer_content JSONB DEFAULT '{}'::jsonb,
  promo_banner_text TEXT DEFAULT 'Post your unused leads and get up to 10% commission on your deals!',
  promo_banner_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('app-8n1wxpg9ygap_images', 'app-8n1wxpg9ygap_images', true);

-- Create storage policies
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id = 'app-8n1wxpg9ygap_images');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'app-8n1wxpg9ygap_images');
CREATE POLICY "Users can update own files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'app-8n1wxpg9ygap_images');
CREATE POLICY "Users can delete own files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'app-8n1wxpg9ygap_images');

-- Create trigger function for profiles
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  SELECT COUNT(*) INTO user_count FROM profiles;
  INSERT INTO public.profiles (id, email, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
  );
  RETURN NEW;
END;
$$;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION handle_new_user();

-- Create helper function for admin check
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Create helper function for vendor check
CREATE OR REPLACE FUNCTION is_vendor(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'vendor'::user_role
  );
$$;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_remarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles" ON profiles FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- Vendors policies
CREATE POLICY "Anyone can view approved vendors" ON vendors FOR SELECT USING (status = 'approved'::vendor_status OR is_admin(auth.uid()) OR profile_id = auth.uid());
CREATE POLICY "Admins can manage all vendors" ON vendors FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Users can create vendor profile" ON vendors FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Vendors can update own profile" ON vendors FOR UPDATE TO authenticated USING (profile_id = auth.uid());

-- Categories policies
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Products policies
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can manage all products" ON products FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Vendors can manage own products" ON products FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM vendors WHERE vendors.id = products.vendor_id AND vendors.profile_id = auth.uid()));

-- Leads policies
CREATE POLICY "Admins can view all leads" ON leads FOR SELECT TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Users can view own leads" ON leads FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Vendors can view assigned leads" ON leads FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM vendors WHERE vendors.id = leads.assigned_vendor_id AND vendors.profile_id = auth.uid()));
CREATE POLICY "Users can create leads" ON leads FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all leads" ON leads FOR ALL TO authenticated USING (is_admin(auth.uid()));
CREATE POLICY "Vendors can update assigned leads" ON leads FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM vendors WHERE vendors.id = leads.assigned_vendor_id AND vendors.profile_id = auth.uid()));

-- Lead remarks policies
CREATE POLICY "Users can view remarks on own leads" ON lead_remarks FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM leads WHERE leads.id = lead_remarks.lead_id AND (leads.user_id = auth.uid() OR is_admin(auth.uid()) OR EXISTS (SELECT 1 FROM vendors WHERE vendors.id = leads.assigned_vendor_id AND vendors.profile_id = auth.uid()))));
CREATE POLICY "Authenticated users can create remarks" ON lead_remarks FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all remarks" ON lead_remarks FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Blogs policies
CREATE POLICY "Anyone can view blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Admins can manage blogs" ON blogs FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Website settings policies
CREATE POLICY "Anyone can view website settings" ON website_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage website settings" ON website_settings FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can create notifications" ON notifications FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Insert default website settings
INSERT INTO public.website_settings (id) VALUES (gen_random_uuid());

-- Insert default categories
INSERT INTO public.categories (name, slug, type) VALUES
  ('ERP Software', 'erp-software', 'software'),
  ('CRM Software', 'crm-software', 'software'),
  ('Cloud Telephony', 'cloud-telephony', 'telecom'),
  ('WhatsApp API', 'whatsapp-api', 'telecom'),
  ('SIP Trunk', 'sip-trunk', 'telecom'),
  ('Internet Lease Line', 'internet-lease-line', 'telecom');