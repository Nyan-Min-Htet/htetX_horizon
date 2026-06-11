import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard"; // Import Product type
import { supabase } from "@/lib/supabase"; // 👈 Import supabase client

export default function Men() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // ၁။ Supabase ကနေ Men's Products တွေကို ဆွဲထုတ်မယ်
  useEffect(() => {
    async function fetchMenProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .ilike("id", "men-%"); // 👈 id က "men-" နဲ့ စတာတွေကိုပဲ ယူမယ်

        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error("Error fetching men's products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenProducts();
  }, []);

  // ၂။ Category အလိုက် Filter လုပ်မယ် (Client-side filtering)
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <>
      <Header />

      {/* Hero Section with Blue Theme */}
      <CategoryHero
        title="Men's Collection"
        subtitle="Designed for modern masculinity"
        image="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&h=600&fit=crop"
        theme="bg-gradient-to-r from-blue-50 to-blue-100"
      />

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProductGrid
          title={activeCategory === "All" ? "Men's Collection" : activeCategory}
          products={filteredProducts} // 👈 Database က ရလာတဲ့ data ကို ပို့ပေးမယ်
          showFilters={true}
          theme="blue"
        />
      )}

      <Footer />
    </>
  );
}
