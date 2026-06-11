import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard, Product } from "@/components/ProductCard";
import { ProductBanner } from "@/components/ProductBanner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

import bannerImg from "@/assets/banner-new-arrivals..jfif";

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchNewProducts();
  }, []);

  const fetchNewProducts = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_new", true); // ✅ ONLY NEW PRODUCTS

      if (error) {
        throw error;
      }

      setProducts((data as Product[]) || []);
    } catch (err) {
      console.error("❌ Failed to load new products:", err);
      setHasError(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <>
      <Header />

      <ProductBanner
        image={bannerImg}
        title="Fresh Drops"
        subtitle="Discover the newest gear for every lifestyle"
        ctaLabel="Shop New Arrivals"
        onCtaClick={() => {
          document
            .getElementById("new-arrivals-grid")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <section className="py-20 bg-background" id="new-arrivals-grid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADER */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold"
                variants={sectionVariants}
                custom={1}
              >
                New Arrivals
              </motion.h2>

              <motion.p
                className="text-muted-foreground"
                variants={sectionVariants}
                custom={2}
              >
                Latest products added to our store
              </motion.p>
            </div>

            <Button variant="outline">View All Products</Button>
          </motion.div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20 text-gray-500">
              Loading new arrivals...
            </div>
          )}

          {/* GRID */}
          {!loading && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-20 text-gray-500">
                No new arrivals at the moment
              </div>
            )
          )}

          {/* ERROR */}
          {hasError && (
            <div className="text-center text-red-500 mt-4">
              Failed to load products
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
