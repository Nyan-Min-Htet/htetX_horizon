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
}

export function ProductCard({ product, index }: ProductCardProps) {
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
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-4">
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
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
              New
            </span>
          )}
          {discount && (
            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
              -{discount}%
            </span>
          )}
          {product.isSustainable && (
            <span className="p-1.5 rounded-full bg-green-500 text-white">
              <Leaf className="h-3 w-3" />
            </span>
          )}
        </div>

        {/* Like Button */}
        <motion.button
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
          onClick={() => setIsLiked(!isLiked)}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>

        {/* Quick Actions */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="flex-1 bg-white text-gray-900 hover:bg-gray-50 border border-gray-200"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            className="bg-white text-gray-900 hover:bg-gray-50 border border-gray-200"
            size="icon"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-900">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price & Delivery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-green-600 font-medium">
            {product.deliveryDays === 2
              ? "Tomorrow"
              : `${product.deliveryDays} days`}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
