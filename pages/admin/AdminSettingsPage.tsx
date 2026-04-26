import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getWebsiteSettings, updateWebsiteSettings } from '@/db/api';
import type { WebsiteSettings } from '@/types/types';
import { Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadFileToSupabase } from '@/lib/upload';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    site_name: '',
    site_description: '',
    logo_url: '',
    favicon_url: '',
    facebook_url: '',
    linkedin_url: '',
    instagram_url: '',
    twitter_url: '',
    whatsapp_number: '',
    footer_text: '',
    promotional_banner: '',
    promo_banner_enabled: false,
    promo_banner_title: '',
    promo_banner_description: '',
    promo_banner_button_text: '',
    promo_banner_button_link: '',
    promo_banner_bg_color: 'blue',
    promo_banner_image_url: '',
    notification_settings: {
      email_notifications: true,
      lead_notifications: true,
      vendor_notifications: true,
    },
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [promoBannerImageFile, setPromoBannerImageFile] = useState<File | null>(null);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getWebsiteSettings();
      if (data) {
        setSettings(data);
        setFormData({
          site_name: data.site_name || '',
          site_description: data.site_description || '',
          logo_url: data.logo_url || '',
          favicon_url: data.favicon_url || '',
          facebook_url: data.facebook_url || '',
          linkedin_url: data.linkedin_url || '',
          instagram_url: data.instagram_url || '',
          twitter_url: data.twitter_url || '',
          whatsapp_number: data.whatsapp_number || '',
          footer_text: data.footer_text || '',
          promotional_banner: data.promotional_banner || '',
          promo_banner_enabled: data.promo_banner_enabled || false,
          promo_banner_title: data.promo_banner_title || '',
          promo_banner_description: data.promo_banner_description || '',
          promo_banner_button_text: data.promo_banner_button_text || '',
          promo_banner_button_link: data.promo_banner_button_link || '',
          promo_banner_bg_color: data.promo_banner_bg_color || 'blue',
          promo_banner_image_url: data.promo_banner_image_url || '',
          notification_settings: data.notification_settings || {
            email_notifications: true,
            lead_notifications: true,
            vendor_notifications: true,
          },
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleFaviconSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaviconFile(e.target.files[0]);
    }
  };

  const handlePromoBannerImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPromoBannerImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let logoUrl = formData.logo_url;
      let faviconUrl = formData.favicon_url;
      let promoBannerImageUrl = formData.promo_banner_image_url;

      if (logoFile) {
        setUploading(true);
        const uploadedUrl = await uploadFileToSupabase(logoFile, 'app-8n1wxpg9ygap_images');
        setUploading(false);
        if (uploadedUrl) logoUrl = uploadedUrl;
      }

      if (faviconFile) {
        setUploading(true);
        const uploadedUrl = await uploadFileToSupabase(faviconFile, 'app-8n1wxpg9ygap_images');
        setUploading(false);
        if (uploadedUrl) faviconUrl = uploadedUrl;
      }

      if (promoBannerImageFile) {
        setUploading(true);
        const uploadedUrl = await uploadFileToSupabase(promoBannerImageFile, 'app-8n1wxpg9ygap_images');
        setUploading(false);
        if (uploadedUrl) promoBannerImageUrl = uploadedUrl;
      }

      const settingsData = {
        ...formData,
        logo_url: logoUrl,
        favicon_url: faviconUrl,
        promo_banner_image_url: promoBannerImageUrl,
      };

      if (settings) {
        await updateWebsiteSettings(settings.id, settingsData);
      } else {
        await updateWebsiteSettings('default', settingsData);
      }

      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });

      loadSettings();
      setLogoFile(null);
      setFaviconFile(null);
      setPromoBannerImageFile(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Website Settings</h1>
          <p className="text-muted-foreground">Manage your website configuration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic website information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={formData.site_name}
                    onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                  <Input
                    id="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    placeholder="+91XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={formData.site_description}
                  onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="promotional_banner">Promotional Banner Text</Label>
                <Input
                  id="promotional_banner"
                  value={formData.promotional_banner}
                  onChange={(e) => setFormData({ ...formData, promotional_banner: e.target.value })}
                  placeholder="Post your unused leads and get up to 10% commission on your deals!"
                />
              </div>
            </CardContent>
          </Card>

          {/* Branding */}
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Upload your logo and favicon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Website Logo</Label>
                  {(formData.logo_url || logoFile) && (
                    <div className="mb-2">
                      <img
                        src={logoFile ? URL.createObjectURL(logoFile) : formData.logo_url}
                        alt="Logo preview"
                        className="h-16 object-contain border rounded-lg p-2"
                      />
                    </div>
                  )}
                  <Input type="file" accept="image/png,image/jpeg" onChange={handleLogoSelect} />
                  <p className="text-xs text-muted-foreground">PNG or JPEG, max 1MB</p>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  {(formData.favicon_url || faviconFile) && (
                    <div className="mb-2">
                      <img
                        src={faviconFile ? URL.createObjectURL(faviconFile) : formData.favicon_url}
                        alt="Favicon preview"
                        className="h-16 object-contain border rounded-lg p-2"
                      />
                    </div>
                  )}
                  <Input type="file" accept="image/png,image/x-icon" onChange={handleFaviconSelect} />
                  <p className="text-xs text-muted-foreground">PNG or ICO, 32x32px recommended</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook URL</Label>
                  <Input
                    id="facebook_url"
                    type="url"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram URL</Label>
                  <Input
                    id="instagram_url"
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter_url">Twitter URL</Label>
                  <Input
                    id="twitter_url"
                    type="url"
                    value={formData.twitter_url}
                    onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                    placeholder="https://twitter.com/yourprofile"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Footer Content</CardTitle>
              <CardDescription>Customize your footer text</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer Text</Label>
                <Textarea
                  id="footer_text"
                  value={formData.footer_text}
                  onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                  rows={4}
                  placeholder="India's #1 B2B AI Marketplace. Transform your unused leads into revenue and find verified service providers."
                />
              </div>
            </CardContent>
          </Card>

          {/* Promotional Banner */}
          <Card>
            <CardHeader>
              <CardTitle>Promotional Banner</CardTitle>
              <CardDescription>Manage the promotional banner displayed on homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promo_banner_enabled">Enable Banner</Label>
                  <p className="text-sm text-muted-foreground">Show promotional banner on homepage</p>
                </div>
                <Switch
                  id="promo_banner_enabled"
                  checked={formData.promo_banner_enabled}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, promo_banner_enabled: checked })
                  }
                />
              </div>

              {formData.promo_banner_enabled && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="promo_banner_title">Banner Title</Label>
                    <Input
                      id="promo_banner_title"
                      value={formData.promo_banner_title}
                      onChange={(e) => setFormData({ ...formData, promo_banner_title: e.target.value })}
                      placeholder="Latest Product Launch!"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promo_banner_description">Banner Description</Label>
                    <Textarea
                      id="promo_banner_description"
                      value={formData.promo_banner_description}
                      onChange={(e) => setFormData({ ...formData, promo_banner_description: e.target.value })}
                      placeholder="Check out our newest enterprise solutions with exclusive discounts"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="promo_banner_button_text">Button Text</Label>
                      <Input
                        id="promo_banner_button_text"
                        value={formData.promo_banner_button_text}
                        onChange={(e) => setFormData({ ...formData, promo_banner_button_text: e.target.value })}
                        placeholder="Learn More"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="promo_banner_button_link">Button Link</Label>
                      <Input
                        id="promo_banner_button_link"
                        value={formData.promo_banner_button_link}
                        onChange={(e) => setFormData({ ...formData, promo_banner_button_link: e.target.value })}
                        placeholder="/products"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promo_banner_image">Banner Image</Label>
                    {(formData.promo_banner_image_url || promoBannerImageFile) && (
                      <div className="mb-2">
                        <img
                          src={promoBannerImageFile ? URL.createObjectURL(promoBannerImageFile) : formData.promo_banner_image_url}
                          alt="Promo banner preview"
                          className="w-full h-48 object-cover border rounded-lg"
                        />
                      </div>
                    )}
                    <Input
                      id="promo_banner_image"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handlePromoBannerImageSelect}
                    />
                    <p className="text-xs text-muted-foreground">
                      PNG or JPEG, max 1MB. This image will be displayed on the homepage banner.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promo_banner_bg_color">Background Color</Label>
                    <Select
                      value={formData.promo_banner_bg_color}
                      onValueChange={(value) => setFormData({ ...formData, promo_banner_bg_color: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email_notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                </div>
                <Switch
                  id="email_notifications"
                  checked={formData.notification_settings.email_notifications}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notification_settings: {
                        ...formData.notification_settings,
                        email_notifications: checked,
                      },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="lead_notifications">Lead Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new leads are posted</p>
                </div>
                <Switch
                  id="lead_notifications"
                  checked={formData.notification_settings.lead_notifications}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notification_settings: {
                        ...formData.notification_settings,
                        lead_notifications: checked,
                      },
                    })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="vendor_notifications">Vendor Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify vendors about lead assignments</p>
                </div>
                <Switch
                  id="vendor_notifications"
                  checked={formData.notification_settings.vendor_notifications}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      notification_settings: {
                        ...formData.notification_settings,
                        vendor_notifications: checked,
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={saving || uploading}>
              <Save className="h-4 w-4 mr-2" />
              {saving || uploading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
