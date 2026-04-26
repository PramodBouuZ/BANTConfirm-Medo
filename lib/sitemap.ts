import { INDIAN_CITIES, INDIAN_STATES, SERVICE_CATEGORIES } from '@/data/seo-data';

interface SitemapPage {
  url: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

export const generateSitemap = (products: { slug: string; updated_at: string }[], blogs: { slug: string; updated_at: string }[]) => {
  const baseUrl = 'https://bantconfirm.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages: SitemapPage[] = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/products', changefreq: 'daily', priority: '0.9' },
    { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    { url: '/post-requirement', changefreq: 'monthly', priority: '0.9' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/faq', changefreq: 'monthly', priority: '0.6' },
  ];

  const productPages: SitemapPage[] = products.map((product) => ({
    url: `/products/${product.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: product.updated_at.split('T')[0],
  }));

  const blogPages: SitemapPage[] = blogs.map((blog) => ({
    url: `/blog/${blog.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: blog.updated_at.split('T')[0],
  }));

  const cityPages: SitemapPage[] = INDIAN_CITIES.map((city) => ({
    url: `/services/${city.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const statePages: SitemapPage[] = INDIAN_STATES.map((state) => ({
    url: `/services/state/${state.slug}`,
    changefreq: 'weekly',
    priority: '0.7',
  }));

  const allPages: SitemapPage[] = [
    ...staticPages,
    ...productPages,
    ...blogPages,
    ...cityPages,
    ...statePages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
};

export const downloadSitemap = async () => {
  try {
    // This would be called from admin panel to generate sitemap
    // For now, we'll just return the structure
    const sitemap = generateSitemap([], []);
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};
