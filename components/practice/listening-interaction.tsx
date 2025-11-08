"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import SubmitButton from "./submit-button";

interface Blank {
  id: string;
  placeholder: string;
}

interface ListeningInteractionProps {
  exerciseId: string;
  audioUrl: string;
  blanks: Blank[];
}

const ListeningInteraction = ({ exerciseId, audioUrl, blanks }: ListeningInteractionProps) => {
  //Initialize state for the input fields based on blanks array
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    blanks.reduce((acc, blank) => ({ ...acc, [blank.id]: "" }), {})
  );

  const handleInputChange = (blankID: string, value: string) => {
    //Update the specific blank's answer in the state of object
    setAnswers((prevAnswer) => ({ ...prevAnswer, [blankID]: value }));
  };

  //Format answer for submission
  const userResponse = Object.keys(answers).map((id) => ({
    blankId: id,
    text: answers[id],
  }));
  return (
    <div className="space-y-6">
      {/* audio player card */}
      <Card>
        <CardContent className="pt-6">
          <CardDescription className="mb-3">Listen carefully and fill in the missing words.</CardDescription>
          <audio controls src={audioUrl} className="w-full h-10" />
        </CardContent>
      </Card>

      {/* Answer Area */}
      <Card>
        <CardContent className="grid gap-4 pt-6">
          {blanks.map((blank, index) => (
            <div key={blank.id} className="flex items-center space-x-2">
              <span className="font-semibold text-lg">{index + 1}.</span>
              <Input
                type="text"
                placeholder={blank.placeholder}
                value={answers[blank.id]}
                onChange={(e) => handleInputChange(blank.id, e.target.value)}
                className="flex-1"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submission */}
      <div className="flex justify-end">
        <SubmitButton
          exerciseId={exerciseId}
          /* Future: userResponse={userResponse} */
        />
      </div>
    </div>
  );
};

export default ListeningInteraction;
