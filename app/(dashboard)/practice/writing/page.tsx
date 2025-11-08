// This is a Client Component to manage the editor's state and submission.
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timer from "@/components/practice/timer";
import SubmitButton from "@/components/practice/submit-button";
import EssayEditor from "@/components/practice/essay-editor";
import { Separator } from "@/components/ui/separator";

// Simulated data fetching (Normally this would be a Server Component fetch)
const exercise = {
  id: "ex456",
  subType: "Essay Writing",
  timeLimit: 1200, // 20 minutes in seconds
  prompt:
    "Write an essay of 200–300 words on the following topic: 'The role of technology in distance learning and its effect on student motivation.'",
};

export default function WritingPracticePage() {
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);

  // Callback function passed to the EssayEditor
  const handleEditorUpdate = (newContent: string, newWordCount: number) => {
    setContent(newContent);
    setWordCount(newWordCount);
    // Future: Implement a debounce here for auto-save!
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Practice: {exercise.subType}</h1>

      {/* Question Header Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Question: {exercise.subType}</CardTitle>
          <Timer initialTime={exercise.timeLimit} key={exercise.id} />
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-4">{exercise.prompt}</p>
        </CardContent>
      </Card>

      {/* Answer Area Card with Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Essay</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <EssayEditor onUpdateContent={handleEditorUpdate} />
        </CardContent>
      </Card>

      {/* Submission Footer */}
      <div className="flex justify-end">
        <SubmitButton
          exerciseId={exercise.id}
          // Future: Pass the content and wordCount to the submission logic
        />
      </div>
    </div>
  );
}
