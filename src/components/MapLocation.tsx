import { motion } from "framer-motion";

export function MapLocation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden bg-secondary/50 p-6"
    >
      <div className="aspect-video bg-muted rounded-xl mb-4 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-6xl mb-2">🗺️</div>
          <p>Interactive Map</p>
          <p className="text-sm">(Would show your actual location here)</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p>📍 No 61/63 (7B) Sin Min Street, Ahlone, Yangon</p>
        <p>📞 +959964165768</p>
        <p>🕒 Mon-Fri: 9AM-6PM | Sat-Sun: 10AM-4PM</p>
      </div>

      <button className="w-full mt-4 bg-primary text-primary-foreground py-2 rounded-xl hover:bg-primary/90 transition-colors">
        Get Directions
      </button>
    </motion.div>
  );
}
