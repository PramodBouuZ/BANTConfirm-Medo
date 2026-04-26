export type UserRole = 'user' | 'vendor' | 'admin';
export type VendorStatus = 'pending' | 'approved' | 'rejected';
export type LeadStatus = 'new' | 'assigned' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';
export type CategoryType = 'software' | 'telecom' | 'all';

export interface Profile {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  mobile_number: string | null;
  location: string | null;
  company_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  profile_id: string;
  company_name: string;
  logo_url: string | null;
  description: string | null;
  status: VendorStatus;
  website_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: CategoryType;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  vendor_id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  features: string[] | null;
  price: string | null;
  images: string[] | null;
  rating: number | null;
  is_visible: boolean;
  similar_products: string[] | null;
  created_at: string;
  updated_at: string;
  vendor?: Vendor;
  category?: Category;
}

export interface Lead {
  id: string;
  user_id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  requirement_details: string;
  budget: string | null;
  authority: string | null;
  need: string | null;
  timing: string | null;
  bant_score: number | null;
  status: LeadStatus;
  assigned_vendor_id: string | null;
  city: string | null;
  state: string | null;
  location: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
  user?: Profile;
  assigned_vendor?: Vendor;
}

export interface LeadHistory {
  id: string;
  lead_id: string;
  user_id: string;
  action: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
  user?: Profile;
}

export interface LeadRemark {
  id: string;
  lead_id: string;
  user_id: string;
  remark: string;
  created_at: string;
  user?: Profile;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  category_id: string | null;
  author: string | null;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  show_on_homepage: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface WebsiteSettings {
  id: string;
  site_name: string | null;
  site_description: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  twitter_url: string | null;
  whatsapp_number: string | null;
  footer_text: string | null;
  promotional_banner: string | null;
  promo_banner_enabled: boolean;
  promo_banner_title: string | null;
  promo_banner_description: string | null;
  promo_banner_button_text: string | null;
  promo_banner_button_link: string | null;
  promo_banner_bg_color: string | null;
  promo_banner_image_url: string | null;
  notification_settings: {
    email_notifications: boolean;
    lead_notifications: boolean;
    vendor_notifications: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata: Record<string, any>;
  created_at: string;
}

export interface BANTQualificationRequest {
  requirement_details: string;
  budget?: string;
  authority?: string;
  need?: string;
  timing?: string;
}

export interface BANTQualificationResponse {
  bant_score: number;
  analysis: {
    budget: string;
    authority: string;
    need: string;
    timing: string;
  };
  recommended_vendors: string[];
}
