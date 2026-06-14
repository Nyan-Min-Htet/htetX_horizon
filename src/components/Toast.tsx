import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Toast({ message, type = "success", onClose }: any) {
  const [progress, setProgress] = useState(100);
  const duration = 2500;

  useEffect(() => {
    const startTime = Date.now();

    // Update progress bar smoothly
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
    }, 16);

    // Auto-close timer
    const closeTimer = setTimeout(onClose, duration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  // Configuration for each toast type (Shopify-style)
  const config = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      progressColor: "bg-emerald-500",
      title: "Success",
    },
    error: {
      icon: XCircle,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      progressColor: "bg-red-500",
      title: "Error",
    },
    info: {
      icon: Info,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      progressColor: "bg-blue-500",
      title: "Info",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      progressColor: "bg-amber-500",
      title: "Warning",
    },
  };

  const currentConfig = config[type as keyof typeof config] || config.success;
  const Icon = currentConfig.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.95 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        className="fixed top-24 right-5 z-50 max-w-sm w-full"
      >
        <div
          className={`
            relative overflow-hidden
            ${currentConfig.bgColor} 
            ${currentConfig.borderColor}
            border rounded-xl shadow-lg backdrop-blur-sm
            flex items-start gap-3 p-4 pr-10
          `}
        >
          {/* ICON */}
          <div className="flex-shrink-0 mt-0.5">
            <Icon className={`w-5 h-5 ${currentConfig.iconColor}`} />
          </div>

          {/* CONTENT */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {currentConfig.title}
            </p>
            <p className="text-sm text-gray-600 mt-0.5 break-words">
              {message}
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* PROGRESS BAR */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200/50">
            <motion.div
              className={`h-full ${currentConfig.progressColor}`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
