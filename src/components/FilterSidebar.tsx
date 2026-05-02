import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterOptions {
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  priceRange?: { min: number; max: number };
}

type Filters = {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange?: [number, number];
};

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  options?: FilterOptions;
  theme?: "light" | "blue";
}

export function FilterSidebar({
  isOpen,
  onClose,
  onApply,
  options,
  theme = "light",
}: FilterSidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    priceRange: [0, 1000] as [number, number],
  });

  // Colors for better visibility
  const bgColor = theme === "blue" ? "bg-white" : "bg-white";
  const textColor = theme === "blue" ? "text-gray-900" : "text-gray-900";
  const borderColor = theme === "blue" ? "border-blue-200" : "border-gray-200";
  const accentColor = theme === "blue" ? "text-blue-600" : "text-blue-600";

  const handleFilterToggle = (
    type: "categories" | "sizes" | "colors",
    value: string,
  ) => {
    setSelectedFilters((prev) => {
      const currentArray = prev[type];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [type]: newArray,
      };
    });
  };

  const handlePriceRangeChange = (maxValue: number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      priceRange: [prev.priceRange[0], maxValue],
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

  const applyFilters = () => {
    onApply(selectedFilters);
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-100 bg-white border-r border-gray-200 shadow-2xl z-100 overflow-y-auto lg:static lg:z-auto lg:w-80 lg:h-auto lg:max-h-[100vh] lg:rounded-xl lg:shadow-xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Filter Content - Increased height */}
            <div className="p-6 space-y-8 h-[calc(100vh-200px)] lg:h-auto overflow-y-auto">
              {/* Categories */}
              {options?.categories && options.categories.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-4 text-gray-900">
                    Categories
                  </h4>
                  <div className="space-y-3">
                    {options.categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedFilters.categories.includes(
                              category,
                            )}
                            onChange={() =>
                              handleFilterToggle("categories", category)
                            }
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          {selectedFilters.categories.includes(category) && (
                            <Check className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none" />
                          )}
                        </div>
                        <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {options?.sizes && options.sizes.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-4 text-gray-900">Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {options.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFilterToggle("sizes", size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedFilters.sizes.includes(size)
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-300 text-gray-700 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
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
                  <h4 className="font-semibold mb-4 text-gray-900">Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {options.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleFilterToggle("colors", color)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedFilters.colors.includes(color)
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : "border-gray-300 text-gray-700 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${selectedFilters.priceRange[0]}</span>
                    <span>${selectedFilters.priceRange[1]}</span>
                  </div>

                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={selectedFilters.priceRange[1]}
                      onChange={(e) =>
                        handlePriceRangeChange(Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${selectedFilters.priceRange[1] / 10}%, #e5e7eb ${selectedFilters.priceRange[1] / 10}%, #e5e7eb 100%)`,
                      }}
                    />

                    <div className="absolute top-6 left-0 right-0 flex justify-center mt-2 py-3">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Up to ${selectedFilters.priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white py-3">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-900"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500">
                  {selectedFilters.categories.length +
                    selectedFilters.sizes.length +
                    selectedFilters.colors.length}{" "}
                  filters selected
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
