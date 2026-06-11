import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartContext";

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  image: string;
  rating?: number | null;
  reviews?: number | null;
  category?: string | null;
  is_new?: boolean;
  is_sustainable?: boolean;
  delivery_days?: number | null;
  description?: string | null;
  specs?: Array<Record<string, unknown>>;
  reviews_data?: Array<Record<string, unknown>>;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  const discount =
    product.original_price && product.original_price > product.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100,
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
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-4">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.is_new && (
            <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
              New
            </span>
          )}

          {discount && (
            <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
              -{discount}%
            </span>
          )}

          {product.is_sustainable && (
            <span className="p-1.5 rounded-full bg-green-500 text-white">
              <Leaf className="h-3 w-3" />
            </span>
          )}
        </div>

        <motion.button
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
          onClick={() => setIsLiked(!isLiked)}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-4 w-4 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </motion.button>

        <motion.div
          className="absolute bottom-4 left-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
        >
          <Button
            variant="outline"
            className="flex-1 h-30 bg-white text-gray-900"
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>

          <Link to={`/product/${product.id}`}>
            <Button variant="ghost" size="icon" className="bg-white border">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500 uppercase">
          {product.category || "Product"}
        </p>

        <h3 className="font-semibold text-gray-900">{product.name}</h3>

        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />

          <span className="text-sm font-medium">{product.rating ?? 0}</span>

          <span className="text-sm text-gray-500">
            ({product.reviews ?? 0} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price}</span>

            {product.original_price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.original_price}
              </span>
            )}
          </div>

          <span className="text-xs text-green-600">
            {product.delivery_days
              ? product.delivery_days === 2
                ? "Tomorrow"
                : `${product.delivery_days} days`
              : "N/A"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
