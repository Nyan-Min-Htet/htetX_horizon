import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductGridSection } from "@/components/ProductGridSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { collectionsData } from "@/data/collectionsData";
import { useState } from "react";

export default function Collections() {
  const [activeCollection, setActiveCollection] = useState("All");

  return (
    <>
      <Header />

      {/* Hero Section */}
      <CategoryHero
        title="Collections"
        subtitle="Discover our curated categories"
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
        theme="bg-gradient-to-r from-purple-50 to-blue-50"
      />

      {/* Collections Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Browse Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully organized collections to find exactly what
              you're looking for
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {collectionsData.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl ${collection.theme} p-8 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="relative h-48 mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground font-medium">
                      {collection.products.length} items
                    </span>
                    <Button
                      variant="ghost"
                      className="gap-2 group-hover:bg-white"
                      onClick={() => setActiveCollection(collection.name)}
                    >
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Featured Products from Selected Collection */}
          {activeCollection !== "All" && (
            <ProductGridSection
              title={activeCollection}
              products={
                collectionsData.find((c) => c.name === activeCollection)
                  ?.products || []
              }
              showFilters={true}
              theme="light"
            />
          )}

          {/* All Products */}
          {activeCollection === "All" && (
            <ProductGridSection
              title="All Collections"
              products={collectionsData.flatMap((c) => c.products)}
              showFilters={true}
              theme="light"
            />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
