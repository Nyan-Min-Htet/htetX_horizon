import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGridSection } from "@/components/ProductGridSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { menProducts } from "@/data/menProducts";
import { useState } from "react";

const menCategories = [
  {
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=300&fit=crop",
    count: menProducts.filter((p) => p.category === "Clothing").length,
  },
  {
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    count: menProducts.filter((p) => p.category === "Footwear").length,
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
    count: menProducts.filter((p) => p.category === "Accessories").length,
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    count: menProducts.filter((p) => p.category === "Watches").length,
  },
];

export default function Men() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? menProducts
      : menProducts.filter((product) => product.category === activeCategory);

  return (
    <>
      <Header />

      {/* Hero Section - Bold & Masculine */}
      <CategoryHero
        title="Men's Collection"
        subtitle="Designed for modern masculinity"
        image="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&h=600&fit=crop"
        theme="bg-gradient-to-r from-gray-50 to-blue-100"
        overlay="bg-blue-900/20"
      />

      {/* Quick Categories */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <motion.button
              key="all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory("All")}
              className={`p-4 rounded-xl text-center transition-all ${
                activeCategory === "All"
                  ? "bg-blue-100 border-2 border-blue-300"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white p-2 flex items-center justify-center">
                <span className="text-2xl">👕</span>
              </div>
              <span className="font-medium text-foreground block mb-1">
                All Items
              </span>
              <span className="text-sm text-muted-foreground">
                {menProducts.length} items
              </span>
            </motion.button>

            {menCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
                onClick={() => setActiveCategory(category.name)}
                className={`p-4 rounded-xl text-center transition-all ${
                  activeCategory === category.name
                    ? "bg-blue-100 border-2 border-blue-300"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white p-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="font-medium text-foreground block mb-1">
                  {category.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {category.count} items
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid with Dark Theme */}
      <ProductGridSection
        title={
          activeCategory === "All" ? "All Men's Products" : `${activeCategory}`
        }
        products={filteredProducts}
        showFilters={true}
        theme="dark"
        filterOptions={{
          categories: ["Clothing", "Footwear", "Accessories", "Watches"],
          sizes: ["S", "M", "L", "XL", "XXL"],
          colors: ["Black", "Blue", "Gray", "White", "Navy"],
        }}
      />

      {/* Featured Brands Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Brands
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Discover premium brands that define men's fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Nike", "Adidas", "Levi's", "Tom Ford"].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-900">{brand[0]}</span>
                </div>
                <h3 className="font-semibold">{brand}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
