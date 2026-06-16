/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [method, setMethod] = useState("kbzpay");
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState("");
  const [toast, setToast] = useState("");

  // 📥 FETCH ORDER
  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      setOrder(data);
    };

    fetchOrder();
  }, [orderId]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  // 💳 PAYMENT SUBMIT
  const handlePay = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const transactionId =
      method.toUpperCase() + "-" + Math.random().toString(36).substring(2, 10);

    const { error } = await supabase.from("payments").insert([
      {
        order_id: orderId,
        user_id: userData.user.id,
        amount: order.total_amount,
        method,
        status: "pending",
        transaction_id: transactionId,
        proof_image: proof,
      },
    ]);

    if (error) {
      setLoading(false);
      showToast("❌ Payment failed");
      return;
    }

    await supabase.from("orders").update({ status: "paid" }).eq("id", orderId);

    setLoading(false);

    showToast("🎉 Payment successful!");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
  };

  if (!order) return <p className="p-10">Loading...</p>;

  return (
    <>
      <Header />

      {/* 🔔 TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed top-6 right-6 bg-green-400 text-white px-5 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          {toast}
        </div>
      )}

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>

          {/* 💰 ORDER INFO */}
          <div className="mb-4 text-sm space-y-1">
            <p>Order ID: {order.id}</p>
            <p>Total: ${order.total_amount}</p>
          </div>

          {/* 💳 METHODS */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <button
              onClick={() => setMethod("kbzpay")}
              className={`p-2 border rounded ${
                method === "kbzpay" ? "bg-green-100 border-green-500" : ""
              }`}
            >
              KBZPay
            </button>

            <button
              onClick={() => setMethod("wavepay")}
              className={`p-2 border rounded ${
                method === "wavepay" ? "bg-blue-100 border-blue-500" : ""
              }`}
            >
              WavePay
            </button>

            <button
              onClick={() => setMethod("bank")}
              className={`p-2 border rounded ${
                method === "bank" ? "bg-gray-100 border-gray-500" : ""
              }`}
            >
              Bank
            </button>
          </div>

          {/* 🏦 BANK INFO */}
          {method === "bank" && (
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="text-sm">Bank Account:</p>
              <p className="font-bold">KBZ Bank - 123456789</p>
              <p className="text-xs text-gray-500">Name: Your Shop</p>
            </div>
          )}

          {/* 📸 PROOF INPUT */}
          <input
            placeholder="Payment Screenshot / Transaction ID"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) => setProof(e.target.value)}
          />

          {/* 🔘 ACTION BUTTONS */}
          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>

          {/* ⏳ PAY LATER BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full mt-3 text-gray-600 hover:text-black"
          >
            Pay Later
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
