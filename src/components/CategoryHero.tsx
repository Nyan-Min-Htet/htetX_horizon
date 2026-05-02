import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CategoryHeroProps {
  title: string;
  subtitle: string;
  image: string;
  theme: string;
  overlay?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function CategoryHero({
  title,
  subtitle,
  image,
  theme,
  overlay = "bg-black/30",
  ctaText = "Shop Now",
  onCtaClick,
}: CategoryHeroProps) {
  return (
    <section className={`relative py-28 ${theme} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${overlay}`} />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {onCtaClick && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                size="lg"
                className="gap-2 bg-white text-foreground hover:bg-gray-100"
                onClick={onCtaClick}
              >
                {ctaText}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background/10 backdrop-blur-sm"></div>
    </section>
  );
}
