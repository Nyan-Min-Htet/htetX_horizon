import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ProductCard, Product } from "./ProductCard";
import { FilterSidebar } from "./FilterSidebar";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";

interface ProductGridProps {
  title: string;
  products: Product[];
  showFilters?: boolean;
  theme?: "light" | "blue";
}

export function ProductGrid({
  title,
  products,
  showFilters = false,
  theme = "light",
}: ProductGridProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [activeFilters, setActiveFilters] = useState(0);

  const bgColor = theme === "blue" ? "bg-blue-50" : "bg-white";
  const textColor = theme === "blue" ? "text-gray-900" : "text-gray-900";
  const mutedColor = theme === "blue" ? "text-gray-600" : "text-gray-600";

  // Sort products function
  const sortedProducts = useMemo(() => {
    const sorted = [...products];

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
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.id.localeCompare(a.id);
        });
    }
  }, [products, sortBy]);

  // type FilterValues = {
  //   [key: string]: unknown;
  // };

  // const handleFilterApply = (filters: FilterValues) => {
  //   const count = Object.values(filters).reduce(
  //     (total: number, current: unknown) => {
  //       if (Array.isArray(current)) return total + current.length;
  //       return total;
  //     },
  //     0,
  //   );
  //   setActiveFilters(Number(count));
  //   setIsFilterOpen(false);
  // };

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
            {/* Sort Dropdown */}
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

            {/* Filter Button */}
            {/* {showFilters && (
              <Button
                variant={activeFilters > 0 ? "default" : "outline"}
                className="gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilters > 0 && (
                  <span className="bg-white text-blue-600 px-2 py-1 rounded-full text-xs">
                    {activeFilters}
                  </span>
                )}
              </Button>
            )} */}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {/* {showFilters && (
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={handleFilterApply}
              options={{
                categories: ["Clothing", "Footwear", "Accessories", "Watches"],
                sizes: ["S", "M", "L", "XL", "XXL"],
                colors: ["Black", "Blue", "White", "Red", "Green"],
                priceRange: { min: 0, max: 1000 },
              }}
              theme={theme}
            />
          )} */}

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
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
                <p className={mutedColor}>No products found</p>
              </div>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-7">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 py-4"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
