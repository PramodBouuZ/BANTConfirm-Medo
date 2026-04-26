import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLeads } from '@/db/api';
import type { Lead } from '@/types/types';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getLeads({ user_id: user.id }).then(setLeads).finally(() => setLoading(false));
    }
  }, [user]);

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

  const getStatusIcon = (status: string) => {
    if (status === 'won') return <CheckCircle className="h-4 w-4" />;
    if (status === 'lost') return <XCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {profile?.full_name || 'User'}!</h1>
          <p className="text-muted-foreground">Track your posted requirements and vendor responses</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{leads.length}</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {leads.filter((l) => !['won', 'lost'].includes(l.status)).length}
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Won</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {leads.filter((l) => l.status === 'won').length}
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Lost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">
                {leads.filter((l) => l.status === 'lost').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Your Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-3/4 bg-muted" />
                    <Skeleton className="h-4 w-full bg-muted" />
                    <Skeleton className="h-4 w-1/2 bg-muted" />
                  </div>
                ))}
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No requirements posted yet</p>
                <p className="text-sm text-muted-foreground">Post your first requirement to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="border border-border rounded-xl p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{lead.company_name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {lead.requirement_details}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(lead.status)} ml-4 shrink-0`}>
                        {getStatusIcon(lead.status)}
                        <span className="ml-1">{lead.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {lead.bant_score && (
                        <div>
                          <span className="font-medium">BANT Score:</span> {lead.bant_score}/100
                        </div>
                      )}
                      {lead.assigned_vendor && (
                        <div>
                          <span className="font-medium">Assigned to:</span> {lead.assigned_vendor.company_name}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Posted:</span> {new Date(lead.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
