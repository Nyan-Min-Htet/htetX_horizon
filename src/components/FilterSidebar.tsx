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

export function FilterSidebar({
  isOpen,
  onClose,
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
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200";
  const buttonBg = theme === "dark" ? "bg-gray-800" : "bg-gray-100";
  const buttonHover =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-200";

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
    console.log("Applied filters:", selectedFilters);
    onClose();
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
            className={`fixed left-0 top-0 h-full w-80 ${bgColor} ${borderColor} border-r shadow-2xl z-50 overflow-y-auto lg:static lg:z-auto lg:w-72 lg:shadow-lg`}
          >
            {/* Header */}
            <div
              className={`p-6 border-b ${borderColor} sticky top-0 ${bgColor} z-10`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-6 w-6 text-blue-500" />
                  <h3 className={`text-lg font-bold ${textColor}`}>Filters</h3>
                </div>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                  <h4 className={`font-semibold mb-4 ${textColor}`}>
                    Categories
                  </h4>
                  <div className="space-y-3">
                    {options.categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.categories.includes(
                            category,
                          )}
                          onChange={() =>
                            handleFilterToggle("categories", category)
                          }
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span
                          className={`${textColor} group-hover:text-blue-600 transition-colors`}
                        >
                          {category}
                        </span>
                        {selectedFilters.categories.includes(category) && (
                          <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            ✓
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {options?.sizes && options.sizes.length > 0 && (
                <div>
                  <h4 className={`font-semibold mb-4 ${textColor}`}>Sizes</h4>
                  <div className="flex flex-wrap gap-2">
                    {options.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFilterToggle("sizes", size)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedFilters.sizes.includes(size)
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : `border-gray-300 ${textColor} ${buttonBg} ${buttonHover} hover:border-blue-300`
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
                  <h4 className={`font-semibold mb-4 ${textColor}`}>Colors</h4>
                  <div className="flex flex-wrap gap-3">
                    {options.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleFilterToggle("colors", color)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                          selectedFilters.colors.includes(color)
                            ? "border-blue-500 bg-blue-500 text-white shadow-md"
                            : `border-gray-300 ${textColor} ${buttonBg} ${buttonHover} hover:border-blue-300`
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{
                            backgroundColor: color.toLowerCase(),
                            borderColor:
                              theme === "dark" ? "#374151" : "#D1D5DB",
                          }}
                        />
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div>
                <h4 className={`font-semibold mb-4 ${textColor}`}>
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className={textColor}>
                      ${selectedFilters.priceRange[0]}
                    </span>
                    <span className={textColor}>
                      ${selectedFilters.priceRange[1]}
                    </span>
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

                    <div className="absolute top-6 left-0 right-0 flex justify-center mt-2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Up to ${selectedFilters.priceRange[1]}
                      </span>
                    </div>
                  </div>
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
                  className="flex-1 border-gray-300 hover:border-gray-400"
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

      {/* Custom CSS for range slider */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `,
        }}
      />
    </>
  );
}
