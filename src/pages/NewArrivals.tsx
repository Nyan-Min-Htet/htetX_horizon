import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard, Product } from "@/components/ProductCard";
import { ProductBanner } from "@/components/ProductBanner";
import { Button } from "@/components/ui/button";
// import { AddProductModal } from "@/components/AddProductModal";

import bannerImg from "@/assets/banner-new-arrivals..jfif";
import { staticProducts } from "@/data/staticProducts";

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined"
          ? localStorage.getItem("newArrivalsCustom")
          : null;
      const custom: Product[] = saved ? JSON.parse(saved) : [];
      setProducts([...staticProducts, ...custom]);
    } catch (e) {
      console.error("❌ Failed to load New Arrivals data:", e);
      setHasError(true);
      setProducts(staticProducts);
    }
  }, []);

  // ---- 2️⃣   MODAL state ----
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  // When the modal returns a brand‑new product, prepend it to the list
  // const handleAddProduct = (newProd: Product) =>
  //   setProducts((prev) => [newProd, ...prev]);
  const newProducts = products.filter((p) => p.isNew);

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
          const el = document.getElementById("new-arrivals-grid");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Main grid & title */}
      <section className="py-20 bg-background" id="new-arrivals-grid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* – Title + “Add New” button – */}
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
                className="text-3xl md:text-4xl font-bold text-foreground mb-2"
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
                Hand‑picked fresh releases – just added to our catalog.
              </motion.p>
            </div>

            <div className="flex gap-4">
              {/* <Button onClick={openModal}>Add New Product</Button> */}
              <Button variant="outline">View All Products</Button>
            </div>
          </motion.div>

          {/* ---------- GRID ---------- */}
          {newProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {newProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              No new arrivals at the moment – check back soon!
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Add‑Product modal (always rendered, hidden when closed) */}
      {/* <AddProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddProduct}
      /> */}
    </>
  );
}
