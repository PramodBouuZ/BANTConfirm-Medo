import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/db/api';
import type { Product } from '@/types/types';
import { INDIAN_CITIES, SERVICE_CATEGORIES } from '@/data/seo-data';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { MapPin, Phone, Mail, ArrowRight, Building2, Briefcase, CheckCircle } from 'lucide-react';

export default function CityServicesPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const city = INDIAN_CITIES.find((c) => c.slug === citySlug);

  useEffect(() => {
    if (city) {
      getProducts().then((data) => {
        setProducts(data.slice(0, 6));
        setLoading(false);
      });
    }
  }, [city]);

  if (!city) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
        <p className="text-muted-foreground mb-8">The city you're looking for doesn't exist.</p>
        <Link to="/services">
          <Button>View All Services</Button>
        </Link>
      </div>
    );
  }

  const seoTitle = `B2B IT Services in ${city.name} | Software, Telecom, Cloud Solutions`;
  const seoDescription = `Find verified B2B IT service providers in ${city.name}, ${city.state}. Get ERP, CRM, Cloud Telephony, WhatsApp API, SIP Trunk, Internet Leased Line, and more enterprise solutions with AI-powered BANT matching.`;
  const seoKeywords = `B2B services ${city.name}, IT services ${city.name}, software company ${city.name}, telecom services ${city.name}, cloud services ${city.name}, ERP ${city.name}, CRM ${city.name}, enterprise solutions ${city.name}`;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: city.name, url: `/services/${city.slug}` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(city.name, city.state),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`/services/${city.slug}`}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  {city.state}
                </span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                B2B IT Services in {city.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with verified vendors for Software, IT Hardware, Telecom, Cloud & Enterprise Services in {city.name}, {city.state}. 
                Get AI-qualified leads and transparent pricing from India's #1 B2B marketplace.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/post-requirement">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Post Your Requirement
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button size="lg" variant="outline">
                    Browse Solutions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Available */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Services Available in {city.name}</h2>
              <p className="text-muted-foreground">
                Explore our comprehensive range of B2B IT solutions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((service) => (
                <GlassCard key={service.slug} className="p-6 hover:shadow-xl transition-all border-2 border-blue-500/10 hover:border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Professional {service.name} services in {city.name}
                      </p>
                      <Link to={`/products?category=${service.slug}`}>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          View Solutions <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {products.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Popular Solutions in {city.name}</h2>
                <p className="text-muted-foreground">
                  Trusted by businesses across {city.state}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/products">
                  <Button size="lg" variant="outline">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose BantConfirm */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Businesses in {city.name} Choose BantConfirm</h2>
              <p className="text-muted-foreground">
                The trusted B2B marketplace for {city.state}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <GlassCard className="p-6 text-center border-2 border-green-500/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Verified Vendors</h3>
                <p className="text-sm text-muted-foreground">
                  All vendors verified with BANT and KYC processes
                </p>
              </GlassCard>
              <GlassCard className="p-6 text-center border-2 border-blue-500/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Local Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team based in {city.state}
                </p>
              </GlassCard>
              <GlassCard className="p-6 text-center border-2 border-purple-500/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Smart vendor matching powered by Google Gemini AI
                </p>
              </GlassCard>
              <GlassCard className="p-6 text-center border-2 border-orange-500/10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing with best market rates guaranteed
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="container mx-auto px-4">
            <GlassCard className="p-8 xl:p-12 text-center max-w-3xl mx-auto border-2 border-blue-500/30">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business in {city.name}?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Post your requirement and get connected with verified vendors in {city.state}
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span>+91-120-XXXXXXX</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>support@bantconfirm.com</span>
                </div>
              </div>
              <Link to="/post-requirement">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Post Your Requirement Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </GlassCard>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">We Also Serve</h2>
              <p className="text-muted-foreground">
                Explore B2B IT services in other major cities
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {INDIAN_CITIES.filter((c) => c.slug !== citySlug)
                .slice(0, 15)
                .map((c) => (
                  <Link key={c.slug} to={`/services/${c.slug}`}>
                    <Button variant="outline" size="sm">
                      {c.name}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
