import AudioRecorder from "@/components/practice/audio-recorder";
import SubmitButton from "@/components/practice/submit-button";
import Timer from "@/components/practice/timer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car } from "lucide-react";

async function getSpeakingExercise() {
  // NOTE: In a real app, you would fetch data using Prisma here:
  // const exercise = await prisma.exercise.findFirst({ where: { type: 'SPEAKING', subType: 'read_aloud' } });

  // Simulated data for 'Read Aloud'
  return {
    id: "ex123",
    subType: "Read Aloud",
    timeLimit: 40, // Seconds for preparation and speaking
    content: {
      questionText: "Read the text below aloud in the microphone.",
      readingPassage:
        "Despite their high intellectual abilities, chimpanzees struggle to form complex, language-like structures due to a biological inability to produce a wide range of vocal sounds with fine control. While they can learn sign language and recognize symbols, the physical limitations of their larynx prevent human-like speech.",
    },
  };
}
const SpeakingPracticePage = async () => {
  const exercise = await getSpeakingExercise();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Practice: {exercise.subType}</h1>

      {/* Question Header Card (server component) */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Question: {exercise.subType}</CardTitle>
          {/* Timer will be a Client Compoment, wrapped in a server component slot */}
          <Timer initialTime={exercise.timeLimit} key={exercise.id} />
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-4">{exercise.content.questionText}</p>

          {/* Static content (server component) */}
          <div className="p-4 border rounded-md bg-muted.30">
            <p className="font-serif leading-relaxed text-gray-700 dark:text-gray-300">
              {exercise.content.readingPassage}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Answer Card (client component boundary) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Response</CardTitle>
        </CardHeader>
        <CardContent>
          <AudioRecorder />
        </CardContent>
      </Card>

      {/* Submission Footer */}
      <div className="flex justify-end">
        {/* The submit button will trigger a Server Action */}
        <SubmitButton exerciseId={exercise.id} />
      </div>
    </div>
  );
};

export default SpeakingPracticePage;
