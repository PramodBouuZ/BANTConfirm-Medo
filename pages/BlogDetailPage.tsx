import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getBlogBySlug, getBlogs } from '@/db/api';
import type { Blog } from '@/types/types';
import { Calendar, User, ArrowLeft, Share2, Clock, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogData();
  }, [slug]);

  const loadBlogData = async () => {
    try {
      setLoading(true);

      if (!slug) {
        toast({
          title: 'Invalid URL',
          description: 'Blog slug is missing.',
          variant: 'destructive',
        });
        navigate('/blog');
        return;
      }

      // Get blog by slug
      const foundBlog = await getBlogBySlug(slug);

      if (!foundBlog) {
        toast({
          title: 'Blog not found',
          description: 'The blog post you are looking for does not exist.',
          variant: 'destructive',
        });
        navigate('/blog');
        return;
      }

      setBlog(foundBlog);

      // Get related blogs (same category, exclude current blog)
      const allBlogs = await getBlogs();
      const related = allBlogs
        .filter(b => b.category_id === foundBlog.category_id && b.id !== foundBlog.id)
        .slice(0, 3);

      setRelatedBlogs(related);
    } catch (error: any) {
      console.error('Error loading blog:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load blog',
        variant: 'destructive',
      });
      navigate('/blog');
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

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title || 'Blog Post',
          text: blog?.excerpt || '',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Blog link copied to clipboard',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-96 w-full rounded-2xl mb-8" />
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blog.meta_title || blog.title} | BantConfirm Blog</title>
        <meta name="description" content={blog.meta_description || blog.excerpt || blog.title} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.meta_title || blog.title} />
        <meta property="og:description" content={blog.meta_description || blog.excerpt || blog.title} />
        {blog.featured_image && <meta property="og:image" content={blog.featured_image} />}
        <meta property="og:url" content={window.location.href} />
        <meta property="article:published_time" content={blog.created_at} />
        <meta property="article:modified_time" content={blog.updated_at} />
        {blog.author && <meta property="article:author" content={blog.author} />}
        {blog.category && <meta property="article:section" content={blog.category.name} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.meta_title || blog.title} />
        <meta name="twitter:description" content={blog.meta_description || blog.excerpt || blog.title} />
        {blog.featured_image && <meta name="twitter:image" content={blog.featured_image} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground font-medium line-clamp-1">{blog.title}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Image */}
        {blog.featured_image && (
          <div className="mb-12">
            <GlassCard className="p-0 overflow-hidden border-2 border-primary/20">
              <div className="relative h-[400px] xl:h-[500px]">
                <img
                  src={blog.featured_image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-4xl mx-auto">
          {/* Category Badge */}
          {blog.category && (
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
              <Tag className="mr-1 h-3 w-3" />
              {blog.category.name}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            {blog.author && (
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium">{blog.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
              <span>{calculateReadTime(blog.content)} min read</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Excerpt */}
          {blog.excerpt && (
            <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-500/10">
              <p className="text-lg text-foreground italic leading-relaxed">
                {blog.excerpt}
              </p>
            </div>
          )}

          {/* Content */}
          <GlassCard className="mb-12 border-2 border-blue-500/20">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-foreground leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </GlassCard>

          {/* Share Section */}
          <div className="mb-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">Found this article helpful?</h3>
                <p className="text-sm text-muted-foreground">Share it with your network</p>
              </div>
              <Button onClick={handleShare} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Share2 className="mr-2 h-4 w-4" />
                Share Article
              </Button>
            </div>
          </div>
        </article>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Related Articles</h2>
              <p className="text-muted-foreground">Continue reading on similar topics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog.id} to={`/blog/${relatedBlog.slug}`}>
                  <GlassCard className="h-full overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group border-2 border-transparent hover:border-blue-500/30">
                    {relatedBlog.featured_image && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedBlog.featured_image}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      {relatedBlog.category && (
                        <Badge className="mb-2 text-xs bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
                          {relatedBlog.category.name}
                        </Badge>
                      )}
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                      {relatedBlog.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedBlog.excerpt}
                        </p>
                      )}
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
