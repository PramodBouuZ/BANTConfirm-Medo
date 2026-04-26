import { Helmet } from 'react-helmet-async';
import { GlassCard } from '@/components/ui/GlassCard';
import { Target, Eye, Zap, Shield, Users, TrendingUp, Award, Globe, Sparkles } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Us - Our Mission & Vision | BantConfirm</title>
        <meta name="description" content="Learn about BantConfirm, India's premier B2B AI marketplace for Software, IT Hardware, Telecom, and Enterprise Services. Discover our mission, vision, and values." />
        <meta property="og:title" content="About Us - Our Mission & Vision | BantConfirm" />
        <meta property="og:description" content="Learn about BantConfirm, India's premier B2B AI marketplace connecting businesses with verified vendors." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 xl:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/30">
                <Sparkles className="h-4 w-4" />
                About BantConfirm
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Empowering Indian Businesses with AI-Driven B2B Solutions
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground leading-relaxed">
              BantConfirm is India's premier B2B AI marketplace platform designed specifically for Software, IT Hardware, Telecom, Cloud & Enterprise Services. We connect businesses with verified vendors using intelligent BANT qualification.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <GlassCard className="p-0 overflow-hidden border-2 border-blue-500/20">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/e96e0257-7538-47d9-b7f3-6746e55d953a.jpg"
                alt="BantConfirm Team - Modern Business Collaboration"
                className="w-full h-[400px] object-cover"
              />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Mission */}
            <GlassCard className="p-8 border-2 border-blue-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <div className="mb-6">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/f83db7de-e58d-4799-8ef1-2fdc5725552b.jpg"
                  alt="Mission - Strategic Business Goals"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To revolutionize B2B procurement in India by connecting MSMEs and Enterprises with verified, top-tier vendors through AI-driven BANT (Budget, Authority, Need, Timing) qualification.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We aim to reduce procurement cycles from months to days, ensuring businesses get the right solutions at the right time, while maintaining transparency and quality throughout the process.
              </p>
            </GlassCard>

            {/* Vision */}
            <GlassCard className="p-8 border-2 border-purple-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <Eye className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <div className="mb-6">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/23eecac1-e95d-41b9-872e-1c486b8e27a1.jpg"
                  alt="Vision - Technology Innovation"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To become India's most trusted B2B marketplace, empowering 1 million businesses by 2030 with seamless access to enterprise-grade IT, software, telecom, and cloud solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where every Indian business, regardless of size, can leverage cutting-edge technology to compete globally, supported by our verified vendor ecosystem.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What We Do</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                BantConfirm bridges the gap between businesses seeking IT solutions and verified vendors offering quality services.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              <GlassCard className="p-0 overflow-hidden border-2 border-green-500/20">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/ccb45da4-cfb1-4fcb-9d96-4430c4d98a40.jpg"
                  alt="AI-Powered Technology"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">AI-Powered Matching</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Our proprietary AI engine qualifies every lead using BANT methodology, ensuring vendors receive only high-quality, conversion-ready opportunities. This increases efficiency and reduces time wasted on unqualified leads.
                  </p>
                </div>
              </GlassCard>

              <GlassCard className="p-0 overflow-hidden border-2 border-orange-500/20">
                <img
                  src="https://miaoda-site-img.s3cdn.medo.dev/images/7e2bd507-44aa-4eb7-a2e6-81a078d63dfb.jpg"
                  alt="Verified Vendor Network"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                      <Shield className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Verified Vendors</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Every vendor on our platform undergoes rigorous verification including business credentials, KYC documentation, and past performance reviews. We ensure you connect only with legitimate, reliable service providers.
                  </p>
                </div>
              </GlassCard>
            </div>

            <GlassCard className="p-0 overflow-hidden border-2 border-blue-500/20">
              <img
                src="https://miaoda-site-img.s3cdn.medo.dev/images/e01d0179-05ac-40b7-a9ea-37fd4b615e68.jpg"
                alt="B2B Marketplace Platform"
                className="w-full h-80 object-cover"
              />
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <GlassCard className="p-6 text-center border-2 border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white w-fit mx-auto mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customer First</h3>
                <p className="text-sm text-muted-foreground">
                  Every decision we make prioritizes our customers' success and satisfaction.
                </p>
              </GlassCard>

              <GlassCard className="p-6 text-center border-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white w-fit mx-auto mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trust & Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  We build trust through transparent processes and honest communication.
                </p>
              </GlassCard>

              <GlassCard className="p-6 text-center border-2 border-green-500/20 hover:border-green-500/40 transition-all">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We continuously innovate to provide cutting-edge solutions for modern businesses.
                </p>
              </GlassCard>

              <GlassCard className="p-6 text-center border-2 border-orange-500/20 hover:border-orange-500/40 transition-all">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white w-fit mx-auto mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We maintain the highest standards in vendor verification and service delivery.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <GlassCard className="p-8 xl:p-12 border-2 border-blue-500/20">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose BantConfirm?</h2>
                <p className="text-lg text-muted-foreground">
                  We're not just a marketplace – we're your trusted partner in business growth
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shrink-0">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Qualified Requirements</h3>
                    <p className="text-muted-foreground">
                      Our AI ensures every lead has Budget, Authority, Need, and Timing – meaning they're ready to buy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shrink-0">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Verified Vendor Network</h3>
                    <p className="text-muted-foreground">
                      1,250+ verified vendors across India, all background-checked and performance-rated.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shrink-0">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Pan-India Coverage</h3>
                    <p className="text-muted-foreground">
                      From metros to tier-2 cities, we connect you with vendors who understand local business needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shrink-0">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                    <p className="text-muted-foreground">
                      Compare quotes from multiple vendors with GST-compliant billing and no hidden costs.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 xl:p-12 text-center border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of Indian businesses already saving time and money with BantConfirm
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/post-requirement"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg transition-all shadow-lg shadow-blue-500/30"
                >
                  Post Your Requirement
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-background hover:bg-muted border-2 border-border font-medium text-lg transition-all"
                >
                  Explore Solutions
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
