/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function CartPage() {
  const navigate = useNavigate();

  const [showAuthModal, setShowAuthModal] = useState(false);

  const [cartItems, setCartItems] = useState<any[]>([]);

  const cartTotal = cartItems.reduce((sum, item) => {
    return sum + item.products.price * item.quantity;
  }, 0);

  const clearCart = async () => {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", userData.user.id);

    if (!error) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const { data } = await supabase
        .from("cart")
        .select(
          `
        id,
        quantity,
        products (
          id,
          name,
          price,
          image
        )
      `,
        )
        .eq("user_id", userData.user.id);

      setCartItems(data || []);
    };

    fetchCart();
  }, []);

  const removeFromCart = async (id: string) => {
    const { error } = await supabase.from("cart").delete().eq("id", id);

    if (!error) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateQuantity = async (
    id: string,
    type: "inc" | "dec",
    currentQty: number,
  ) => {
    const newQty = type === "inc" ? currentQty + 1 : currentQty - 1;

    if (newQty < 1) return; // မနည်းစေချင်ရင်

    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQty })
      .eq("id", id);

    if (!error) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQty } : item,
        ),
      );
    }
  };

  const handleCheckout = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    navigate("/checkout");
  };

  return (
    <>
      <Header />
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-[90%] max-w-md rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-blue-600" />
              </div>

              <h2 className="text-2xl font-bold mb-2">Login Required</h2>

              <p className="text-gray-500 mb-8">
                Please login or create an account to continue your checkout.
              </p>

              <div className="space-y-3">
                <Button
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => navigate("/signup")}
                >
                  Create Account
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowAuthModal(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-16 min-h-screen bg-background"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-foreground">
              Your Shopping Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-xl text-gray-500 mb-6">Your cart is empty!</p>
              <Button
                onClick={() => (window.location.href = "/NewArrivals")}
                className="bg-blue-600 text-white"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-white rounded-2xl border shadow-sm"
                  >
                    <img
                      src={item.products?.image}
                      className="w-full sm:w-24 h:48 sm:h-24 rounded-xl object-cover"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.products?.name}
                      </h3>
                      <p className="text-blue-600 font-bold">
                        ${item.products?.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, "dec", item.quantity)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            updateQuantity(item.id, "inc", item.quantity)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white p-8 rounded-3xl border shadow-lg h-fit sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 py-6 rounded-xl text-lg"
                >
                  Checkout Now
                </Button>
                <Button
                  variant="ghost"
                  className="w-full mt-3 text-gray-500"
                  onClick={clearCart}
                >
                  Empty Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.section>
      <Footer />
    </>
  );
}
