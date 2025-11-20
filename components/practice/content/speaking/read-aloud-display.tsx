import { ReadAloudContent as ReadAloudContentType } from "@/types/exercise-schemas";
import { useSpeakingExercise } from "@/hooks/use-speaking-exercise";
import { SpeakingPreparationView } from "@/components/practice/content/speaking/shared/speaking-preparation-view";
import { SpeakingRecordingView } from "@/components/practice/content/speaking/shared/speaking-recording-view";
import { SpeakingReviewView } from "@/components/practice/content/speaking/shared/speaking-review-view";

interface ContentSwitchboardProps {
  speaking: ReturnType<typeof useSpeakingExercise>;
}

export function ReadAloudDisplay({ speaking }: ContentSwitchboardProps) {
  const currentContent = speaking.currentExercise.content as ReadAloudContentType;
  const currentAnswer = speaking.answers[speaking.currentExercise.id];

  // NOTE: In the future, you'd fetch feedback here for the 'feedback' phase.

  console.log(speaking.phase);


  // All other phases (preparation, active, review, feedback) use the common layout container
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px]">
      {speaking.phase === "preparation" && (
        <SpeakingPreparationView
          timeLeft={speaking.timer.timeLeft}
          totalTime={currentContent.preparationTime}
          onSkip={speaking.timer.skipPreparation}
          tips={["Focus on key phrases.", "Maintain a steady pace."]}>
          {currentContent.text}
          
        </SpeakingPreparationView>
      )}
      

      {speaking.phase === "active" && (
        <SpeakingRecordingView
          currentDuration={speaking.recorder.recordingTime}
          totalDuration={currentContent.recordingTime}
          formatTime={speaking.recorder.formatTime}
          onStop={speaking.recorder.stopRecording}>
          {currentContent.text}
        </SpeakingRecordingView>
      )}

      {speaking.phase === "review" && currentAnswer && (
        <SpeakingReviewView
          audioUrl={currentAnswer.audioUrl}
          duration={currentAnswer.duration}
          onRetry={speaking.retryQuestion}
          onNext={speaking.goToNext}
          isLastQuestion={speaking.isLastExercise}>
          {currentContent.text}
        </SpeakingReviewView>
      )}

      {/* FUTURE: speaking.phase === "feedback" && ... */}
    </div>
  );
}
