/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [dbCart, setDbCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔔 ADD TOAST STATE
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // 📥 FETCH CART
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

      setDbCart(data || []);
    };

    fetchCart();
  }, []);

  // 💰 TOTAL
  const cartTotal = dbCart.reduce((sum, item) => {
    return sum + item.products.price * item.quantity;
  }, 0);

  // 🧾 PLACE ORDER
  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        showToast("Please login first");
        navigate("/login");
        return;
      }

      if (!form.fullName || !form.phone || !form.address) {
        showToast("Please fill all fields");
        setLoading(false);
        return;
      }

      if (dbCart.length === 0) {
        showToast("Cart is empty");
        setLoading(false);
        return;
      }

      // 🧾 CREATE ORDER
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: user.id,
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
        showToast(orderError?.message || "Order creation failed");
        setLoading(false);
        return;
      }

      // 📦 ORDER ITEMS
      const items = dbCart.map((item) => ({
        order_id: order.id,
        product_id: item.products.id,
        quantity: item.quantity,
        price: item.products.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

      if (itemsError) {
        showToast(itemsError.message);
        setLoading(false);
        return;
      }

      // 🧹 CLEAR CART
      await supabase.from("cart").delete().eq("user_id", user.id);

      setDbCart([]);
      setLoading(false);

      // ✅ SUCCESS TOAST
      showToast("Order placed successfully 🎉");

      setTimeout(() => {
        navigate(`/payment/${order.id}`);
      }, 1200);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      {/* 🔔 TOAST UI */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-400 text-white px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* LEFT FORM */}
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

          {/* RIGHT SUMMARY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-2xl shadow h-fit"
          >
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {dbCart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.products?.name} × {item.quantity}
                  </span>
                  <span>
                    ${(item.products?.price * item.quantity).toFixed(2)}
                  </span>
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
