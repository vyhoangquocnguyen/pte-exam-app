"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  exerciseId: string;
  // Future: userResponse: Blob | string;
}

// Placeholder Server Action function
async function handleSubmission(id: string) {
  console.log(`Submitting answer for exercise: ${id}`);
  // In a real app:
  // 1. Upload audio/text (Server Action)
  // 2. Trigger feedback generation (Server Action calls lib/ai/*)
  // 3. Store attempt in Prisma
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
  console.log("Submission complete!");
  // Future: Redirect to the results page
}

export default function SubmitButton({ exerciseId }: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Since this is a Client Component, we call the Server Action function directly
      await handleSubmission(exerciseId);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center border p-2">
      <Button onClick={handleSubmit} disabled={isSubmitting} className="px-8 py-6 text-lg">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Answer & Get Feedback"
        )}
      </Button>
    </div>
  );
}
