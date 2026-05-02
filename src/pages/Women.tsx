import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGridSection } from "@/components/ProductGridSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, TrendingUp } from "lucide-react";
import { womenProducts } from "@/data/womenProducts";
import { useState } from "react";

const womenCategories = [
  {
    name: "Dresses",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
    count: womenProducts.filter((p) => p.category === "Dresses").length,
    color: "bg-pink-50",
  },
  {
    name: "Tops",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=300&fit=crop",
    count: womenProducts.filter((p) => p.category === "Tops").length,
    color: "bg-purple-50",
  },
  {
    name: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop",
    count: womenProducts.filter((p) => p.category === "Bottoms").length,
    color: "bg-blue-50",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1590649880760-2d4b0f523de7?w=400&h=300&fit=crop",
    count: womenProducts.filter((p) => p.category === "Accessories").length,
    color: "bg-amber-50",
  },
];

export default function Women() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? womenProducts
      : womenProducts.filter((product) => product.category === activeCategory);

  return (
    <>
      <Header />

      {/* Hero Section - Elegant & Feminine */}
      <CategoryHero
        title="Women's Collection"
        subtitle="Where elegance meets comfort"
        image="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&h=600&fit=crop"
        theme="bg-gradient-to-r from-pink-50 to-purple-50"
        overlay="bg-pink-900/10"
      />

      {/* Trending Now */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-pink-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Trending Now
              </h2>
            </div>
            <p className="text-muted-foreground">
              Discover what's hot in women's fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50"
            >
              <Sparkles className="h-8 w-8 text-pink-400 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                Summer Essentials
              </h3>
              <p className="text-muted-foreground text-sm">
                Light and breezy styles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50"
            >
              <Heart className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                Customer Favorites
              </h3>
              <p className="text-muted-foreground text-sm">Most loved pieces</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50"
            >
              <TrendingUp className="h-8 w-8 text-amber-400 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                New Arrivals
              </h3>
              <p className="text-muted-foreground text-sm">
                Fresh styles just in
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.button
              key="all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setActiveCategory("All")}
              className={`p-6 rounded-2xl text-center transition-all ${
                activeCategory === "All"
                  ? "ring-2 ring-pink-300 transform scale-105 bg-white"
                  : "hover:shadow-lg bg-white"
              }`}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-pink-50 p-3 flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <span className="font-semibold text-foreground block mb-2">
                All Items
              </span>
              <span className="text-sm text-muted-foreground">
                {womenProducts.length} items
              </span>
            </motion.button>

            {womenCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
                onClick={() => setActiveCategory(category.name)}
                className={`p-6 rounded-2xl text-center transition-all ${
                  activeCategory === category.name
                    ? "ring-2 ring-pink-300 transform scale-105"
                    : "hover:shadow-lg"
                } ${category.color}`}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white p-3 shadow-inner">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="font-semibold text-foreground block mb-2">
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

      {/* Products Grid with Light Theme */}
      <ProductGridSection
        title={
          activeCategory === "All" ? "Women's Collection" : `${activeCategory}`
        }
        products={filteredProducts}
        showFilters={true}
        theme="light"
        filterOptions={{
          categories: ["Dresses", "Tops", "Bottoms", "Accessories", "Footwear"],
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: ["Black", "White", "Pink", "Blue", "Green", "Pattern"],
        }}
      />

      {/* Special Offer Banner */}
      <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Special Offer
            </h2>
            <p className="text-xl mb-8 opacity-90">
              20% OFF on all dresses this week
            </p>
            <Button size="lg" variant="secondary" className="gap-2">
              Shop Now
              <Sparkles className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
