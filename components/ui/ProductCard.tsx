import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400';
  const features = product.features?.slice(0, 2) || [];

  return (
    <Card className="glass-card overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {product.rating && product.rating > 0 && (
            <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {product.rating}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description || 'No description available'}
        </p>
        {features.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs font-semibold text-secondary">⚡ KEY FEATURES</p>
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        )}
        {product.price && (
          <p className="text-lg font-bold text-primary">{product.price}</p>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col space-y-2">
        <Link to={`/products/${product.slug}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </Link>
        <Link to={`/products/${product.slug}`} className="w-full">
          <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
            Consult Expert
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
