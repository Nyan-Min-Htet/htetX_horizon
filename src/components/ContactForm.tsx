import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-muted bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-muted bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Subject *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-muted bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-muted bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full gap-2 py-3 text-lg"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
