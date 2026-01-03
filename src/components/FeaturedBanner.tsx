import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedBanner() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-foreground to-foreground/90 p-8 md:p-12 lg:p-16"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium mb-6"
            >
              Limited Edition
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-background leading-tight mb-4"
            >
              The Future Collection
              <br />
              <span className="text-primary">Has Arrived</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-background/70 text-lg mb-8 max-w-md"
            >
              Explore our most innovative collection yet. Sustainable materials 
              meet cutting-edge design in this exclusive drop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                variant="hero"
                size="xl"
                className="bg-background text-foreground hover:bg-background/90"
              >
                Discover Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>

          {/* Floating Shapes */}
          <motion.div
            className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-40 h-40 rounded-3xl border-2 border-primary/30 bg-primary/10 backdrop-blur-sm" />
          </motion.div>
          <motion.div
            className="absolute right-32 bottom-10 hidden lg:block"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-20 h-20 rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-sm" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
