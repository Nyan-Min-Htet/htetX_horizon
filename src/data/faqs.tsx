export interface Faq {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export const initialFaqs: Faq[] = [
  {
    id: "1",
    question: "What payment methods do you accept?",
    answer: "We accept credit/debit cards, PayPal, Apple Pay, and Google Pay.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    question: "Do you offer free shipping?",
    answer: "Yes! We deliver worldwide with free shipping for orders over $50.",
    createdAt: new Date().toISOString(),
  },
];
