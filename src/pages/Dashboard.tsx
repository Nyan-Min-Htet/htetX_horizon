import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, LogOut, Trash2 } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  // 🔐 LOAD DATA
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        navigate("/login");
        return;
      }

      setUser(data.user);

      // PROFILE
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profile) {
        setName(profile.full_name || "");
        setEmail(profile.email || "");
      }

      // ❤️ FAVORITES + PRODUCT DETAILS (JOIN)
      const { data: favData } = await supabase
        .from("favorites")
        .select(
          `
          id,
          product_id,
          products (
            id,
            name,
            price,
            image,
            category
          )
        `,
        )
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
    }
  };

  // ✏️ UPDATE PROFILE
  const updateProfile = async () => {
    setLoading(true);

    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: name,
        email: email.trim(),
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setToast("Profile updated successfully!");
  };
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
        {/* TOAST */}
        {toast && (
          <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-xl shadow-lg">
            {toast}
          </div>
        )}

        <div className="max-w-5xl mx-auto space-y-8">
          {/* TITLE */}
          <h1 className="text-4xl font-bold text-gray-800">👤 My Dashboard</h1>

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold">Profile</h2>

              <input
                className="w-full border p-3 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />

              <input
                className="w-full border p-3 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <button
                onClick={updateProfile}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>

            {/* ACCOUNT CARD */}
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <h2 className="text-xl font-semibold">Account</h2>

              <div className="text-gray-600 text-sm">Logged in as:</div>

              <div className="font-medium">{email}</div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* FAVORITES SECTION */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Heart className="text-red-500" />
              Favorites
            </h2>

            {favorites.length === 0 ? (
              <p className="text-gray-500 mt-4">No favorite products yet 💔</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {favorites.map((f) => (
                  <div key={f.id} className="border rounded-xl p-3 space-y-2">
                    <img
                      src={f.products?.image}
                      className="w-full h-50 object-cover rounded-lg"
                    />

                    <div className="font-semibold">{f.products?.name}</div>

                    <div className="text-sm text-gray-500">
                      ${f.products?.price}
                    </div>

                    <button
                      onClick={() => removeFavorite(f.id)}
                      className="flex items-center gap-1 text-red-500 text-sm"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
