-- Add missing fields to vendors table
ALTER TABLE vendors 
ADD COLUMN IF NOT EXISTS website_url TEXT,
ADD COLUMN IF NOT EXISTS contact_email TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Add missing fields to categories table
ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- Update blogs table structure
ALTER TABLE blogs 
DROP COLUMN IF EXISTS author_id CASCADE,
DROP COLUMN IF EXISTS category CASCADE,
DROP COLUMN IF EXISTS seo_title CASCADE,
DROP COLUMN IF EXISTS seo_description CASCADE;

ALTER TABLE blogs
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id),
ADD COLUMN IF NOT EXISTS author TEXT,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Update website_settings table structure
ALTER TABLE website_settings
DROP COLUMN IF EXISTS social_links CASCADE,
DROP COLUMN IF EXISTS footer_content CASCADE,
DROP COLUMN IF EXISTS promo_banner_text CASCADE,
DROP COLUMN IF EXISTS promo_banner_enabled CASCADE;

ALTER TABLE website_settings
ADD COLUMN IF NOT EXISTS site_name TEXT,
ADD COLUMN IF NOT EXISTS site_description TEXT,
ADD COLUMN IF NOT EXISTS facebook_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS footer_text TEXT,
ADD COLUMN IF NOT EXISTS promotional_banner TEXT,
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{"email_notifications": true, "lead_notifications": true, "vendor_notifications": true}'::jsonb;

-- Add missing fields to leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS category TEXT;

-- Insert default website settings if not exists
INSERT INTO website_settings (site_name, site_description, promotional_banner, footer_text)
VALUES (
  'BantConfirm',
  'India''s #1 B2B AI Marketplace for Software, IT Hardware, Telecom, and Cloud & Enterprise Services',
  'Post your unused leads and get up to 10% commission on your deals!',
  'India''s #1 B2B AI Marketplace. Transform your unused leads into revenue and find verified service providers.'
)
ON CONFLICT (id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  site_description = EXCLUDED.site_description,
  promotional_banner = EXCLUDED.promotional_banner,
  footer_text = EXCLUDED.footer_text;