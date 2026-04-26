import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getLeads, getVendors, updateLead, createLeadRemark, getLeadRemarks, getLeadHistory } from '@/db/api';
import type { Lead, Vendor } from '@/types/types';
import { Download, Eye, Filter, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [remarks, setRemarks] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [newRemark, setNewRemark] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchTerm, statusFilter, categoryFilter]);

  const loadData = async () => {
    try {
      const [leadsData, vendorsData] = await Promise.all([
        getLeads(),
        getVendors('approved'),
      ]);
      setLeads(leadsData);
      setVendors(vendorsData);
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

  const filterLeads = () => {
    let filtered = [...leads];

    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.category === categoryFilter);
    }

    setFilteredLeads(filtered);
  };

  const handleViewLead = async (lead: Lead) => {
    setSelectedLead(lead);
    try {
      const [remarksData, historyData] = await Promise.all([
        getLeadRemarks(lead.id),
        getLeadHistory(lead.id),
      ]);
      setRemarks(remarksData);
      setHistory(historyData);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load lead details',
        variant: 'destructive',
      });
    }
  };

  const handleAssignVendor = async (leadId: string, vendorId: string) => {
    try {
      await updateLead(leadId, { assigned_vendor_id: vendorId || null });
      toast({
        title: 'Success',
        description: 'Vendor assigned successfully',
      });
      loadData();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to assign vendor',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateStatus = async (leadId: string, status: string) => {
    try {
      await updateLead(leadId, { status: status as any });
      toast({
        title: 'Success',
        description: 'Status updated successfully',
      });
      loadData();
      if (selectedLead?.id === leadId) {
        const updatedLead = leads.find((l) => l.id === leadId);
        if (updatedLead) {
          setSelectedLead({ ...updatedLead, status: status as any });
        }
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const handleAddRemark = async () => {
    if (!selectedLead || !newRemark.trim()) return;

    try {
      await createLeadRemark({
        lead_id: selectedLead.id,
        user_id: selectedLead.user_id,
        remark: newRemark,
      });
      setNewRemark('');
      const remarksData = await getLeadRemarks(selectedLead.id);
      setRemarks(remarksData);
      toast({
        title: 'Success',
        description: 'Remark added successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add remark',
        variant: 'destructive',
      });
    }
  };

  const handleExportToExcel = () => {
    const exportData = filteredLeads.map((lead) => ({
      'Lead ID': lead.id,
      'Full Name': lead.contact_name,
      'Mobile': lead.phone,
      'Email': lead.email,
      'Company': lead.company_name,
      'City': lead.city || '',
      'State': lead.state || '',
      'Location': lead.location || '',
      'Category': lead.category || '',
      'Requirement': lead.requirement_details,
      'Budget': lead.budget || '',
      'Authority': lead.authority || '',
      'Need': lead.need || '',
      'Timing': lead.timing || '',
      'BANT Score': lead.bant_score || '',
      'Status': lead.status,
      'Assigned Vendor': lead.assigned_vendor?.company_name || 'Not Assigned',
      'Created Date': new Date(lead.created_at).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, `BantConfirm_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);

    toast({
      title: 'Success',
      description: 'Leads exported to Excel successfully',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-primary/10 text-primary',
      assigned: 'bg-info/10 text-info',
      contacted: 'bg-warning/10 text-warning',
      qualified: 'bg-success/10 text-success',
      proposal_sent: 'bg-secondary/10 text-secondary',
      negotiation: 'bg-warning/10 text-warning',
      won: 'bg-success/10 text-success',
      lost: 'bg-destructive/10 text-destructive',
    };
    return colors[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Leads Hub</h1>
            <p className="text-muted-foreground">Manage all business requirements and leads</p>
          </div>
          <Button onClick={handleExportToExcel} disabled={filteredLeads.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {leads.filter((l) => l.status === 'new').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-info">
                {leads.filter((l) => l.assigned_vendor_id).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Won</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {leads.filter((l) => l.status === 'won').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="won">Won</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="telecom">Telecom</SelectItem>
                  <SelectItem value="it_hardware">IT Hardware</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => { setSearchTerm(''); setStatusFilter('all'); setCategoryFilter('all'); }}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardContent className="pt-6">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full bg-muted" />
                ))}
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No leads found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>BANT Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{lead.contact_name}</div>
                            <div className="text-sm text-muted-foreground">{lead.phone}</div>
                            <div className="text-sm text-muted-foreground">{lead.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{lead.company_name}</TableCell>
                        <TableCell>
                          {lead.city && lead.state ? `${lead.city}, ${lead.state}` : lead.location || '-'}
                        </TableCell>
                        <TableCell>{lead.category || '-'}</TableCell>
                        <TableCell>
                          {lead.bant_score ? (
                            <Badge variant="outline">{lead.bant_score}/100</Badge>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={lead.assigned_vendor_id || 'none'}
                            onValueChange={(value) => handleAssignVendor(lead.id, value === 'none' ? '' : value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Assign vendor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Not Assigned</SelectItem>
                              {vendors.map((vendor) => (
                                <SelectItem key={vendor.id} value={vendor.id}>
                                  {vendor.company_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => handleViewLead(lead)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Lead Details</DialogTitle>
                                <DialogDescription>
                                  Complete information about this lead
                                </DialogDescription>
                              </DialogHeader>
                              {selectedLead && (
                                <div className="space-y-6">
                                  {/* User Details */}
                                  <div>
                                    <h3 className="font-semibold mb-3">User Details</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Full Name</Label>
                                        <p className="text-sm">{selectedLead.contact_name}</p>
                                      </div>
                                      <div>
                                        <Label>Mobile Number</Label>
                                        <p className="text-sm">{selectedLead.phone}</p>
                                      </div>
                                      <div>
                                        <Label>Email Address</Label>
                                        <p className="text-sm">{selectedLead.email}</p>
                                      </div>
                                      <div>
                                        <Label>Company Name</Label>
                                        <p className="text-sm">{selectedLead.company_name}</p>
                                      </div>
                                      <div>
                                        <Label>Location</Label>
                                        <p className="text-sm">
                                          {selectedLead.city && selectedLead.state
                                            ? `${selectedLead.city}, ${selectedLead.state}`
                                            : selectedLead.location || 'Not specified'}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Requirement Details */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Requirement Details</h3>
                                    <div className="space-y-3">
                                      <div>
                                        <Label>Exact Requirement</Label>
                                        <p className="text-sm whitespace-pre-wrap">{selectedLead.requirement_details}</p>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>Category</Label>
                                          <p className="text-sm">{selectedLead.category || 'Not specified'}</p>
                                        </div>
                                        <div>
                                          <Label>BANT Score</Label>
                                          <p className="text-sm">{selectedLead.bant_score || 'Not calculated'}/100</p>
                                        </div>
                                        <div>
                                          <Label>Budget</Label>
                                          <p className="text-sm">{selectedLead.budget || 'Not specified'}</p>
                                        </div>
                                        <div>
                                          <Label>Authority</Label>
                                          <p className="text-sm">{selectedLead.authority || 'Not specified'}</p>
                                        </div>
                                        <div>
                                          <Label>Need</Label>
                                          <p className="text-sm">{selectedLead.need || 'Not specified'}</p>
                                        </div>
                                        <div>
                                          <Label>Timing</Label>
                                          <p className="text-sm">{selectedLead.timing || 'Not specified'}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Lead Actions */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Lead Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Update Status</Label>
                                        <Select
                                          value={selectedLead.status}
                                          onValueChange={(value) => handleUpdateStatus(selectedLead.id, value)}
                                        >
                                          <SelectTrigger>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="new">New</SelectItem>
                                            <SelectItem value="assigned">Assigned</SelectItem>
                                            <SelectItem value="contacted">Contacted</SelectItem>
                                            <SelectItem value="qualified">Qualified</SelectItem>
                                            <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                                            <SelectItem value="negotiation">Negotiation</SelectItem>
                                            <SelectItem value="won">Won</SelectItem>
                                            <SelectItem value="lost">Lost</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label>Assign Vendor</Label>
                                        <Select
                                          value={selectedLead.assigned_vendor_id || 'none'}
                                          onValueChange={(value) =>
                                            handleAssignVendor(selectedLead.id, value === 'none' ? '' : value)
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select vendor" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="none">Not Assigned</SelectItem>
                                            {vendors.map((vendor) => (
                                              <SelectItem key={vendor.id} value={vendor.id}>
                                                {vendor.company_name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Admin Remarks */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Admin Remarks</h3>
                                    <div className="space-y-3">
                                      <div className="flex gap-2">
                                        <Textarea
                                          placeholder="Add internal remark..."
                                          value={newRemark}
                                          onChange={(e) => setNewRemark(e.target.value)}
                                          className="flex-1"
                                        />
                                        <Button onClick={handleAddRemark}>Add</Button>
                                      </div>
                                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                        {remarks.map((remark) => (
                                          <div key={remark.id} className="border rounded-lg p-3">
                                            <p className="text-sm">{remark.remark}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                              {new Date(remark.created_at).toLocaleString()}
                                            </p>
                                          </div>
                                        ))}
                                        {remarks.length === 0 && (
                                          <p className="text-sm text-muted-foreground">No remarks yet</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Lead History */}
                                  <div>
                                    <h3 className="font-semibold mb-3">Lead History</h3>
                                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                                      {history.map((item) => (
                                        <div key={item.id} className="border-l-2 border-primary pl-3 py-2">
                                          <p className="text-sm font-medium">
                                            {item.action.replace('_', ' ').toUpperCase()}
                                          </p>
                                          {item.old_value && item.new_value && (
                                            <p className="text-xs text-muted-foreground">
                                              Changed from "{item.old_value}" to "{item.new_value}"
                                            </p>
                                          )}
                                          <p className="text-xs text-muted-foreground">
                                            {new Date(item.created_at).toLocaleString()}
                                          </p>
                                        </div>
                                      ))}
                                      {history.length === 0 && (
                                        <p className="text-sm text-muted-foreground">No history yet</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
