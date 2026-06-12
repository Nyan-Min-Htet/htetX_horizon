import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { useCart } from "@/components/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  image: string;
  rating?: number | null;
  reviews?: number | null;
  category?: string | null;
  is_new?: boolean;
  is_sustainable?: boolean;
  delivery_days?: number | null;
  description?: string | null;
  specs?: {
    label: string;
    value: string;
  }[];

  reviews_data?: {
    name: string;
    rating: number;
    text: string;
  }[];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase error:", error.message);
          setProduct(null);
          return;
        }

        setProduct(data as Product);
      } catch (err) {
        console.error("Fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Product not found</p>
      </div>
    );
  }

  const badgeColor = product.is_new
    ? "bg-green-500 text-white"
    : "bg-gray-200 text-gray-800";

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <>
      <Header />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 min-h-screen bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate(-1)}
            className="mb-8 flex items-center gap-2 h-10"
          >
            <ArrowLeft className="h-10 w-10" />
            Back
          </Button>

          <div className="grid gap-10 md:grid-cols-[350px_1fr]">
            {/* Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Name + Price */}
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>

                <div className="flex items-center gap-3 mt-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>

                  {product.original_price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.original_price}
                    </span>
                  )}
                </div>
              </div>

              {/* Badge */}
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}
              >
                {product.is_new ? "New Arrival" : "In Stock"}
              </div>

              {/* Delivery */}
              <p className="text-sm text-gray-500">
                {product.delivery_days
                  ? product.delivery_days === 2
                    ? "Ships Tomorrow"
                    : `Ships in ${product.delivery_days} days`
                  : "Shipping info unavailable"}
              </p>

              {/* Category */}
              {product.category && (
                <p className="text-sm text-gray-400 uppercase">
                  {product.category}
                </p>
              )}

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>

              {/* Specifications */}
              {product.specs && product.specs.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Specifications</h3>

                  <div className="rounded-xl border border-gray-200 overflow-hidden">
                    {product.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between px-4 py-3 border-b last:border-b-0"
                      >
                        <span className="font-medium text-gray-600">
                          {spec.label}
                        </span>

                        <span className="text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              {product.reviews_data && product.reviews_data.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-4 text-lg">
                    Customer Reviews
                  </h3>

                  <div className="space-y-4">
                    {product.reviews_data.map((review, index) => (
                      <div key={index} className="border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>

                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-500">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price summary box */}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  className="w-full align-center bg-blue-600 hover:bg-blue-700 text-white py-7 text-lg first-letter:uppercase"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
