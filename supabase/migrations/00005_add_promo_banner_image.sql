-- Add promotional banner image field to website_settings table
ALTER TABLE website_settings
ADD COLUMN IF NOT EXISTS promo_banner_image_url TEXT;