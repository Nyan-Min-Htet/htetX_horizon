import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { productById } from "@/data/allProducts";
import { Product } from "@/components/ProductCard";

interface DetailedProduct extends Product {
  images?: string[];
  description?: string;
  specs?: { label: string; value: string }[];
  reviewsData?: { name: string; rating: number; text: string }[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = productById.get(id) as DetailedProduct | undefined;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "description" | "specifications" | "reviews"
  >("description");

  if (!product) {
    return (
      <>
        <Header />
        <section className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-center text-xl text-muted-foreground">
            Product not found. Please check the URL or return to{" "}
            <a href="/" className="text-blue-600 underline">
              home
            </a>
            .
          </p>
        </section>
        <Footer />
      </>
    );
  }

  const images =
    product.images && Array.isArray(product.images)
      ? product.images
      : [product.image];

  const description =
    product.description ||
    "Detailed product description coming soon. Please check back for more information.";
  const specs = product.specs || [];
  const reviews = product.reviewsData || [];

  const badgeColor = product.isNew
    ? "bg-green-500 text-white"
    : "bg-gray-200 text-gray-800";

  return (
    <>
      <Header />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 min-h-screen bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium py-3">Back to Products</span>
          </Button>

          {/* Main Layout Grid */}
          <div className="grid gap-8 md:grid-cols-[350px_1fr]">
            {/* LEFT SIDE: Image Carousel */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
                <motion.img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`flex-shrink-0 w-12 h-12 rounded-md border-2 transition-all ${
                        activeImageIndex === i
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover rounded-md"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}
              >
                {product.isNew ? "New Arrival" : "In Stock"}
              </div>

              {/* TABS */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-6">
                  {(["description", "specifications", "reviews"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium transition-all ${
                          activeTab === tab
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* TAB CONTENT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-[200px]"
              >
                {activeTab === "description" && (
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                )}
                {activeTab === "specifications" && (
                  <div className="space-y-2">
                    {specs.length > 0 ? (
                      specs.map((s, i) => (
                        <div
                          key={i}
                          className="flex justify-between py-2 border-b border-gray-100 text-sm"
                        >
                          <span className="font-medium text-gray-600">
                            {s.label}
                          </span>
                          <span className="text-foreground">{s.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">
                        No specs available.
                      </p>
                    )}
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {reviews.length > 0 ? (
                      reviews.map((rev, i) => (
                        <div
                          key={i}
                          className="p-4 border rounded-xl bg-gray-50"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-bold">{rev.name}</span>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, s) => (
                                <Star
                                  key={s}
                                  className={`h-3 w-3 ${s < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{rev.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No reviews yet.</p>
                    )}
                  </div>
                )}
              </motion.div>

              <Button
                size="lg"
                className="w-100 bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </>
  );
}
