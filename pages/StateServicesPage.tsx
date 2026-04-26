import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProducts } from '@/db/api';
import type { Product } from '@/types/types';
import { INDIAN_STATES, INDIAN_CITIES, SERVICE_CATEGORIES } from '@/data/seo-data';
import { generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { MapPin, ArrowRight, Building2, Briefcase } from 'lucide-react';

export default function StateServicesPage() {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const state = INDIAN_STATES.find((s) => s.slug === stateSlug);
  const citiesInState = INDIAN_CITIES.filter((c) => c.state === state?.name);

  useEffect(() => {
    if (state) {
      getProducts().then((data) => {
        setProducts(data.slice(0, 6));
        setLoading(false);
      });
    }
  }, [state]);

  if (!state) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">State Not Found</h1>
        <p className="text-muted-foreground mb-8">The state you're looking for doesn't exist.</p>
        <Link to="/services">
          <Button>View All Services</Button>
        </Link>
      </div>
    );
  }

  const seoTitle = `B2B IT Services in ${state.name} | Software, Telecom, Cloud Solutions`;
  const seoDescription = `Find verified B2B IT service providers across ${state.name}. Get ERP, CRM, Cloud Telephony, WhatsApp API, SIP Trunk, Internet Leased Line, and more enterprise solutions with AI-powered BANT matching.`;
  const seoKeywords = `B2B services ${state.name}, IT services ${state.name}, software company ${state.name}, telecom services ${state.name}, cloud services ${state.name}, enterprise solutions ${state.name}`;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: state.name, url: `/services/state/${state.slug}` },
  ];

  const structuredData = [
    generateLocalBusinessSchema(state.name, state.name),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`/services/state/${state.slug}`}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
                <span className="text-sm font-semibold uppercase tracking-wider text-purple-600">
                  State Services
                </span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                B2B IT Services in {state.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with verified vendors for Software, IT Hardware, Telecom, Cloud & Enterprise Services across {state.name}. 
                Get AI-qualified leads and transparent pricing from India's #1 B2B marketplace.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/post-requirement">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
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

        {/* Cities in State */}
        {citiesInState.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Major Cities in {state.name}</h2>
                <p className="text-muted-foreground">
                  Explore B2B IT services in these cities
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {citiesInState.map((city) => (
                  <Link key={city.slug} to={`/services/${city.slug}`}>
                    <GlassCard className="p-6 text-center hover:shadow-xl transition-all border-2 border-purple-500/10 hover:border-purple-500/30">
                      <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-bold">{city.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">View Services</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Available */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Services Available in {state.name}</h2>
              <p className="text-muted-foreground">
                Comprehensive B2B IT solutions across the state
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((service) => (
                <GlassCard key={service.slug} className="p-6 hover:shadow-xl transition-all border-2 border-purple-500/10 hover:border-purple-500/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Professional {service.name} services in {state.name}
                      </p>
                      <Link to={`/products?category=${service.slug}`}>
                        <Button variant="link" className="p-0 h-auto text-purple-600">
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Popular Solutions in {state.name}</h2>
                <p className="text-muted-foreground">
                  Trusted by businesses across the state
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

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="container mx-auto px-4">
            <GlassCard className="p-8 xl:p-12 text-center max-w-3xl mx-auto border-2 border-purple-500/30">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business in {state.name}?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Post your requirement and get connected with verified vendors across the state
              </p>
              <Link to="/post-requirement">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Post Your Requirement Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </GlassCard>
          </div>
        </section>

        {/* Other States */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Other States</h2>
              <p className="text-muted-foreground">
                B2B IT services across India
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {INDIAN_STATES.filter((s) => s.slug !== stateSlug)
                .slice(0, 15)
                .map((s) => (
                  <Link key={s.slug} to={`/services/state/${s.slug}`}>
                    <Button variant="outline" size="sm">
                      {s.name}
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
