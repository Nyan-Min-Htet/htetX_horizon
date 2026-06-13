import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, User, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Link, useNavigate } from "react-router-dom";
import { SearchBox } from "./SearchBox";
import { useCart } from "@/components/CartContext";
import { supabase } from "@/lib/supabase";

export function Header() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "NewArrivals", to: "/NewArrivals" },
    { name: "Collections", to: "/collections" },
    { name: "Men", to: "/men" },
    { name: "Women", to: "/women" },
    { name: "Sale", to: "/sale", highlight: true },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  // 🔐 USER STATE
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user || null);
    };

    getUser();

    // listen auth changes (important)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2 font-bold text-xl md:text-2xl"
            >
              <span className="text-gradient-primary">HtetX</span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  highlight={link.highlight}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Search */}
            <SearchBox />

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-3 hover:bg-gray-200 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] px-1.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* 👤 AUTH BUTTON (IMPORTANT CHANGE) */}
              {user ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/dashboard")}
                  title="Dashboard"
                >
                  <User className="h-5 w-5 text-green-600" />
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div className="lg:hidden border-t">
                <nav className="flex flex-col p-4 gap-2">
                  {navLinks.map((link) => (
                    <NavLink key={link.name} to={link.to}>
                      {link.name}
                    </NavLink>
                  ))}

                  <div className="border-t pt-2 mt-2">
                    {user ? (
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Dashboard
                      </button>
                    ) : (
                      <Link to="/login" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Login
                      </Link>
                    )}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
