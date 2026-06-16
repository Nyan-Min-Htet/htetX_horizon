/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Heart,
  LogOut,
  Trash2,
  Mail,
  Calendar,
  ShoppingBag,
  Star,
  Package,
  Shield,
  ArrowRight,
  Phone,
  MapPin,
  Edit,
  Users,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserDetails {
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  zip_code?: string;
  bio?: string;
  avatar_url?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [toast, setToast] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  // 📥 LOAD ALL DATA ON MOUNT
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUser(data.user);

      // 👤 PROFILE
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        setName(profile.full_name || "");
        setEmail(profile.email || "");
      }

      // 📋 USER DETAILS (Personal Info)
      const { data: userDetails } = await supabase
        .from("user_details")
        .select("*")
        .eq("user_id", data.user.id)
        .single();

      if (userDetails) {
        setDetails(userDetails);
      }

      // 📦 ORDERS
      const { data: orderData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false });

      setOrders(orderData || []);

      // ❤️ FAVORITES
      const { data: favData } = await supabase
        .from("favorites")
        .select(`id, product_id, products (id, name, price, image, category)`)
        .eq("user_id", data.user.id);

      setFavorites(favData || []);
    };
    load();
  }, [navigate]);

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // ❌ REMOVE FAVORITE
  const removeFavorite = async (id: string) => {
    const { error } = await supabase.from("favorites").delete().eq("id", id);
    if (!error) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
      setToast("Removed from favorites");
      setTimeout(() => setToast(""), 3000);
    }
  };

  // 🖼️ AVATAR FALLBACK LETTER
  const avatarLetter = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() || "?";

  // 📅 JOIN DATE
  const joinDate = user
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const formatOrderId = (id: string) => {
    return `Order #${id.slice(0, 6).toUpperCase()}`;
  };

  const openOrder = async (order: any) => {
    setSelectedOrder(order);

    const { data } = await supabase
      .from("order_items")
      .select(
        `
        id,
        quantity,
        price,
        products (
          id,
          name,
          price,
          image
        )
      `,
      )
      .eq("order_id", order.id);

    setOrderItems(data || []);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* 🧾 TOAST NOTIFICATION */}
        {toast && (
          <div className="fixed top-24 right-5 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {toast}
          </div>
        )}

        {/* 🎨 HERO BANNER */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* AVATAR */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-bold shadow-2xl overflow-hidden">
                {details?.avatar_url ? (
                  <img
                    src={details.avatar_url}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  avatarLetter
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 border-4 border-white rounded-full"></div>
            </div>

            {/* USER INFO */}
            <div className="text-center md:text-left flex-1">
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                Welcome back,
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mt-1">
                {name || "Valued Customer"}
              </h1>
              <p className="text-blue-100 mt-2 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {email}
              </p>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white px-6 py-3 rounded-xl transition-all hover:scale-105"
            >
              <LogOut size={18} />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 -mt-8">
          {/* 📊 QUICK STATS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Favorites</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {favorites.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Heart className="w-7 h-7 text-red-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Member Since</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {joinDate}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Account Status</p>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    Verified
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* 📋 MAIN CONTENT GRID */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT: PROFILE & PERSONAL INFO */}
            <div className="lg:col-span-1 space-y-6">
              {/* ACCOUNT DETAILS CARD */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Account Details
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Full Name
                    </label>
                    <p className="text-gray-800 font-medium mt-1">
                      {name || "Not set"}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <p className="text-gray-800 font-medium mt-1 break-all text-sm">
                      {email}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      User ID
                    </label>
                    <p className="text-gray-600 font-mono text-xs mt-1 break-all">
                      {user?.id || "Loading..."}
                    </p>
                  </div>
                </div>
              </div>

              {/* PERSONAL INFORMATION CARD */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Personal Info
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {!details ? (
                    // 🆕 NO INFO YET - Show "Add" button
                    <div className="text-center py-6">
                      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-8 h-8 text-purple-300" />
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        No personal information added yet.
                      </p>
                      <Button
                        onClick={() => navigate("/complete-profile")}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Add Personal Info
                      </Button>
                    </div>
                  ) : (
                    // ✅ INFO EXISTS - Show view mode + Edit button
                    <>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-700">
                          {details.phone || "Not set"}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">
                          {[
                            details.address,
                            details.city,
                            details.zip_code,
                            details.country,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Not set"}
                        </span>
                      </div>

                      {details.bio && (
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500 italic">
                            "{details.bio}"
                          </p>
                        </div>
                      )}

                      <button
                        onClick={() =>
                          navigate("/complete-profile", {
                            state: { fromEdit: true },
                          })
                        }
                        className="mt-3 w-full bg-purple-50 hover:bg-purple-100 text-purple-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Personal Info
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 📦 ORDERS SECTION */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                    My Orders
                  </h2>
                  <span className="text-sm text-gray-500">
                    {orders.length} {orders.length === 1 ? "order" : "orders"}
                  </span>
                </div>

                <div className="p-6">
                  {orders.length === 0 ? (
                    <p className="text-gray-500 text-center py-10">
                      No orders yet
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          onClick={() => openOrder(order)}
                          className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:shadow-md transition"
                        >
                          <div className="flex justify-between items-center">
                            {/* LEFT */}
                            <div>
                              <p className="font-semibold text-gray-800">
                                {formatOrderId(order.id)}
                              </p>

                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(order.created_at).toLocaleString()}
                              </p>
                            </div>

                            {/* RIGHT */}
                            <div className="text-right">
                              <p className="font-bold">
                                ${order.total_amount.toFixed(2)}
                              </p>

                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  order.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : order.status === "completed"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-blue-100 text-blue-700"
                                }`}
                              >
                                {order.status}
                              </span>

                              {order.status === "pending" && (
                                <button
                                  onClick={() =>
                                    navigate(`/payment/${order.id}`)
                                  }
                                  className="text-xs px-3 py-2 my-2 bg-green-600 text-white rounded-full"
                                >
                                  Make as Paid
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 🚀 QUICK ACTION CARD */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                <ShoppingBag className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-lg font-bold">Continue Shopping</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Explore our latest collection of premium products.
                </p>
                <button
                  onClick={() => navigate("/NewArrivals")}
                  className="mt-4 w-full bg-white text-gray-900 font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* RIGHT: FAVORITES / WISHLIST */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    My Wishlist
                  </h2>
                  <span className="text-sm text-gray-500">
                    {favorites.length}{" "}
                    {favorites.length === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="p-6">
                  {favorites.length === 0 ? (
                    // 💔 EMPTY STATE
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        No favorites yet
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 mb-4">
                        Start adding products you love!
                      </p>
                      <Button
                        onClick={() => navigate("/new-arrivals")}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Discover Products
                      </Button>
                    </div>
                  ) : (
                    // ❤️ FAVORITES GRID
                    <div className="grid sm:grid-cols-2 gap-4">
                      {favorites.map((f) => (
                        <div
                          key={f.id}
                          className="group relative border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all"
                        >
                          {/* Product Image with Remove Button */}
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={f.products?.image}
                              alt={f.products?.name}
                              className="w-full h-50 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              onClick={() => removeFavorite(f.id)}
                              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                              title="Remove from wishlist"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          {/* Product Info */}
                          <div className="mt-3 space-y-1">
                            <p className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">
                              {f.products?.category}
                            </p>
                            <h3 className="font-semibold text-gray-800 line-clamp-1">
                              {f.products?.name}
                            </h3>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-lg font-bold text-gray-900">
                                ${f.products?.price}
                              </p>
                              <div className="flex items-center gap-1 text-amber-400">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span className="text-xs text-gray-600">
                                  4.8
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              navigate(`/product/${f.products?.id}`)
                            }
                            className="w-full mt-3 bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                          >
                            View Product
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Order Details</h2>

            <div className="space-y-3">
              {orderItems.length === 0 ? (
                <p className="text-gray-500">No items found</p>
              ) : (
                orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border p-2 rounded-lg"
                  >
                    {/* FIXED IMAGE */}
                    <img
                      src={item.products?.image}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div className="flex-1">
                      {/* FIXED NAME */}
                      <p className="text-sm font-medium">
                        {item.products?.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* FIXED PRICE */}
                    <p className="font-bold text-sm">${item.products?.price}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
