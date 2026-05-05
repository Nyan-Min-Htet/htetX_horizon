import { useState } from "react";
import { initialFaqs, Faq } from "@/data/faqs";
import { FAQForm } from "@/components/FAQForm";
import { FAQItem } from "@/components/FAQItem";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function FAQ() {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);

  const addFaq = (q: string, a: string) => {
    const newFaq: Faq = {
      id: Date.now().toString(),
      question: q,
      answer: a,
      createdAt: new Date().toISOString(),
    };
    setFaqs((prev) => [newFaq, ...prev]);
  };

  const updateFaq = (id: string, q: string, a: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, question: q, answer: a } : f)),
    );
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <>
      <Header />
      <section className="py-20 min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            Frequently Asked Questions
          </h1>

          {/* Add New FAQ */}
          <FAQForm onSubmit={addFaq} />

          {/* FAQ List */}
          <div className="mt-12 space-y-4">
            {faqs.length ? (
              faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  onUpdate={updateFaq}
                  onDelete={deleteFaq}
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground mt-8">
                No FAQs yet – add one above!
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
