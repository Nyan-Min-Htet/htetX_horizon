import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ProductBanner({
  image,
  title,
  subtitle,
  ctaLabel = "Shop Now",
  onCtaClick,
}: {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}) {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        initial={{ scale: 1.02 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text content */}
      <div className="relative container mx-auto flex flex-col items-center justify-center min-h-[32rem] px-4 py-20 text-center text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>

        {ctaLabel && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45 }}
          >
            <Button
              size="lg"
              onClick={onCtaClick}
              className="bg-primary hover:bg-primary/90 m-5 p-4"
            >
              {ctaLabel}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
