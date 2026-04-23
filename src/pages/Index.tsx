import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductCard } from "@/components/ProductCard";
import { FeaturedBanner } from "@/components/FeaturedBanner";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { staticProducts } from "@/data/staticProducts";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Hero />
        <Categories />

        {/* ✅ FIXED PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {staticProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <FeaturedBanner />
        <Features />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
