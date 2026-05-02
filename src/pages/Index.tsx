import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ProductGrid } from "@/components/ProductGrid";
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
        <ProductGrid title="Featured Products" products={staticProducts} />
        <FeaturedBanner />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
