import { supabase } from './supabase';
import type {
  Profile,
  Vendor,
  Category,
  Product,
  Lead,
  LeadRemark,
  Blog,
  WebsiteSettings,
  Notification,
  VendorStatus,
  LeadStatus,
} from '@/types/types';

// Profiles
export const getProfile = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as Profile | null;
};

export const updateProfile = async (id: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Profile;
};

export const getAllProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

// Vendors
export const getVendors = async (status?: VendorStatus) => {
  let query = supabase
    .from('vendors')
    .select('*, profile:profiles!vendors_profile_id_fkey(*)');
  
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getVendorByProfileId = async (profileId: string) => {
  const { data, error } = await supabase
    .from('vendors')
    .select('*, profile:profiles!vendors_profile_id_fkey(*)')
    .eq('profile_id', profileId)
    .maybeSingle();
  if (error) throw error;
  return data as Vendor | null;
};

export const createVendor = async (vendor: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('vendors')
    .insert(vendor)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Vendor;
};

export const updateVendor = async (id: string, updates: Partial<Vendor>) => {
  const { data, error } = await supabase
    .from('vendors')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Vendor;
};

// Categories - CRUD operations
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const createCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Category;
};

export const updateCategory = async (id: string, updates: Partial<Category>) => {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Category;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Products
export const getProducts = async (filters?: { category_id?: string; search?: string }) => {
  let query = supabase
    .from('products')
    .select('*, vendor:vendors!products_vendor_id_fkey(*, profile:profiles!vendors_profile_id_fkey(*)), category:categories!products_category_id_fkey(*)');
  
  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }
  
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, vendor:vendors!products_vendor_id_fkey(*, profile:profiles!vendors_profile_id_fkey(*)), category:categories!products_category_id_fkey(*)')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Product | null;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Product;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Product;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Leads
export const getLeads = async (filters?: { user_id?: string; vendor_id?: string; status?: LeadStatus }) => {
  let query = supabase
    .from('leads')
    .select('*, user:profiles!leads_user_id_fkey(*), assigned_vendor:vendors!leads_assigned_vendor_id_fkey(*, profile:profiles!vendors_profile_id_fkey(*))');
  
  if (filters?.user_id) {
    query = query.eq('user_id', filters.user_id);
  }
  
  if (filters?.vendor_id) {
    query = query.eq('assigned_vendor_id', filters.vendor_id);
  }
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getLeadById = async (id: string) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*, user:profiles!leads_user_id_fkey(*), assigned_vendor:vendors!leads_assigned_vendor_id_fkey(*, profile:profiles!vendors_profile_id_fkey(*))')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as Lead | null;
};

export const createLead = async (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('leads')
    .insert(lead)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Lead;
};

export const updateLead = async (id: string, updates: Partial<Lead>) => {
  const { data, error } = await supabase
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Lead;
};

// Lead Remarks
export const getLeadRemarks = async (leadId: string) => {
  const { data, error } = await supabase
    .from('lead_remarks')
    .select('*, user:profiles!lead_remarks_user_id_fkey(*)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const createLeadRemark = async (remark: Omit<LeadRemark, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('lead_remarks')
    .insert(remark)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as LeadRemark;
};

// Lead History
export const getLeadHistory = async (leadId: string) => {
  const { data, error } = await supabase
    .from('lead_history')
    .select('*, user:profiles!lead_history_user_id_fkey(*)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

// Blogs
export const getBlogs = async (filters?: { show_on_homepage?: boolean; category?: string }) => {
  let query = supabase
    .from('blogs')
    .select('*, category:categories!blogs_category_id_fkey(*)');
  
  if (filters?.show_on_homepage !== undefined) {
    query = query.eq('show_on_homepage', filters.show_on_homepage);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*, category:categories!blogs_category_id_fkey(*)')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw error;
  return data as Blog | null;
};

export const createBlog = async (blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('blogs')
    .insert(blog)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Blog;
};

export const updateBlog = async (id: string, updates: Partial<Blog>) => {
  const { data, error } = await supabase
    .from('blogs')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Blog;
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Website Settings
export const getWebsiteSettings = async () => {
  const { data, error } = await supabase
    .from('website_settings')
    .select('*')
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data as WebsiteSettings | null;
};

export const updateWebsiteSettings = async (id: string, updates: Partial<WebsiteSettings>) => {
  const { data, error } = await supabase
    .from('website_settings')
    .update(updates)
    .eq('id', id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as WebsiteSettings;
};

// Notifications
export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return Array.isArray(data) ? data : [];
};

export const markNotificationAsRead = async (id: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', id);
  if (error) throw error;
};

export const createNotification = async (notification: Omit<Notification, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data as Notification;
};

// Stats
export const getAdminStats = async () => {
  const [leadsResult, vendorsResult, usersResult] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('vendors').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
  ]);

  return {
    totalLeads: leadsResult.count || 0,
    totalVendors: vendorsResult.count || 0,
    totalUsers: usersResult.count || 0,
  };
};
