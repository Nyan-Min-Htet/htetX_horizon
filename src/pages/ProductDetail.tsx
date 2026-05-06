import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { productById } from "@/data/allProducts";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  type ProductItem = {
    name: string;
    price: number | string;
    originalPrice?: number | string;
    deliveryDays?: number;
    description?: string;
    specs?: { label: string; value: string }[];
    reviews?: { name: string; rating: number; text: string }[];
    images?: string[];
    image?: string;
    isNew?: boolean;
  };

  const product = productById.get(id) as unknown as ProductItem | undefined;

  // Hooks must run unconditionally
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "rev">("desc");

  const description = product?.description;
  const specs = product?.specs;
  const reviews = product?.reviews;

  const rawImages = product?.images;
  const images: string[] =
    Array.isArray(rawImages) && rawImages.length > 0
      ? [...rawImages]
      : product && product.image
        ? [product.image]
        : [];

  if (!product) return <p className="p-6 text-center">Product not found.</p>;

  const diffColor = product.isNew
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
        {/* ---------- Layout ---------- */}
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back button – always visible */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate(-1)}
            className="self-start mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="px-5 py-2">Back to Products</span>
          </Button>

          <div className="grid gap-8 md:grid-cols-[280px_1fr]">
            {/* ---------- LEFT SIDE – Image Carousel ---------- */}
            <div className="relative">
              {/* Main image */}
              <div className="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
                <motion.img
                  src={images[activeIdx]}
                  alt={`${product.name} view ${activeIdx + 1}`}
                  className="w-full h-full object-cover"
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Thumbnail strip (only if >1 image) */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`flex-shrink-0 w-10 h-10 rounded-md border-2 ${
                        activeIdx === i
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-label={`Image ${i + 1}`}
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

              {/* Optional navigation arrows */}
              <div className="absolute inset-y-0 flex items-center justify-between px-2 pointer-events-none">
                <button
                  onClick={() =>
                    setActiveIdx(
                      (activeIdx - 1 + images.length) % images.length,
                    )
                  }
                  className="p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                  aria-label="Previous"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveIdx((activeIdx + 1) % images.length)}
                  className="p-2 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                  aria-label="Next"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ---------- RIGHT SIDE – Info & Tabs ---------- */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-semibold text-blue-600">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* New / Regular badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full ${diffColor}`}
              >
                {product.isNew ? "New" : "Regular"}
              </div>

              {/* Delivery info */}
              <p className="text-sm text-gray-500 mt-1">
                {product.deliveryDays === 2
                  ? "Tomorrow"
                  : `${product.deliveryDays} days`}
              </p>

              {/* ---------- Tabs ---------- */}
              <div className="border-b border-gray-200 pb-2">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("desc")}
                    className={`
                    px-3 py-2 text-sm font-medium
                    ${
                      activeTab === "desc"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  `}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`
                    px-3 py-2 text-sm font-medium
                    ${
                      activeTab === "specs"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  `}
                  >
                    Specs
                  </button>
                  <button
                    onClick={() => setActiveTab("rev")}
                    className={`
                    px-3 py-2 text-sm font-medium
                    ${
                      activeTab === "rev"
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  `}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              {/* ---------- Tab Panels ---------- */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Description */}
                {activeTab === "desc" && (
                  <p className="text-gray-700 leading-relaxed">
                    {description ||
                      "Description coming soon – stay tuned for more details."}
                  </p>
                )}

                {/* Specs */}
                {activeTab === "specs" && (
                  <div className="space-y-2">
                    {specs?.length ? (
                      specs!.map((spec, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="font-medium">{spec.label}</span>
                          <span className="text-gray-600">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        No specifications available.
                      </p>
                    )}
                  </div>
                )}

                {/* Reviews */}
                {activeTab === "rev" && (
                  <>
                    {reviews?.length ? (
                      <div className="space-y-3">
                        {reviews!.map((rev, i) => (
                          <div
                            key={i}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium">{rev.name}</span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= rev.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600">{rev.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No reviews yet.</p>
                    )}
                  </>
                )}
              </motion.div>

              {/* ---------- Sticky CTA (desktop) ---------- */}
              <div className="hidden md:block">
                <Button
                  size="lg"
                  className="w-100 py-2 px-10 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* ---------- Mobile‑only sticky CTA ---------- */}
          <div className="relative md:hidden bg-white/90 backdrop-blur-sm p-4">
            <Button
              size="lg"
              className="w-100 bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </motion.section>
      <Footer />
    </>
  );
}
