import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { womenProducts } from "@/data/womenProducts";
import { useState } from "react";

export default function Women() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? womenProducts
      : womenProducts.filter((product) => product.category === activeCategory);

  return (
    <>
      <Header />

      <CategoryHero
        title="Women's Collection"
        subtitle="Where elegance meets comfort"
        image="https://thumbs.dreamstime.com/b/clothes-hangers-colorful-clothes-women-shop-summer-sale-73852501.jpg?w=1200&h=600&fit=crop"
        theme="bg-gradient-to-r from-pink-50 to-purple-50"
      />

      <ProductGrid
        title={activeCategory === "All" ? "Women's Collection" : activeCategory}
        products={filteredProducts}
        showFilters={true}
        theme="light"
      />

      <Footer />
    </>
  );
}
