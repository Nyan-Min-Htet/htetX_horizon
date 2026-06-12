import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard, Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { supabase } from "@/lib/supabase"; //

interface ProductGridProps {
  title: string;
  products?: Product[];
  showFilters?: boolean;
  theme?: "light" | "blue";
}

export function ProductGrid({
  title,
  products: providedProducts,
  showFilters = false,
  theme = "light",
}: ProductGridProps) {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const bgColor = theme === "blue" ? "bg-blue-50" : "bg-white";
  const textColor = theme === "blue" ? "text-gray-900" : "text-gray-900";
  const mutedColor = theme === "blue" ? "text-gray-600" : "text-gray-600";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const PRODUCTS_PER_PAGE = 6;

  const fetchProducts = async (pageNumber: number, replace = false) => {
    try {
      setLoading(true);

      const from = (pageNumber - 1) * PRODUCTS_PER_PAGE;
      const to = from + PRODUCTS_PER_PAGE - 1;

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .range(from, to);

      if (error) throw error;

      if (replace) {
        setProducts(data || []);
      } else {
        setProducts((prev) => [...prev, ...(data || [])]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, true);
  }, []);

  const handleLoadMore = async () => {
    const nextPage = page + 1;

    await fetchProducts(nextPage);

    setPage(nextPage);
  };

  useEffect(() => {
    if (!providedProducts) {
      const fetchProducts = async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase.from("products").select("*");

          if (error) throw error;

          if (data) {
            const filtered = data.filter(
              (p) => !p.id.startsWith("men-") && !p.id.startsWith("women-"),
            );
            setDbProducts(filtered);
          }
        } catch (err) {
          console.error("Error fetching products:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProducts();
    }
  }, [providedProducts]);

  const finalProducts = providedProducts || dbProducts;

  const sortedProducts = useMemo(() => {
    if (!finalProducts) return [];
    const sorted = [...finalProducts];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "newest":
      default:
        return sorted.sort((a, b) => {
          if (a.is_new && !b.is_new) return -1;
          if (!a.is_new && b.is_new) return 1;
          return b.id.localeCompare(a.id);
        });
    }
  }, [finalProducts, sortBy]);

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-2xl md:text-3xl font-bold ${textColor}`}
          >
            {title}
          </motion.h2>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${mutedColor}`}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-2 rounded-lg border text-sm bg-white border-gray-300 text-gray-900`}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          <div className="flex-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground animate-pulse">
                  Loading products...
                </p>
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className={mutedColor}>No products found in database.</p>
                <p className="text-xs text-gray-400 mt-2">
                  Please check if your Supabase table has data.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              disabled={loading}
              onClick={handleLoadMore}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 py-4"
            >
              {loading ? "Loading..." : "Load More Products"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
