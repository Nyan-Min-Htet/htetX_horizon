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

export function ProductCard({ product, index, variant = "grid" }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={
        variant === "list"
          ? "group relative gap-6 rounded-3xl border border-border bg-card p-4 shadow-card md:flex"
          : "group relative"
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div
        className={
          variant === "list"
            ? "relative mb-4 aspect-square overflow-hidden rounded-3xl bg-secondary/50 md:mb-0 md:w-56 md:shrink-0"
            : "relative mb-4 aspect-square overflow-hidden rounded-3xl bg-secondary/50"
        }
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              New
            </span>
          )}
          {discount && (
            <span className="px-3 py-1 rounded-full bg-highlight text-highlight-foreground text-xs font-semibold">
              -{discount}%
            </span>
          )}
          {product.isSustainable && (
            <span className="p-1.5 rounded-full bg-accent text-accent-foreground">
              <Leaf className="h-3 w-3" />
            </span>
          )}
        </div>

        {/* Like Button */}
        <motion.button
          className="absolute top-4 right-4 p-2.5 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={() => setIsLiked(!isLiked)}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isLiked ? "fill-highlight text-highlight" : "text-foreground"}`}
          />
        </motion.button>

        {/* Quick Actions */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="glass" className="flex-1" size="sm">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="glass" size="icon" className="h-9 w-9">
            <Eye className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className={variant === "list" ? "flex flex-1 flex-col justify-center space-y-3" : "space-y-2"}>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-foreground">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price & Delivery */}
        <div className="flex items-center justify-between">
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
          <span className="text-xs text-accent font-medium">
            {product.deliveryDays === 2
              ? "Tomorrow"
              : `${product.deliveryDays} days`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
