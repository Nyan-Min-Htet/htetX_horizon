import { motion } from "framer-motion";
import { CreditCard, Truck, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "On orders over $100. Delivered in 2-4 days.",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns on all items.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Multiple payment options with encryption.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "AI-powered chat and human experts.",
  },
];

export function Features() {
  return (
    <section className="py-16 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 p-3 rounded-2xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
