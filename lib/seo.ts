import type { Product, Vendor } from '@/types/types';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BantConfirm',
  description: "India's #1 B2B AI Marketplace for Software, IT Hardware, Telecom, Cloud & Enterprise Services",
  url: 'https://bantconfirm.com',
  logo: 'https://bantconfirm.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-120-XXXXXXX',
    contactType: 'Customer Service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Noida',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.facebook.com/bantconfirm',
    'https://www.linkedin.com/company/bantconfirm',
    'https://twitter.com/bantconfirm',
    'https://www.instagram.com/bantconfirm',
  ],
});

export const generateProductSchema = (product: Product, vendor?: Vendor) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.images?.[0] || 'https://bantconfirm.com/default-product.jpg',
  brand: {
    '@type': 'Brand',
    name: vendor?.company_name || 'BantConfirm',
  },
  offers: {
    '@type': 'Offer',
    price: product.price || '0',
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
    url: `https://bantconfirm.com/products/${product.slug}`,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '127',
  },
});

export const generateLocalBusinessSchema = (city: string, state: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: `BantConfirm - ${city}`,
  description: `B2B AI Marketplace for Software, IT Hardware, Telecom, Cloud & Enterprise Services in ${city}, ${state}`,
  url: `https://bantconfirm.com/services/${city.toLowerCase().replace(/\s+/g, '-')}`,
  telephone: '+91-120-XXXXXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: city,
    addressRegion: state,
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.5355',
    longitude: '77.3910',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '₹₹',
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://bantconfirm.com${item.url}`,
  })),
});

export const generateServiceSchema = (serviceName: string, city?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: `Professional ${serviceName} services ${city ? `in ${city}` : 'across India'}`,
  provider: {
    '@type': 'Organization',
    name: 'BantConfirm',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: serviceName,
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
