import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { getVendors, getAllProfiles, createVendor, updateVendor, getLeads } from '@/db/api';
import type { Vendor, Profile } from '@/types/types';
import { Plus, Edit, Eye } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { uploadFileToSupabase } from '@/lib/upload';

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [viewLeadsVendor, setViewLeadsVendor] = useState<Vendor | null>(null);
  const [vendorLeads, setVendorLeads] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    profile_id: '',
    company_name: '',
    description: '',
    website_url: '',
    contact_email: '',
    contact_phone: '',
    status: 'pending' as 'pending' | 'approved' | 'rejected',
    is_active: true,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [existingLogo, setExistingLogo] = useState<string | null>(null);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [vendorsData, profilesData] = await Promise.all([
        getVendors(),
        getAllProfiles(),
      ]);
      setVendors(vendorsData);
      setProfiles(profilesData.filter((p) => p.role === 'vendor' || p.role === 'user'));
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (vendor?: Vendor) => {
    if (vendor) {
      setEditingVendor(vendor);
      setFormData({
        profile_id: vendor.profile_id,
        company_name: vendor.company_name,
        description: vendor.description || '',
        website_url: vendor.website_url || '',
        contact_email: vendor.contact_email || '',
        contact_phone: vendor.contact_phone || '',
        status: vendor.status,
        is_active: vendor.is_active,
      });
      setExistingLogo(vendor.logo_url);
    } else {
      setEditingVendor(null);
      setFormData({
        profile_id: '',
        company_name: '',
        description: '',
        website_url: '',
        contact_email: '',
        contact_phone: '',
        status: 'pending',
        is_active: true,
      });
      setExistingLogo(null);
    }
    setLogoFile(null);
    setDialogOpen(true);
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company_name || !formData.profile_id) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      let logoUrl = existingLogo;

      if (logoFile) {
        setUploading(true);
        const uploadedUrl = await uploadFileToSupabase(logoFile, 'app-8n1wxpg9ygap_images');
        setUploading(false);
        if (uploadedUrl) logoUrl = uploadedUrl;
      }

      const vendorData = {
        ...formData,
        logo_url: logoUrl,
      };

      if (editingVendor) {
        await updateVendor(editingVendor.id, vendorData);
        toast({
          title: 'Success',
          description: 'Vendor updated successfully',
        });
      } else {
        await createVendor(vendorData as any);
        toast({
          title: 'Success',
          description: 'Vendor created successfully',
        });
      }

      setDialogOpen(false);
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save vendor',
        variant: 'destructive',
      });
    }
  };

  const handleViewLeads = async (vendor: Vendor) => {
    setViewLeadsVendor(vendor);
    try {
      const leads = await getLeads({ vendor_id: vendor.id });
      setVendorLeads(leads);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load leads',
        variant: 'destructive',
      });
    }
  };

  const handleToggleActive = async (vendor: Vendor) => {
    try {
      await updateVendor(vendor.id, { is_active: !vendor.is_active });
      toast({
        title: 'Success',
        description: 'Vendor status updated',
      });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-warning/10 text-warning',
      approved: 'bg-success/10 text-success',
      rejected: 'bg-destructive/10 text-destructive',
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Vendor Management</h1>
            <p className="text-muted-foreground">Manage vendor accounts and approvals</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingVendor ? 'Edit Vendor' : 'Add New Vendor'}</DialogTitle>
                <DialogDescription>
                  {editingVendor ? 'Update vendor information' : 'Create a new vendor account'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile">User Profile *</Label>
                  <Select
                    value={formData.profile_id}
                    onValueChange={(value) => setFormData({ ...formData, profile_id: value })}
                    disabled={!!editingVendor}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user profile" />
                    </SelectTrigger>
                    <SelectContent>
                      {profiles.map((profile) => (
                        <SelectItem key={profile.id} value={profile.id}>
                          {profile.full_name || profile.email || profile.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website_url">Website URL</Label>
                    <Input
                      id="website_url"
                      type="url"
                      value={formData.website_url}
                      onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    type="tel"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Vendor Logo</Label>
                  {(existingLogo || logoFile) && (
                    <div className="mb-2">
                      <img
                        src={logoFile ? URL.createObjectURL(logoFile) : existingLogo!}
                        alt="Logo preview"
                        className="w-32 h-32 object-contain border rounded-lg"
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleLogoSelect}
                  />
                  <p className="text-xs text-muted-foreground">
                    Allowed formats: PNG, JPEG. Max size: 1MB.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="active">Vendor Active</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : editingVendor ? 'Update Vendor' : 'Create Vendor'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full bg-muted" />
                ))}
              </div>
            ) : vendors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No vendors yet</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {vendor.logo_url && (
                            <img
                              src={vendor.logo_url}
                              alt={vendor.company_name}
                              className="w-12 h-12 object-contain rounded-lg"
                            />
                          )}
                          <div>
                            <div className="font-medium">{vendor.company_name}</div>
                            {vendor.website_url && (
                              <a
                                href={vendor.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline"
                              >
                                {vendor.website_url}
                              </a>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {vendor.contact_email && <div>{vendor.contact_email}</div>}
                          {vendor.contact_phone && <div>{vendor.contact_phone}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={vendor.is_active}
                          onCheckedChange={() => handleToggleActive(vendor)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(vendor)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleViewLeads(vendor)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>Assigned Leads - {viewLeadsVendor?.company_name}</DialogTitle>
                                <DialogDescription>
                                  View all leads assigned to this vendor
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                                {vendorLeads.length === 0 ? (
                                  <p className="text-center text-muted-foreground py-8">No leads assigned yet</p>
                                ) : (
                                  vendorLeads.map((lead) => (
                                    <div key={lead.id} className="border rounded-lg p-4">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <div className="font-medium">{lead.contact_name}</div>
                                          <div className="text-sm text-muted-foreground">{lead.company_name}</div>
                                          <div className="text-sm mt-1">{lead.requirement_details}</div>
                                        </div>
                                        <Badge className={getStatusColor(lead.status)}>
                                          {lead.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
