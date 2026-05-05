import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { FAQForm } from "./FAQForm";

interface FAQItemProps {
  faq: {
    id: string;
    question: string;
    answer: string;
  };
  onUpdate: (id: string, newQ: string, newA: string) => void;
  onDelete: (id: string) => void;
}

export const FAQItem = ({ faq, onUpdate, onDelete }: FAQItemProps) => {
  const [editing, setEditing] = useState(false);

  const handleUpdate = (q: string, a: string) => {
    onUpdate(faq.id, q, a);
    setEditing(false);
  };

  return (
    <Card className="p-6 mb-4">
      {editing ? (
        <FAQForm
          onSubmit={handleUpdate}
          initialQuestion={faq.question}
          initialAnswer={faq.answer}
        />
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{faq.question}</h3>
          <p className="mt-2 text-muted-foreground">{faq.answer}</p>
          <div className="mt-4 flex gap-2">
            <Button variant="ghost" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button variant="ghost" onClick={() => onDelete(faq.id)}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
