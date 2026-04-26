import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { MarqueeText } from '@/components/ui/MarqueeText';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts, getVendors, getWebsiteSettings, getAdminStats } from '@/db/api';
import type { Product, Vendor, WebsiteSettings } from '@/types/types';
import { Zap, Shield, Package, Headphones, TrendingUp, Users, FileText, Sparkles, Rocket, Target, BarChart3, Building2, Award, CheckCircle, Star, ArrowRight, Search } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [stats, setStats] = useState({ totalLeads: 0, totalVendors: 0, totalUsers: 0 });

  useEffect(() => {
    Promise.all([
      getProducts().then((data) => setProducts(data.slice(0, 4))),
      getVendors('approved').then(setVendors),
      getWebsiteSettings().then(setSettings),
      getAdminStats().then(setStats),
    ]);
  }, []);

  const chartData = [
    { month: 'Jan', value: 186 },
    { month: 'Feb', value: 305 },
    { month: 'Mar', value: 237 },
    { month: 'Apr', value: 273 },
    { month: 'May', value: 409 },
    { month: 'Jun', value: 514 },
  ];

  const chartConfig = {
    value: {
      label: 'Requirements',
      color: 'hsl(var(--chart-1))',
    },
  };

  return (
    <div className="min-h-screen">
      {/* Promotional Banner */}
      {settings?.promotional_banner && (
        <div className="bg-primary text-primary-foreground py-3 text-center">
          <MarqueeText>
            <p className="text-sm font-medium px-8">
              💰 {settings.promotional_banner}
            </p>
          </MarqueeText>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-20 xl:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 animate-bounce">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-medium border border-yellow-500/30">
                <Sparkles className="h-4 w-4" />
                Empowering Indian Businesses
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
            <div className="mb-8">
              <h1 className="text-4xl xl:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                The Premier IT Marketplace for{' '}
                <span className="block mt-2">MSMEs & Enterprises</span>
              </h1>
            </div>
            <p className="text-lg xl:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover, Compare, and Buy Enterprise-grade IT, Software, and Telecom solutions. We connect Indian MSMEs with verified top-tier vendors using AI-driven BANT matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 shadow-lg shadow-blue-500/50">
                  <Search className="mr-2 h-5 w-5" />
                  Find IT Solutions
                </Button>
              </Link>
              <Link to="/post-requirement">
                <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950">
                  <Rocket className="mr-2 h-5 w-5" />
                  Post Business Requirement
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-2 text-sm bg-blue-50 dark:bg-blue-950/30 px-4 py-2 rounded-full">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="text-blue-700 dark:text-blue-400 font-medium">Optimized for MSMEs</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-full">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-green-700 dark:text-green-400 font-medium">Enterprise-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-purple-50 dark:bg-purple-950/30 px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span className="text-purple-700 dark:text-purple-400 font-medium">GST Compliant Billing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Growth Dashboard */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold">Your Business Growth Dashboard</h2>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-950/30 px-4 py-2 rounded-full">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-green-700 dark:text-green-400 font-medium">Live Market Data</span>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <GlassCard className="bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-red-500/10 border-2 border-yellow-500/20 hover:border-yellow-500/40 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
                  <Building2 className="h-6 w-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-semibold">
                  VERIFIED
                </div>
              </div>
              <div className="mb-2 text-sm font-semibold text-muted-foreground">VERIFIED VENDORS</div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{stats.totalVendors}+</div>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <Award className="h-4 w-4" />
                PAN India Coverage
              </div>
            </GlassCard>
            <GlassCard className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 border-2 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold">
                  ↑ 23%
                </div>
              </div>
              <div className="mb-2 text-sm font-semibold text-muted-foreground">DEALS CLOSED</div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">₹{(stats.totalLeads * 86.193).toFixed(0)}</div>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium">
                <Rocket className="h-4 w-4" />
                Growth this month
              </div>
            </GlassCard>
          </div>
          <GlassCard className="mt-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border-2 border-purple-500/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-muted-foreground">SOFTWARE PROCUREMENT TRENDS</div>
                <div className="text-xs text-muted-foreground">Last 24h</div>
              </div>
            </div>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  fill="url(#fillValue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </GlassCard>
        </div>
      </section>

      {/* Vendor Logos Marquee */}
      {vendors.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground mb-8">OUR TRUSTED MARKETPLACE PARTNERS</p>
            <MarqueeText speed="slow">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="mx-8 flex items-center justify-center">
                  {vendor.logo_url ? (
                    <img
                      src={vendor.logo_url}
                      alt={vendor.company_name}
                      className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <div className="h-12 px-6 flex items-center justify-center bg-muted rounded-xl">
                      <span className="text-sm font-semibold text-muted-foreground">{vendor.company_name}</span>
                    </div>
                  )}
                </div>
              ))}
            </MarqueeText>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore IT & Telecom Solutions</h2>
              <p className="text-muted-foreground">Curated services for the Indian business ecosystem</p>
            </div>
            <Link to="/products">
              <Button variant="outline">View All →</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why BantConfirm Section */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/30 mb-4">
              <Star className="h-4 w-4" />
              WHY CHOOSE US
              <Star className="h-4 w-4" />
            </span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Built for Indian Business Needs</h2>
            <p className="text-muted-foreground mt-2">
              We understand the unique challenges of MSMEs and Enterprises in India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <GlassCard className="text-center hover:shadow-xl hover:shadow-blue-500/10 transition-all border-2 border-blue-500/10 hover:border-blue-500/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast-Track Procurement</h3>
              <p className="text-sm text-muted-foreground">
                Reduce your IT procurement cycle from months to days with our pre-verified vendor network.
              </p>
              <Link to="/about" className="mt-4 inline-flex items-center text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </GlassCard>
            <GlassCard className="text-center hover:shadow-xl hover:shadow-green-500/10 transition-all border-2 border-green-500/10 hover:border-green-500/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">
                Compare quotes transparently. No hidden fees. Best market rates guaranteed for MSMEs.
              </p>
              <Link to="/about" className="mt-4 inline-flex items-center text-xs text-green-600 dark:text-green-400 font-semibold hover:underline">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </GlassCard>
            <GlassCard className="text-center hover:shadow-xl hover:shadow-purple-500/10 transition-all border-2 border-purple-500/10 hover:border-purple-500/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sellers Only</h3>
              <p className="text-sm text-muted-foreground">
                All vendors on BantConfirm are subjected to rigorous BANT and KYC verification processes.
              </p>
              <Link to="/about" className="mt-4 inline-flex items-center text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </GlassCard>
            <GlassCard className="text-center hover:shadow-xl hover:shadow-orange-500/10 transition-all border-2 border-orange-500/10 hover:border-orange-500/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/50">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
              <p className="text-sm text-muted-foreground">
                Local support team based in Bangalore to assist with your specific enterprise requirements.
              </p>
              <Link to="/contact" className="mt-4 inline-flex items-center text-xs text-orange-600 dark:text-orange-400 font-semibold hover:underline">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      {settings?.promo_banner_enabled && settings.promo_banner_title && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <GlassCard className={`overflow-hidden border-2 ${
              settings.promo_banner_bg_color === 'blue' ? 'border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10' :
              settings.promo_banner_bg_color === 'purple' ? 'border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10' :
              settings.promo_banner_bg_color === 'green' ? 'border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/10' :
              settings.promo_banner_bg_color === 'orange' ? 'border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10' :
              settings.promo_banner_bg_color === 'pink' ? 'border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-rose-500/10' :
              settings.promo_banner_bg_color === 'yellow' ? 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-amber-500/10' :
              'border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
            }`}>
              {settings.promo_banner_image_url && (
                <div className="relative w-full h-64 xl:h-80">
                  <img
                    src={settings.promo_banner_image_url}
                    alt={settings.promo_banner_title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                </div>
              )}
              <div className="p-8 xl:p-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className={`h-6 w-6 ${
                    settings.promo_banner_bg_color === 'blue' ? 'text-blue-600' :
                    settings.promo_banner_bg_color === 'purple' ? 'text-purple-600' :
                    settings.promo_banner_bg_color === 'green' ? 'text-green-600' :
                    settings.promo_banner_bg_color === 'orange' ? 'text-orange-600' :
                    settings.promo_banner_bg_color === 'pink' ? 'text-pink-600' :
                    settings.promo_banner_bg_color === 'yellow' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                  <span className={`text-sm font-semibold uppercase tracking-wider ${
                    settings.promo_banner_bg_color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    settings.promo_banner_bg_color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                    settings.promo_banner_bg_color === 'green' ? 'text-green-600 dark:text-green-400' :
                    settings.promo_banner_bg_color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                    settings.promo_banner_bg_color === 'pink' ? 'text-pink-600 dark:text-pink-400' :
                    settings.promo_banner_bg_color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-blue-600 dark:text-blue-400'
                  }`}>
                    Latest Update
                  </span>
                  <Sparkles className={`h-6 w-6 ${
                    settings.promo_banner_bg_color === 'blue' ? 'text-blue-600' :
                    settings.promo_banner_bg_color === 'purple' ? 'text-purple-600' :
                    settings.promo_banner_bg_color === 'green' ? 'text-green-600' :
                    settings.promo_banner_bg_color === 'orange' ? 'text-orange-600' :
                    settings.promo_banner_bg_color === 'pink' ? 'text-pink-600' :
                    settings.promo_banner_bg_color === 'yellow' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <h2 className="text-3xl xl:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {settings.promo_banner_title}
                </h2>
                {settings.promo_banner_description && (
                  <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                    {settings.promo_banner_description}
                  </p>
                )}
                {settings.promo_banner_button_text && settings.promo_banner_button_link && (
                  <Link to={settings.promo_banner_button_link}>
                    <Button size="lg" className={`${
                      settings.promo_banner_bg_color === 'blue' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' :
                      settings.promo_banner_bg_color === 'purple' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                      settings.promo_banner_bg_color === 'green' ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' :
                      settings.promo_banner_bg_color === 'orange' ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700' :
                      settings.promo_banner_bg_color === 'pink' ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700' :
                      settings.promo_banner_bg_color === 'yellow' ? 'bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700' :
                      'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                    } text-white shadow-xl`}>
                      {settings.promo_banner_button_text}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </GlassCard>
          </div>
        </section>
      )}

      {/* Success Stories */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 text-sm font-medium border border-green-500/30 mb-4">
              <Award className="h-4 w-4" />
              SUCCESS STORIES
              <Award className="h-4 w-4" />
            </span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Loved by Indian Businesses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'BantConfirm transformed how we handle excess leads. We\'ve earned over ₹35 Lakhs in commissions in just 6 months. Best platform for Indian B2B.',
                author: 'Rajesh Kumar',
                role: 'CEO, TechStart Solutions',
                earned: '₹35L earned',
                color: 'blue',
              },
              {
                quote: 'I was skeptical at first, but the platform exceeded all expectations. The AI matching is spot-on for the domestic market.',
                author: 'Priya Mehta',
                role: 'Founder, Digital Marketing Pro',
                earned: '₹24L earned',
                color: 'purple',
              },
              {
                quote: 'The real-time analytics and instant UPI payments make this platform a game-changer. We\'ve integrated it into our standard workflow.',
                author: 'Amit Singh',
                role: 'Director, Growth Ventures',
                earned: '₹45L earned',
                color: 'green',
              },
            ].map((testimonial, index) => (
              <GlassCard key={index} className={`border-2 border-${testimonial.color}-500/20 hover:border-${testimonial.color}-500/40 transition-all hover:shadow-xl hover:shadow-${testimonial.color}-500/10`}>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-500/30">
                    {testimonial.earned}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
            <Rocket className="h-4 w-4" />
            Get Started Today
          </div>
          <h2 className="text-3xl xl:text-5xl font-bold mb-4">Ready to Upgrade Your Business IT?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Indian businesses already saving time and money on IT procurement. Start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 shadow-xl">
                <Search className="mr-2 h-5 w-5" />
                Browse Marketplace
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 text-lg px-8 shadow-xl font-semibold">
                <Users className="mr-2 h-5 w-5" />
                Talk to Sales
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="h-5 w-5" />
              <span>Verified Vendors</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Target className="h-5 w-5" />
              <span>BANT Qualified Leads</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp className="h-5 w-5" />
              <span>Instant Quotes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">TOP CITIES IN INDIA</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Software Company in Delhi</li>
                <li>IT Services in Mumbai</li>
                <li>Cloud Telephony in Bangalore</li>
                <li>CRM Vendors in Noida</li>
                <li>Leased Line in Gurgaon</li>
                <li>Web Development in Hyderabad</li>
                <li>Digital Marketing in Pune</li>
                <li>IT Support in Chennai</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">POPULAR SEARCHES</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Zoho CRM Price India</li>
                <li>Tata Leased Line Plans</li>
                <li>Salesforce Implementation Partner</li>
                <li>IVR Service Provider Near Me</li>
                <li>Airtel Business Internet</li>
                <li>Custom Software Developer</li>
                <li>Toll Free Number India</li>
                <li>Cloud Hosting Providers India</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">IT SERVICES NEAR ME</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Software Company Near Me</li>
                <li>Computer Networking Services Nearby</li>
                <li>Cybersecurity Consultants Nearby</li>
                <li>Bulk SMS Service Provider</li>
                <li>App Development Agency</li>
                <li>Cloud Hosting Providers India</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About BantConfirm */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="font-semibold mb-4">ABOUT BANTCONFIRM</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            BantConfirm is India's premier B2B AI marketplace platform designed specifically for Software, IT Hardware, Telecom, Cloud & Enterprise Services. We help MSMEs and Enterprises find verified vendors using our proprietary BANT methodology (Budget, Authority, Need, Timing). Whether you need a CRM in Delhi, a Leased Line in Mumbai, or Cloud Telephony in Bangalore, we connect you with the best providers near you. Our platform supports the Indian business ecosystem with transparent pricing, GST-compliant billing, and local support teams. Transform your unused leads into revenue and find verified service providers all in one place.
          </p>
        </div>
      </section>
    </div>
  );
}
