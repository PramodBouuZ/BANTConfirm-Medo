import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAdminStats } from '@/db/api';
import { FileText, Users, Package, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalLeads: 0, totalVendors: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then(setStats).finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Vendors</CardTitle>
              <Package className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalVendors}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered vendors</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Active users</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <TrendingUp className="h-5 w-5 text-info" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{(stats.totalLeads * 86.193).toFixed(0)}</div>
              <p className="text-xs text-success mt-1">↑ 23% this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="/admin/leads"
                  className="p-6 border border-border rounded-xl hover:bg-muted transition-colors text-center"
                >
                  <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold mb-1">Manage Leads</h3>
                  <p className="text-sm text-muted-foreground">View and assign leads to vendors</p>
                </a>
                <a
                  href="/admin/vendors"
                  className="p-6 border border-border rounded-xl hover:bg-muted transition-colors text-center"
                >
                  <Package className="h-8 w-8 mx-auto mb-2 text-secondary" />
                  <h3 className="font-semibold mb-1">Manage Vendors</h3>
                  <p className="text-sm text-muted-foreground">Approve and manage vendor accounts</p>
                </a>
                <a
                  href="/admin/products"
                  className="p-6 border border-border rounded-xl hover:bg-muted transition-colors text-center"
                >
                  <Package className="h-8 w-8 mx-auto mb-2 text-success" />
                  <h3 className="font-semibold mb-1">Manage Products</h3>
                  <p className="text-sm text-muted-foreground">Add and edit marketplace products</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
