import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { getBlogs } from '@/db/api';
import type { Blog } from '@/types/types';
import { Calendar, User, ArrowRight, Search, BookOpen, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchQuery, blogs]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (error: any) {
      console.error('Error loading blogs:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load blogs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-12 w-full max-w-md mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Blog - Latest Insights & Updates | BantConfirm</title>
        <meta name="description" content="Stay updated with the latest insights, trends, and news in B2B technology, software, and enterprise solutions. Expert articles from BantConfirm." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog - Latest Insights & Updates | BantConfirm" />
        <meta property="og:description" content="Stay updated with the latest insights, trends, and news in B2B technology, software, and enterprise solutions." />
        <meta property="og:url" content={window.location.href} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Latest Insights & Updates | BantConfirm" />
        <meta name="twitter:description" content="Stay updated with the latest insights, trends, and news in B2B technology, software, and enterprise solutions." />
        
        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 xl:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/30">
                <BookOpen className="h-4 w-4" />
                Insights & Updates
                <Sparkles className="h-4 w-4" />
              </span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              BantConfirm Blog
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground mb-8">
              Stay updated with the latest insights, trends, and news in B2B technology, software, and enterprise solutions.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No blogs found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try adjusting your search query' : 'Check back soon for new articles'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredBlogs.map((blog) => (
                  <Link key={blog.id} to={`/blog/${blog.slug}`}>
                    <GlassCard className="h-full overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group border-2 border-transparent hover:border-blue-500/30">
                      {/* Featured Image */}
                      {blog.featured_image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.featured_image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Category Badge */}
                        {blog.category && (
                          <Badge className="mb-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
                            {blog.category.name}
                          </Badge>
                        )}

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        {blog.excerpt && (
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {blog.excerpt}
                          </p>
                        )}

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            {blog.author && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{blog.author}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(blog.created_at)}</span>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
