// src/pages/AboutUs.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TeamSection } from "@/components/TeamSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Heart } from "lucide-react";

import aboutHero from "@/assets/about-hero.jpg";

export default function AboutUs() {
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality First",
      description:
        "We never compromise on quality. Every product undergoes rigorous testing.",
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer Love",
      description:
        "Your satisfaction is our priority. We're here to make you happy.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description:
        "We believe in building a community around sustainable living.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "5+", label: "Years Experience" },
    { number: "100+", label: "Products" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Story
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Founded in 2019, we started with a simple mission: to bring
                high-quality, sustainable products to everyday life. What began
                as a small passion project has grown into a community of
                like-minded individuals who believe in making conscious choices
                without compromising on style or functionality.
              </p>
              <Button size="lg" className="gap-2 p-4">
                <Heart className="h-5 w-5" />
                Join Our Community
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={aboutHero}
                alt="Our team working together"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                <p className="text-2xl font-bold">5+ Years</p>
                <p className="text-sm">Of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product design to
              customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-8 rounded-3xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Discover our carefully curated collection of sustainable products
              that make a difference in your daily life.
            </p>
            <Button variant="secondary" size="lg" className="px-10 py-3 gap-2">
              Shop Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
