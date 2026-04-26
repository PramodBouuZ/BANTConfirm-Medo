import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { createLead } from '@/db/api';
import { supabase } from '@/db/supabase';

export default function PostRequirementPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    location: '',
    category: '',
    requirement_details: '',
    budget: '',
    authority: '',
    need: '',
    timing: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!user) {
      setError('Please login to post a requirement');
      setLoading(false);
      navigate('/login', { state: { from: '/post-requirement' } });
      return;
    }

    if (!formData.company_name || !formData.contact_name || !formData.email || !formData.phone || !formData.requirement_details) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      // Call Gemini AI for BANT qualification
      const { data: bantData, error: bantError } = await supabase.functions.invoke('gemini-bant-qualification', {
        body: {
          requirement_details: formData.requirement_details,
          budget: formData.budget,
          authority: formData.authority,
          need: formData.need,
          timing: formData.timing,
        },
      });

      if (bantError) {
        console.error('BANT qualification error:', bantError);
      }

      const bantScore = bantData?.bant_score || 50;
      const analysis = bantData?.analysis || {};

      // Create lead
      await createLead({
        user_id: user.id,
        company_name: formData.company_name,
        contact_name: formData.contact_name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city || null,
        state: formData.state || null,
        location: formData.location || null,
        category: formData.category || null,
        requirement_details: formData.requirement_details,
        budget: formData.budget || analysis.budget || null,
        authority: formData.authority || analysis.authority || null,
        need: formData.need || analysis.need || null,
        timing: formData.timing || analysis.timing || null,
        bant_score: bantScore,
        status: 'new',
        assigned_vendor_id: null,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit requirement');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-3xl">Post Your Business Requirement</CardTitle>
            <CardDescription>
              Our AI will analyze your requirement using BANT methodology and connect you with verified vendors
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="bg-success/10 text-success border-success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Requirement submitted successfully! Redirecting to dashboard...</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name *</Label>
                  <Input
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_name">Contact Name *</Label>
                  <Input
                    id="contact_name"
                    name="contact_name"
                    value={formData.contact_name}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl"
                    placeholder="e.g., Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={loading}
                    className="rounded-xl"
                    placeholder="e.g., Maharashtra"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={loading}
                    className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select category</option>
                    <option value="software">Software</option>
                    <option value="telecom">Telecom</option>
                    <option value="it_hardware">IT Hardware</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirement_details">Requirement Details *</Label>
                <Textarea
                  id="requirement_details"
                  name="requirement_details"
                  value={formData.requirement_details}
                  onChange={handleChange}
                  disabled={loading}
                  className="rounded-xl min-h-[150px]"
                  placeholder="Describe your IT/Software/Telecom requirement in detail..."
                  required
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold mb-4">BANT Qualification (Optional)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help us better understand your requirement. Our AI will analyze this information to match you with the best vendors.
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget</Label>
                    <Input
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      disabled={loading}
                      className="rounded-xl"
                      placeholder="e.g., ₹50,000 - ₹1,00,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authority">Decision Authority</Label>
                    <Input
                      id="authority"
                      name="authority"
                      value={formData.authority}
                      onChange={handleChange}
                      disabled={loading}
                      className="rounded-xl"
                      placeholder="e.g., I am the decision maker / Need approval from management"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="need">Business Need</Label>
                    <Input
                      id="need"
                      name="need"
                      value={formData.need}
                      onChange={handleChange}
                      disabled={loading}
                      className="rounded-xl"
                      placeholder="e.g., Improve customer management / Reduce operational costs"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timing">Timeline</Label>
                    <Input
                      id="timing"
                      name="timing"
                      value={formData.timing}
                      onChange={handleChange}
                      disabled={loading}
                      className="rounded-xl"
                      placeholder="e.g., Within 1 month / Urgent / Exploring options"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading || success}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing with AI...
                  </>
                ) : (
                  'Submit Requirement'
                )}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
