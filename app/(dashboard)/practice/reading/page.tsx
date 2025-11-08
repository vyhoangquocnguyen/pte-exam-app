// This is a Server Component, but contains Client Components for state and interaction.

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Timer from "@/components/practice/timer";
import ReadingInteraction from "@/components/practice/reading-interaction"; // The Client Controller Component
import { Separator } from "@/components/ui/separator";

// Simulated Server-side data (The initial order is the scrambled order)
const exercise = {
  id: "ex789",
  subType: "Re-order Paragraphs",
  timeLimit: 360, // 6 minutes
  items: [
    {
      id: "p3",
      content:
        "Despite early setbacks, the machine learning community rallied, finding new applications in image recognition and natural language processing.",
    },
    {
      id: "p1",
      content:
        'The history of artificial intelligence research is marked by periods of great optimism followed by periods known as "AI winters."',
    },
    {
      id: "p4",
      content:
        "Today, AI is a cornerstone of modern technology, driving innovation across various industries, from finance to healthcare.",
    },
    {
      id: "p2",
      content:
        "One of the first such winters occurred after funding was dramatically cut when initial research promises failed to materialize.",
    },
  ],
};

// Client component wrapper to handle the order state and submission logic
export default async function ReadingPracticePage() {
  // 1. Prepare the static data structure for the Client Component
  const initialItems = exercise.items.map((item) => ({
    id: item.id,
    content: item.content,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Practice: {exercise.subType}</h1>

      {/* Static Question Header (Server Rendered) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Question: {exercise.subType}</CardTitle>
          {/* Timer is a Client Component, but rendered here */}
          <Timer initialTime={exercise.timeLimit} key={exercise.id} />
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-4">
            Click and drag the text boxes below to put the paragraphs into the correct order.
          </p>
        </CardContent>
      </Card>

      {/* Interactive Answer Area (Client Component Boundary) */}
      <ReadingInteraction
        exerciseId={exercise.id}
        initialItems={initialItems} // Passes the fetched, static data to the Client
      />
    </div>
  );
}
