import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Phone,
  MapPin,
  Home,
  User,
  Camera,
  ArrowRight,
  Globe,
  Hash,
  Upload,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔐 STATE
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);

  // 🔔 TOAST STATE (Replaces ugly alerts)
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // 📝 FORM STATE
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [existingAvatarUrl, setExistingAvatarUrl] = useState<string>("");

  // 🔄 INITIALIZE & LOAD EXISTING DATA
  useEffect(() => {
    const initialize = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUserId(data.user.id);

      // Check if we are in "Edit Mode"
      const isFromEdit = location.state?.fromEdit === true;
      setIsEditMode(isFromEdit);

      // Load existing user details (using maybeSingle to avoid errors)
      const { data: existing } = await supabase
        .from("user_details")
        .select("*")
        .eq("user_id", data.user.id)
        .maybeSingle(); // ✅ FIXED: Won't throw if no row exists

      if (existing) {
        setFormData({
          phone: existing.phone || "",
          address: existing.address || "",
          city: existing.city || "",
          country: existing.country || "",
          zipCode: existing.zip_code || "",
          bio: existing.bio || "",
        });
        if (existing.avatar_url) {
          setAvatarPreview(existing.avatar_url);
          setExistingAvatarUrl(existing.avatar_url);
        }
      }
    };
    initialize();
  }, [navigate, location.state]);

  // 🖼️ HANDLE AVATAR SELECTION
  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setToast({ message: "Please select an image file", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setToast({ message: "File size must be under 2MB", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // ☁️ UPLOAD AVATAR TO STORAGE
  const uploadAvatar = async (uid: string): Promise<string | null> => {
    if (!avatarFile) return null;
    setUploading(true);

    try {
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${uid}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile, { upsert: true });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setUploading(false);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      setUploading(false);
      return urlData.publicUrl;
    } catch (err) {
      console.error("Avatar upload failed:", err);
      setUploading(false);
      return null;
    }
  };

  // 🗑️ REMOVE AVATAR
  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
    setExistingAvatarUrl("");
  };

  // 💾 HANDLE SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setToast({ message: "User not authenticated", type: "error" });
      return;
    }

    setLoading(true);

    try {
      // 1. Upload avatar if new file selected
      let avatarUrl: string | null = existingAvatarUrl;
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(userId);
        if (!uploadedUrl) {
          setToast({
            message: "Avatar upload failed. Please try again.",
            type: "error",
          });
          setTimeout(() => setToast(null), 3000);
          setLoading(false);
          return;
        }
        avatarUrl = uploadedUrl;
      }

      // 2. Build the data payload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dataToSave: any = {
        user_id: userId,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        zip_code: formData.zipCode,
        bio: formData.bio,
        updated_at: new Date().toISOString(),
      };

      // Only include avatar_url if we have a new or existing one
      if (avatarUrl) {
        dataToSave.avatar_url = avatarUrl;
      }

      // 3. ✅ UPSERT with onConflict (THE CRITICAL FIX)
      const { error: dbError } = await supabase
        .from("user_details")
        .upsert(dataToSave, {
          onConflict: "user_id", // 👈 This tells Supabase what to check
        });

      if (dbError) throw dbError;

      // ✅ Success!
      setToast({
        message: isEditMode
          ? "Profile updated successfully!"
          : "Profile completed successfully!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: any = err;
      setToast({
        message: error.message || "An unexpected error occurred",
        type: "error",
      });
      setTimeout(() => setToast(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  // ➡️ NEXT STEP VALIDATION
  const nextStep = () => {
    if (step === 1 && !formData.phone) {
      setToast({ message: "Please enter your phone number", type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setStep(step + 1);
  };

  return (
    <>
      <Header />

      {/* 🔔 TOAST NOTIFICATION */}
      {toast && (
        <div
          className={`fixed top-24 right-5 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2 ${
            toast.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          {toast.message}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {/* PROGRESS BAR */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                {isEditMode ? "Editing Profile" : `Step ${step} of 2`}
              </span>
              <span className="text-sm text-gray-500">
                {isEditMode ? "Update your information" : "Almost there!"}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* MAIN CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            {/* 📸 AVATAR UPLOAD SECTION */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    {uploading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Camera className="w-7 h-7 text-white" />
                    )}
                  </div>
                </div>

                <div className="absolute -bottom-1 -right-1 w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <Upload className="w-4 h-4 text-white" />
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarSelect}
                className="hidden"
              />

              <div className="mt-3 flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  {uploading
                    ? "Uploading..."
                    : isEditMode
                      ? "Click to change profile picture"
                      : "Click to upload profile picture"}
                </p>
                {avatarPreview && !uploading && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {step === 1 ? "Contact Information" : "Address Details"}
              </h1>
              <p className="text-gray-500 mt-2">
                {step === 1
                  ? "How can we reach you?"
                  : "Where should we deliver your orders?"}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Bio
                    </label>
                    <textarea
                      placeholder="Tell us a bit about yourself..."
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition resize-none"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="123 Main Street, Apt 4B"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="New York"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="10001"
                          value={formData.zipCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              zipCode: e.target.value,
                            })
                          }
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 h-12 rounded-xl"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || uploading}
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold"
                    >
                      {loading
                        ? "Saving..."
                        : isEditMode
                          ? "Save Changes"
                          : "Complete Profile"}
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Skip for now →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
