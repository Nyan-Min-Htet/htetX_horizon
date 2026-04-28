import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Clock,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function MapLocation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const address = "No.61/63 (7B) Sin Min Street, Ahlone, Yangon";
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;

  // OpenStreetMap dynamic embed URL (no API key needed)
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=96.1400%2C16.7700%2C96.1600%2C16.7900&layer=mapnik&marker=16.78%2C96.15`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden bg-secondary/50 p-6"
    >
      {/* Map Title */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-6 w-6 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Our Location</h3>
      </div>

      {/* Dynamic Interactive Map */}
      <div
        className={`relative rounded-xl mb-4 overflow-hidden border-2 border-gray-200 ${isExpanded ? "fixed inset-4 z-50 bg-white" : "aspect-video"}`}
      >
        {/* OpenStreetMap Iframe - Fully Interactive */}
        <iframe
          src={osmEmbedUrl}
          width="100%"
          height={isExpanded ? "100%" : "300"}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Store Location - Interactive Map"
          className="rounded-lg"
          allow="geolocation"
        />

        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            title={isExpanded ? "Minimize map" : "Expand map"}
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            title="Open in Google Maps"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Location Pin Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="relative"
          >
            <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-red-400 rounded-full animate-ping"></div>
          </motion.div>
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded text-xs text-gray-600 pointer-events-none">
          © OpenStreetMap contributors
        </div>
      </div>

      {/* Address and Business Info */}
      <div className="space-y-4">
        {/* Address Card */}
        <div className="flex items-start gap-3 p-4 bg-background rounded-xl border">
          <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-foreground mb-2">Store Address</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {address}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              📍 Ahlone Township, Yangon, Myanmar
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start gap-3 p-4 bg-background rounded-xl border">
          <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-foreground mb-2">Business Hours</p>
            <div className="text-muted-foreground text-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="flex-1">Monday - Friday</span>
                <span className="font-medium text-foreground">
                  9:00 AM - 6:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex-1">Saturday</span>
                <span className="font-medium text-foreground">
                  9:00 AM - 4:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex-1">Sunday</span>
                <span className="font-medium text-red-400">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
        >
          <div className="w-5 h-5 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
          <div>
            <p className="font-semibold text-green-800">Open Now</p>
            <p className="text-green-600 text-sm">
              We're ready to welcome you!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <Button
          variant="outline"
          className="gap-2 h-12"
          onClick={() => {
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
            window.open(directionsUrl, "_blank");
          }}
        >
          <Navigation className="h-5 w-5" />
          Get Directions
        </Button>

        <Button
          className="gap-2 h-12"
          onClick={() => window.open(googleMapsUrl, "_blank")}
        >
          <ExternalLink className="h-5 w-5" />
          Open in Google Maps
        </Button>
      </div>

      {/* Fullscreen Overlay Close Button */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          onClick={() => setIsExpanded(false)}
        >
          <button className="bg-white p-4 rounded-lg shadow-xl">
            <span className="text-lg font-semibold">
              Click anywhere to close
            </span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
