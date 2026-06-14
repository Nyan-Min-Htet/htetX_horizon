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
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUser(data.user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        setName(profile.full_name || "");
        setEmail(profile.email || "");
      }

      const { data: favData } = await supabase
        .from("favorites")
        .select(`id, product_id, products (id, name, price, image, category)`)
        .eq("user_id", data.user.id);

      setFavorites(favData || []);
    };
    load();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const removeFavorite = async (id: string) => {
    const { error } = await supabase.from("favorites").delete().eq("id", id);
    if (!error) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
      setToast("Removed from favorites");
      setTimeout(() => setToast(""), 3000);
    }
  };

  // Get the first letter of the name for the avatar
  const avatarLetter = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  // Format the join date
  const joinDate = user
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* TOAST NOTIFICATION */}
        {toast && (
          <div className="fixed top-24 right-5 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {toast}
          </div>
        )}

        {/* HERO BANNER SECTION */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            {/* AVATAR */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-4 border-white/30 flex items-center justify-center text-5xl font-bold shadow-2xl">
                {avatarLetter}
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
          {/* QUICK STATS GRID */}
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

          {/* MAIN CONTENT GRID */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* LEFT: PROFILE INFORMATION (View Only) */}
            <div className="lg:col-span-1 space-y-6">
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
                    <p className="text-gray-800 font-medium mt-1 break-all">
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
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    To update your information, please use the Account Settings.
                  </p>
                </div>
              </div>

              {/* QUICK ACTION CARD */}
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

            {/* RIGHT: FAVORITES SECTION */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    My Wishlist
                  </h2>
                  <span className="text-sm text-gray-500">
                    {favorites.length} items
                  </span>
                </div>

                <div className="p-6">
                  {favorites.length === 0 ? (
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
                      <button
                        onClick={() => navigate("/new-arrivals")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Discover Products
                      </button>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {favorites.map((f) => (
                        <div
                          key={f.id}
                          className="group relative border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all"
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            <img
                              src={f.products?.image}
                              className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                              alt={f.products?.name}
                            />
                            <button
                              onClick={() => removeFavorite(f.id)}
                              className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="mt-3 space-y-1">
                            <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
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
      <Footer />
    </>
  );
}
