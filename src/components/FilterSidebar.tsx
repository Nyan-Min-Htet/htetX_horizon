// src/components/FilterSidebar.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterOptions {
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  priceRange?: { min: number; max: number };
}

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  options?: FilterOptions;
  theme?: "light" | "dark";
}

// Selected filters type with explicit array types
interface SelectedFilters {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

export function FilterSidebar({
  isOpen,
  onClose,
  options,
  theme = "light",
}: FilterSidebarProps) {
  // Initialize with proper typing
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    sizes: [],
    colors: [],
    priceRange: [0, 1000],
  });

  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-foreground";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";

  // Fixed filter toggle function
  const handleFilterToggle = (
    type: "categories" | "sizes" | "colors",
    value: string,
  ) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [type]: newValues,
      };
    });
  };

  const handlePriceRangeChange = (newValue: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], newValue],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 1000],
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className={`fixed left-0 top-0 h-full w-80 ${bgColor} ${borderColor} border-r shadow-xl z-50 overflow-y-auto lg:static lg:z-auto lg:w-64 lg:shadow-none`}
          >
            {/* Header */}
            <div className={`p-6 border-b ${borderColor}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h3 className={`font-semibold ${textColor}`}>Filters</h3>
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Content */}
            <div className="p-6 space-y-8">
              {/* Categories */}
              {options?.categories && options.categories.length > 0 && (
                <div>
                  <h4 className={`font-medium mb-4 ${textColor}`}>
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {options.categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.categories.includes(
                            category,
                          )}
                          onChange={() =>
                            handleFilterToggle("categories", category)
                          }
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className={textColor}>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {options?.sizes && options.sizes.length > 0 && (
                <div>
                  <h4 className={`font-medium mb-4 ${textColor}`}>Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {options.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFilterToggle("sizes", size)}
                        className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                          selectedFilters.sizes.includes(size)
                            ? "border-primary bg-primary text-white"
                            : `${borderColor} ${textColor} hover:border-primary`
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {options?.colors && options.colors.length > 0 && (
                <div>
                  <h4 className={`font-medium mb-4 ${textColor}`}>Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {options.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleFilterToggle("colors", color)}
                        className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                          selectedFilters.colors.includes(color)
                            ? "border-primary bg-primary text-white"
                            : `${borderColor} ${textColor} hover:border-primary`
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <h4 className={`font-medium mb-4 ${textColor}`}>Price Range</h4>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={textColor}>
                      ${selectedFilters.priceRange[0]}
                    </span>
                    <span className={textColor}>
                      ${selectedFilters.priceRange[1]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={selectedFilters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceRangeChange(parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className={`p-6 border-t ${borderColor} sticky bottom-0 ${bgColor}`}
            >
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button className="flex-1" onClick={onClose}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
