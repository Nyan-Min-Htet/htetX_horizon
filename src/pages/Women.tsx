import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";

export default function Women() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // 1️⃣ Fetch Women Products from Supabase
  useEffect(() => {
    async function fetchWomenProducts() {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("id", "women-%"); // 👈 women products only

        if (error) throw error;

        setProducts((data as Product[]) || []);
      } catch (err) {
        console.error("Error fetching women products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWomenProducts();
  }, []);

  // 2️⃣ Client-side category filter
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <>
      <Header />

      {/* HERO */}
      <CategoryHero
        title="Women's Collection"
        subtitle="Where elegance meets comfort"
        image="https://thumbs.dreamstime.com/b/clothes-hangers-colorful-clothes-women-shop-summer-sale-73852501.jpg?w=1200&h=600&fit=crop"
        theme="bg-gradient-to-r from-pink-50 to-purple-50"
      />

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ProductGrid
          title={
            activeCategory === "All" ? "Women's Collection" : activeCategory
          }
          products={filteredProducts}
          showFilters={true}
          theme="light"
        />
      )}

      <Footer />
    </>
  );
}
