import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { SEO } from '@/components/SEO';
import { getProducts, getProductBySlug } from '@/db/api';
import type { Product } from '@/types/types';
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { 
  Check, 
  Star, 
  Building2, 
  ArrowLeft,
  Share2,
  Heart,
  ShoppingCart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  TrendingUp,
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadProductData();
  }, [slug]);

  const loadProductData = async () => {
    try {
      setLoading(true);
      
      if (!slug) {
        toast({
          title: 'Invalid URL',
          description: 'Product slug is missing.',
          variant: 'destructive',
        });
        navigate('/products');
        return;
      }

      // Get product by slug
      const foundProduct = await getProductBySlug(slug);
      
      if (!foundProduct) {
        toast({
          title: 'Product not found',
          description: 'The product you are looking for does not exist.',
          variant: 'destructive',
        });
        navigate('/products');
        return;
      }

      setProduct(foundProduct);

      // Get similar products (same category, exclude current product)
      const allProducts = await getProducts({ category_id: foundProduct.category_id });
      const similar = allProducts
        .filter(p => p.id !== foundProduct.id && p.is_visible)
        .slice(0, 4);
      
      setSimilarProducts(similar);
    } catch (error: any) {
      console.error('Error loading product:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load product',
        variant: 'destructive',
      });
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousImage = () => {
    if (!product?.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images!.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product?.images || product.images.length === 0) return;
    setCurrentImageIndex((prev) => 
      prev === product.images!.length - 1 ? 0 : prev + 1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'Product',
          text: product?.description || '',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Product link copied to clipboard',
      });
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: isFavorite ? 'Product removed from your favorites' : 'Product added to your favorites',
    });
  };

  const handleBookNow = () => {
    navigate('/post-requirement', { state: { productName: product?.name || '' } });
  };

  const handleConsultExpert = () => {
    navigate('/contact', { state: { productName: product?.name || '' } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            <Skeleton className="h-[500px] w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = product.images && product.images.length > 0 ? product.images : ['/placeholder-product.jpg'];

  const seoTitle = `${product.name} | Buy Online at Best Price`;
  const seoDescription = product.description || `Get ${product.name} from verified vendors. ${product.features?.slice(0, 3).join(', ')}. Best prices guaranteed.`;
  const seoKeywords = `${product.name}, ${product.category?.name || 'B2B'}, enterprise software, business solutions, India`;
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  const structuredData = [
    generateProductSchema(product),
    generateBreadcrumbSchema(breadcrumbs),
  ];

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={`/products/${product.slug}`}
        ogType="product"
        ogImage={images[0]}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{product.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <GlassCard className="p-0 overflow-hidden border-2 border-primary/20">
              <div className="relative h-[500px] bg-muted/30">
                <img
                  src={images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                  <>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                      onClick={handlePreviousImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full shadow-lg"
                      onClick={handleNextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'w-8 bg-white'
                              : 'w-2 bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </GlassCard>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-primary shadow-lg shadow-primary/50'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Actions */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl xl:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(4.8/5.0)</span>
                    <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-500/30">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleToggleFavorite}
                    className={isFavorite ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {product.price || 'Contact for Price'}
                </span>
                {product.price && (
                  <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Best Price
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50"
                  onClick={handleBookNow}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950"
                  onClick={handleConsultExpert}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consult Expert
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 p-4 bg-muted/30 rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-muted-foreground">Verified Vendor</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-muted-foreground">Quality Assured</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <Package className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-muted-foreground">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {product.features && product.features.length > 0 && (
          <GlassCard className="mb-12 border-2 border-blue-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-500/10"
                >
                  <div className="p-1 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Detailed Description */}
        {product.description && (
          <GlassCard className="mb-12 border-2 border-green-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                <Package className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Product Description</h2>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </GlassCard>
        )}

        {/* Vendor Information */}
        {product.vendor && (
          <GlassCard className="mb-12 border-2 border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold">Provided By</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{product.vendor.company_name}</h3>
                {product.vendor.description && (
                  <p className="text-muted-foreground">{product.vendor.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-500/30">
                  <Shield className="mr-1 h-3 w-3" />
                  Verified Vendor
                </Badge>
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-500/30">
                  <Check className="mr-1 h-3 w-3" />
                  Active
                </Badge>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white">
                  <Package className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Similar Products</h2>
              </div>
              <Link to="/products">
                <Button variant="outline">
                  View All Products
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
