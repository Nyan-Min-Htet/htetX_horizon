import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FAQFormProps {
  onSubmit: (q: string, a: string) => void;
  initialQuestion?: string;
  initialAnswer?: string;
}

export const FAQForm = ({
  onSubmit,
  initialQuestion = "",
  initialAnswer = "",
}: FAQFormProps) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [answer, setAnswer] = useState(initialAnswer);

  const handleSubmit = () => {
    if (!question.trim() || !answer.trim())
      return alert("Both fields required");
    onSubmit(question, answer);
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-xl shadow-md">
      <Input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button onClick={handleSubmit}>Save FAQ</Button>
    </div>
  );
};
