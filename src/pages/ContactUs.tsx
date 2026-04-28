import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { MapLocation } from "@/components/MapLocation";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactUs() {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      content: "+959964165768",
      link: "tel:+959964165768",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "nhtet9968@gmail.com",
      link: "mailto:nhtet9968@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      content: "No 61/63 (7B) Sin Min Street, Ahlone, Yangon",
      link: "#map",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      content: "Mon-Fri: 9AM-6PM\nSat-Sun: 10AM-4PM",
      link: null,
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our products or need assistance? We're here
              to help and would love to hear from you.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/50 rounded-3xl p-6 text-center hover:bg-secondary transition-colors"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-muted-foreground whitespace-pre-line">
                    {info.content}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <ContactForm />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Visit Our Store
                </h2>
                <MapLocation />
              </div>

              <div className="bg-secondary/50 rounded-3xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Free shipping on orders over $50
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    30-day return policy
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Sustainable packaging
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Expert customer support
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
