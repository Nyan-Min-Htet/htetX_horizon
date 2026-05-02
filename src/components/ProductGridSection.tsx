import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard, Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";

interface ProductGridSectionProps {
  title: string;
  products: Product[];
  showFilters?: boolean;
  theme?: "light" | "dark";
  filterOptions?: {
    categories?: string[];
    sizes?: string[];
    colors?: string[];
    priceRange?: { min: number; max: number };
  };
}

export function ProductGridSection({
  title,
  products,
  showFilters = false,
  theme = "light",
  filterOptions,
}: ProductGridSectionProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-background";
  const textColor = theme === "dark" ? "text-white" : "text-foreground";
  const mutedColor =
    theme === "dark" ? "text-gray-300" : "text-muted-foreground";

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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 rounded-lg border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-200"
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* View Toggle */}
            <div
              className={`flex rounded-lg p-1 ${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-white text-foreground shadow-sm"
                    : mutedColor
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-white text-foreground shadow-sm"
                    : mutedColor
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Button */}
            {showFilters && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              options={filterOptions}
              theme={theme}
            />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    : "space-y-6"
                }
              >
                {products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    variant={viewMode}
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
        {products.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
