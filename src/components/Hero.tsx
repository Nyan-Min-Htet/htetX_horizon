import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Abstract futuristic shapes"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="h-4 w-4" />
            New Collection 2026
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground mb-6"
          >
            Shop the <span className="text-gradient-primary">Future</span>
            <br />
            of Style
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg"
          >
            Discover curated collections powered by AI. Premium quality,
            sustainable choices, delivered to your door.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button variant="hero" size="xl">
              Explore Collection
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="glass" size="xl">
              View Lookbook
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-2 rounded-xl bg-secondary">
                <Truck className="h-4 w-4 text-accent" />
              </div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-2 rounded-xl bg-secondary">
                <ShieldCheck className="h-4 w-4 text-accent" />
              </div>
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="p-2 rounded-xl bg-secondary">
                <Leaf className="h-4 w-4 text-accent" />
              </div>
              <span>Sustainable</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute bottom-10 right-10 hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-24 h-24 rounded-3xl bg-primary/20 backdrop-blur-xl border border-primary/10" />
      </motion.div>
      <motion.div
        className="absolute top-1/4 right-1/4 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div className="w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-xl border border-accent/10" />
      </motion.div>
    </section>
  );
}
