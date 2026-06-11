// src/components/SearchBox.tsx
import { useState, useEffect, useRef } from "react";
import { Search, Sparkles, History, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Product } from "./ProductCard";
import { supabase } from "@/lib/supabase";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // close dropdown click outside
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

  // 🔥 SUPABASE SEARCH (REAL TIME)
  const searchProducts = async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${value}%`)
      .limit(10);

    if (error) {
      console.error("Search error:", error.message);
      return;
    }

    setResults((data as Product[]) || []);
  };

  // debounce typing search
  useEffect(() => {
    const delay = setTimeout(() => {
      searchProducts(query);
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const updatedRecent = [
      query,
      ...recentSearches.filter((i) => i !== query),
    ].slice(0, 5);

    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    setIsOpen(true);
  };

  const removeSingleSearch = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter((i) => i !== term);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
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
      {/* INPUT */}
      <form onSubmit={handleSearch} className="relative w-full group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-600" />

        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full h-11 pl-11 pr-14 rounded-2xl bg-gray-100 text-sm focus:outline-none focus:bg-white"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-blue-600">
          <Sparkles className="h-3 w-3" />
          AI
        </div>
      </form>

      {/* DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl z-50"
          >
            {/* RECENT */}
            {results.length === 0 && query === "" && (
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500">Recent</span>
                  <button
                    onClick={clearRecent}
                    className="text-xs text-blue-600"
                  >
                    Clear
                  </button>
                </div>

                {recentSearches.length === 0 ? (
                  <p className="text-xs text-gray-400">No recent searches</p>
                ) : (
                  recentSearches.map((term) => (
                    <div
                      key={term}
                      className="flex justify-between py-1 text-sm"
                    >
                      <span
                        className="cursor-pointer"
                        onClick={() => setQuery(term)}
                      >
                        {term}
                      </span>

                      <button onClick={(e) => removeSingleSearch(e, term)}>
                        <X className="h-3 w-3 text-gray-400" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* RESULTS */}
            <div className="max-h-[400px] overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100"
                >
                  <img
                    src={product.image}
                    className="w-10 h-10 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">${product.price}</p>
                  </div>

                  <span className="text-xs text-gray-400">
                    {product.category}
                  </span>
                </Link>
              ))}

              {query !== "" && results.length === 0 && (
                <p className="p-4 text-center text-sm text-gray-500">
                  No products found
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
