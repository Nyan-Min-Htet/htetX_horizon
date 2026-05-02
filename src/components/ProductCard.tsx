// ProductCard component ကို list view support အတွက် update လုပ်ရန်
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSustainable?: boolean;
  deliveryDays: number;
}

interface ProductCardProps {
  product: Product;
  index: number;
  variant?: "grid" | "list";
}

export function ProductCard({
  product,
  index,
  variant = "grid",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  if (variant === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group flex gap-6 p-6 bg-background rounded-2xl border hover:shadow-lg transition-all"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                New
              </span>
            )}
            {discount && (
              <span className="px-2 py-1 rounded-full bg-highlight text-highlight-foreground text-xs font-semibold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Like Button */}
          <motion.button
            className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setIsLiked(!isLiked)}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              className={`h-3 w-3 transition-colors ${
                isLiked ? "fill-highlight text-highlight" : "text-foreground"
              }`}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {product.category}
            </p>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium text-foreground">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt.
            </p>
          </div>

          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Eye className="h-3 w-3" />
                View
              </Button>
              <Button size="sm" className="gap-1">
                <ShoppingBag className="h-3 w-3" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ... existing grid view code ... */}
    </motion.div>
  );
}
