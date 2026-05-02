import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGrid } from "@/components/ProductGrid";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { menProducts } from "@/data/menProducts";
import { useState } from "react";

export default function Men() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? menProducts
      : menProducts.filter((product) => product.category === activeCategory);

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

      {/* Products Grid with Blue Theme */}
      <ProductGrid
        title={activeCategory === "All" ? "Men's Collection" : activeCategory}
        products={filteredProducts}
        showFilters={true}
        theme="blue" // Changed from dark to blue
      />

      <Footer />
    </>
  );
}
