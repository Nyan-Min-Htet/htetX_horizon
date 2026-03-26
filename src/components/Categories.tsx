import { motion } from "framer-motion";
import { Sparkles, Zap, TrendingUp, Heart } from "lucide-react";

const categories = [
  {
    name: "New Arrivals",
    description: "Fresh drops weekly",
    icon: Sparkles,
    color: "primary" as const,
    count: 128,
  },
  {
    name: "Best Sellers",
    description: "Most loved items",
    icon: Heart,
    color: "highlight" as const,
    count: 64,
  },
  {
    name: "Flash Deals",
    description: "Limited time offers",
    icon: Zap,
    color: "accent" as const,
    count: 23,
  },
  {
    name: "Trending",
    description: "AI-picked for you",
    icon: TrendingUp,
    color: "primary" as const,
    count: 89,
  },
];

const colorStyles = {
  primary: {
    bg: "bg-primary/10",
    icon: "text-primary",
    hover: "hover:bg-primary/15",
  },
  accent: {
    bg: "bg-accent/10",
    icon: "text-accent",
    hover: "hover:bg-accent/15",
  },
  highlight: {
    bg: "bg-highlight/10",
    icon: "text-highlight",
    hover: "hover:bg-highlight/15",
  },
};

export function Categories() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const styles = colorStyles[category.color];
            const Icon = category.icon;

            return (
              <motion.a
                key={category.name}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`group p-6 rounded-3xl ${styles.bg} ${styles.hover} transition-all duration-300 cursor-pointer`}
              >
                <div
                  className={`inline-flex p-3 rounded-2xl ${styles.bg} mb-4`}
                >
                  <Icon className={`h-6 w-6 ${styles.icon}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {category.description}
                </p>
                <span className="text-xs font-medium text-muted-foreground">
                  {category.count} items
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
