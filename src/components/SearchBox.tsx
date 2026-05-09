// src/components/SearchBox.tsx
import { useState, useEffect, useRef } from "react";
import { Search, Sparkles, History, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { allProductsFlat } from "@/data/allProducts";
import { Button } from "./ui/button";
import { Product } from "./ProductCard";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Save to recent searches
    const updatedRecent = [
      query,
      ...recentSearches.filter((i) => i !== query),
    ].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    // Filter products
    const filtered = allProductsFlat.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
    setIsOpen(true);
  };

  const removeSingleSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    const updatedRecent = recentSearches.filter(
      (item) => item !== termToRemove,
    );
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div
      className="hidden md:flex flex-1 max-w-md mx-4 relative"
      ref={searchRef}
    >
      <form onSubmit={handleSearch} className="relative w-full group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full h-11 pl-11 pr-14 rounded-2xl bg-secondary/50 border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:border-blue-300 focus:bg-white transition-all shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-blue-100 text-blue-600 text-xs font-medium">
          <Sparkles className="h-3 w-3" />
          AI
        </div>
      </form>

      {/* SEARCH RESULTS DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Recent Searches Section */}
            {results.length === 0 && query === "" && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    <History className="h-3 w-3" />
                    Recent Searches
                  </div>
                  <button
                    onClick={clearRecent}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.length > 0 ? (
                    recentSearches.map((term) => (
                      <div
                        key={term}
                        className="group flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <span
                          className="flex-1"
                          onClick={() => {
                            setQuery(term);
                            const filtered = allProductsFlat.filter((p) =>
                              p.name.toLowerCase().includes(term.toLowerCase()),
                            );
                            setResults(filtered);
                          }}
                        >
                          {term}
                        </span>
                        <button
                          onClick={(e) => removeSingleSearch(e, term)}
                          className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-xs text-gray-400 py-2">
                      No recent searches
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Product Results Section */}
            <div className="max-h-[400px] overflow-y-auto">
              {results.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex items-center gap-4 p-3 hover:bg-blue-50 transition-colors"
                    >
                      <img
                        src={product.image}
                        className="w-12 h-12 rounded-lg object-cover"
                        alt={product.name}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                        {product.category}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                query !== "" && (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-500">
                      No products found for "{query}"
                    </p>
                    <Button
                      variant="link"
                      className="text-xs text-blue-600 mt-2"
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                      }}
                    >
                      Clear search
                    </Button>
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
