import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: 'General',
    question: 'What is BantConfirm?',
    answer: 'BantConfirm is India\'s premier B2B AI marketplace platform designed for Software, IT Hardware, Telecom, Cloud & Enterprise Services. We connect businesses with verified vendors using AI-driven BANT (Budget, Authority, Need, Timing) qualification to ensure high-quality leads.',
  },
  {
    category: 'General',
    question: 'How does BantConfirm work?',
    answer: 'BantConfirm works in three simple steps: 1) Businesses post their requirements through our platform, 2) Our AI qualifies the leads using BANT methodology, 3) Verified vendors receive qualified leads and respond with tailored solutions. This ensures efficient procurement and quality vendor connections.',
  },
  {
    category: 'For Buyers',
    question: 'Is it free to post requirements?',
    answer: 'Yes, posting requirements on BantConfirm is completely free for businesses. You can submit your IT, software, telecom, or enterprise service requirements without any charges. You only pay when you choose to proceed with a vendor.',
  },
  {
    category: 'For Buyers',
    question: 'How quickly will I receive vendor responses?',
    answer: 'Once your requirement is posted and qualified, verified vendors typically respond within 24-48 hours. You\'ll receive multiple quotes from relevant vendors, allowing you to compare and choose the best solution for your business needs.',
  },
  {
    category: 'For Buyers',
    question: 'Are the vendors verified?',
    answer: 'Yes, all vendors on BantConfirm undergo a rigorous verification process. We verify their business credentials, KYC documents, and past performance. Only verified vendors can access leads, ensuring you connect with legitimate and reliable service providers.',
  },
  {
    category: 'For Vendors',
    question: 'How can I become a vendor on BantConfirm?',
    answer: 'To become a vendor, register on our platform and complete the verification process. Submit your business documents, company profile, and service offerings. Once approved by our admin team, you\'ll start receiving qualified leads matching your expertise.',
  },
  {
    category: 'For Vendors',
    question: 'What types of leads will I receive?',
    answer: 'You\'ll receive BANT-qualified leads that match your service offerings and expertise. Our AI ensures leads have Budget, Authority, Need, and Timing, meaning they\'re ready to make purchasing decisions. This increases your conversion rate significantly.',
  },
  {
    category: 'For Vendors',
    question: 'How much does it cost to join as a vendor?',
    answer: 'Vendor registration and profile setup are free. We operate on a performance-based model where you only pay when you successfully convert a lead. Contact our sales team for detailed pricing information tailored to your business size and requirements.',
  },
  {
    category: 'Products & Services',
    question: 'What types of products and services are available?',
    answer: 'BantConfirm offers a wide range of B2B solutions including ERP Software, CRM Systems, Cloud Telephony, Internet Leased Lines, WhatsApp Business API, SIP Trunks, IT Hardware, Cloud Services, Cybersecurity Solutions, and more. Browse our marketplace to explore all offerings.',
  },
  {
    category: 'Products & Services',
    question: 'Can I compare different vendors and products?',
    answer: 'Yes, our platform allows you to compare multiple vendors, their offerings, pricing, and features side-by-side. You\'ll receive detailed proposals from different vendors, making it easy to evaluate and choose the best solution for your business.',
  },
  {
    category: 'Products & Services',
    question: 'Do you provide implementation support?',
    answer: 'Yes, vendors on our platform provide complete implementation support. From initial consultation to deployment and training, you\'ll receive end-to-end assistance. Our vendor community is committed to ensuring successful implementation of solutions.',
  },
  {
    category: 'Pricing & Payment',
    question: 'How does pricing work?',
    answer: 'Pricing varies based on the product or service you choose. After posting your requirement, you\'ll receive detailed quotes from multiple vendors. You can compare prices, features, and terms before making a decision. All pricing is transparent with no hidden costs.',
  },
  {
    category: 'Pricing & Payment',
    question: 'What payment methods are accepted?',
    answer: 'We support various payment methods including bank transfers, online payments, and purchase orders. Payment terms are agreed upon directly between you and the vendor. For enterprise solutions, flexible payment plans and EMI options may be available.',
  },
  {
    category: 'Security & Privacy',
    question: 'Is my business information secure?',
    answer: 'Absolutely. We take data security seriously. All information shared on BantConfirm is encrypted and stored securely. We comply with industry-standard security practices and never share your information with unauthorized parties. Your privacy is our priority.',
  },
  {
    category: 'Security & Privacy',
    question: 'Who can see my requirements?',
    answer: 'Only verified vendors matching your requirement category can view your posted needs. We don\'t publicly display your contact information. Vendors must be approved by our admin team before accessing any leads, ensuring quality and security.',
  },
  {
    category: 'Support',
    question: 'How can I contact customer support?',
    answer: 'You can reach our support team via email at support@bantconfirm.com or through the contact form on our website. Our team is available Monday to Friday, 9:00 AM - 6:00 PM IST. We typically respond within 24 hours.',
  },
  {
    category: 'Support',
    question: 'What if I\'m not satisfied with a vendor?',
    answer: 'If you\'re not satisfied with a vendor\'s service, please contact our support team immediately. We take all complaints seriously and will work to resolve the issue. We maintain quality standards and take action against vendors who don\'t meet our service expectations.',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>FAQ - Frequently Asked Questions | BantConfirm</title>
        <meta name="description" content="Find answers to frequently asked questions about BantConfirm, our B2B marketplace, products, services, pricing, and more." />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | BantConfirm" />
        <meta property="og:description" content="Find answers to frequently asked questions about BantConfirm, our B2B marketplace, products, and services." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 xl:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/30">
                <HelpCircle className="h-4 w-4" />
                Help Center
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground mb-8">
              Find answers to common questions about BantConfirm, our services, and how we can help your business.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {categories.map((category) => {
              const categoryFAQs = filteredFAQs.filter((faq) => faq.category === category);
              
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    {category}
                  </h2>
                  <div className="space-y-4">
                    {categoryFAQs.map((faq, index) => {
                      const globalIndex = faqs.indexOf(faq);
                      const isOpen = openIndex === globalIndex;

                      return (
                        <GlassCard
                          key={globalIndex}
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'border-2 border-blue-500/30' : 'border-2 border-transparent'
                          }`}
                        >
                          <div 
                            className="p-6 cursor-pointer"
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-lg font-semibold flex-1">{faq.question}</h3>
                              <ChevronDown
                                className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                                  isOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isOpen ? 'max-h-96 mt-4' : 'max-h-0'
                              }`}
                            >
                              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-16">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search query or browse all questions above
                </p>
              </div>
            )}
          </div>

          {/* Still Have Questions */}
          <div className="max-w-4xl mx-auto mt-16">
            <GlassCard className="p-8 text-center border-2 border-blue-500/20">
              <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all"
              >
                Contact Support
              </a>
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
