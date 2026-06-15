import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      // ❗ basic validation
      if (!form.fullName || !form.phone || !form.address) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        setLoading(false);
        return;
      }

      // 1. create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id, // ✅ MUST be UUID
            total_amount: cartTotal,
            status: "pending",
            full_name: form.fullName,
            phone: form.phone,
            address: form.address,
          },
        ])
        .select()
        .single();

      if (orderError || !order) {
        console.log(orderError);
        alert(orderError?.message || "Order creation failed");
        setLoading(false);
        return;
      }

      // 2. insert order items
      const items = cart.map((item) => ({
        order_id: order.id,
        product_id: String(item.id), // ❗ check this type
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) {
        console.log(itemsError);
        alert(itemsError.message);
        setLoading(false);
        return;
      }

      // 3. success cleanup
      clearCart();
      setLoading(false);

      alert("Order placed successfully 🎉");
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      alert("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* LEFT - FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

            <div className="space-y-4">
              <input
                placeholder="Full Name"
                className="w-full border p-3 rounded-xl"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />

              <input
                placeholder="Phone Number"
                className="w-full border p-3 rounded-xl"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <textarea
                placeholder="Full Address"
                className="w-full border p-3 rounded-xl h-28"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
          </motion.div>

          {/* RIGHT - ORDER SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-2xl shadow h-fit"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
