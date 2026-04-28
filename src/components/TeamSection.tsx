import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format",
    bio: "Passionate about sustainable living and product design.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@company.com",
    },
  },
  {
    name: "Marcus Johnson",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format",
    bio: "Bringing beauty and functionality together.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "marcus@company.com",
    },
  },
  {
    name: "Elena Rodriguez",
    role: "Sustainability Lead",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format",
    bio: "Ensuring every product meets our eco-standards.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "elena@company.com",
    },
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals behind our mission to make sustainable
            living accessible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-64 h-64 object-cover rounded-3xl mx-auto group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 rounded-3xl transition-colors duration-300" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-primary mb-4">{member.role}</p>
              <p className="text-muted-foreground mb-6">{member.bio}</p>

              <div className="flex justify-center space-x-4">
                <a
                  href={member.social.linkedin}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={member.social.twitter}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${member.social.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
