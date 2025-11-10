// app/(dashboard)/practice/listening/page.tsx
// This is a Server Component.

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Timer from "@/components/practice/timer";
import ListeningInteraction from "@/components/practice/listening-interaction"; // Client Component
import { Separator } from "@/components/ui/separator";

// Simulated Server-side data fetching
async function getListeningExercise() {
  return {
    id: "ex999",
    subType: "Fill in the Blanks",
    timeLimit: 180, // Time to listen and type
    audioUrl: "/audio/listening/lecture_999.mp3", // Example path to a hosted audio file
    blanks: [
      { id: "b1", placeholder: "Type your answer here..." },
      { id: "b2", placeholder: "Another word or phrase..." },
      { id: "b3", placeholder: "Final missing term..." },
    ],
  };
}

export default async function ListeningPracticePage() {
  const exercise = await getListeningExercise();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Practice: {exercise.subType}</h1>

      {/* Static Header & Timer (Server Rendered) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Question: {exercise.subType}</CardTitle>
          <Timer initialTime={exercise.timeLimit} key={exercise.id} />
        </CardHeader>
        <Separator />
      </Card>

      {/* Interactive Area (Client Component Boundary) */}
      <ListeningInteraction exerciseId={exercise.id} audioUrl={exercise.audioUrl} blanks={exercise.blanks} />
    </div>
  );
}
