-- Add promotional banner fields to website_settings table
ALTER TABLE website_settings
ADD COLUMN IF NOT EXISTS promo_banner_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS promo_banner_title TEXT,
ADD COLUMN IF NOT EXISTS promo_banner_description TEXT,
ADD COLUMN IF NOT EXISTS promo_banner_button_text TEXT,
ADD COLUMN IF NOT EXISTS promo_banner_button_link TEXT,
ADD COLUMN IF NOT EXISTS promo_banner_bg_color TEXT DEFAULT 'blue';