import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } =
    useCart();

  return (
    <>
      <Header />
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

          {cart.length === 0 ? (
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
              {/* Left: Item List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center gap-6 p-4 bg-white rounded-2xl border shadow-sm"
                  >
                    <img
                      src={item.image}
                      className="w-24 h-24 rounded-xl object-cover"
                      alt={item.name}
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-blue-600 font-bold">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
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
                          updateQuantity(item.id, item.quantity + 1)
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

                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-6 rounded-xl text-lg">
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
