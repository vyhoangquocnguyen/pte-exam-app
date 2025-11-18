// hooks/use-speaking-exercise.ts
import { useExercise } from "./use-exercise";
import { useAudioRecorder } from "./use-audio-recorder";
import { usePreparationTimer } from "./use-preparation-timer";
import { SpeakingExercise } from "@/types/exercise-schemas";

interface UseSpeakingExerciseOptions {
  exercises: SpeakingExercise[];
  onComplete?: (results: unknown) => void;
}

export function useSpeakingExercise(options: UseSpeakingExerciseOptions) {
  const exercise = useExercise(options);

  const content = exercise.currentExercise.content as SpeakingExercise["content"];
  const preparationTime = content.preparationTime || 0;
  const recordingTime = content.recordingTime || 40;

  const timer = usePreparationTimer({
    preparationTime,
    recordingTime,
    autoStart: exercise.phase === "preparation",
    onPreparationComplete: () => {
      exercise.setPhase("active");
      recorder.startRecording();
    },
    onRecordingComplete: () => {
      exercise.setPhase("review");
    },
  });

  const recorder = useAudioRecorder({
    maxDuration: recordingTime,
    onRecordingComplete: (blob, duration) => {
      exercise.saveAnswer(exercise.currentExercise.id, {
        audioBlob: blob,
        duration,
      });
    },
  });

  return {
    ...exercise,
    timer,
    recorder,
  };
}
