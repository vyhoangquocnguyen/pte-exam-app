"use client";

import { useState, useCallback } from "react";
import { useExerciseState } from "@/hooks/use-exercise-state";
import ExerciseContainer from "@/components/practice/exercise-container";
import QuestionHeader from "@/components/practice/question-header";
import AudioPlayer from "@/components/practice/audio-player";
import AudioRecorder from "@/components/practice/audio-recorder";
import ProgressIndicator from "@/components/practice/progress-indicator";
import NavigationButtons from "@/components/practice/navigation-buttons";
import CompletionScreen from "@/components/practice/completion-screen";
import { mockRepeatSentenceExercises } from "@/lib/mock-data/moc-exercises";

export default function RepeatSentencePage() {
  const exercises = mockRepeatSentenceExercises;
  const [audioHasFinished, setAudioHasFinished] = useState(false);

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    submitAnswer,
    goToNext,
    goToPrevious,
    isQuestionAnswered,
    getAnsweredIndices,
  } = useExerciseState({
    exerciseId: "repeat-sentence-session",
    exerciseType: "speaking",
    totalQuestions: exercises.length,
    onComplete: (data) => {
      console.log("Repeat Sentence exercises completed:", data);
    },
  });

  const currentExercise = exercises[currentQuestionIndex];
  const questionId = currentExercise.id;
  const isAnswered = isQuestionAnswered(questionId);

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    submitAnswer(questionId, {
      audioBlob: blob,
      duration,
      originalTranscript: currentExercise.content.transcript,
    });
  };

  const handleNext = useCallback(() => {
    setAudioHasFinished(false);
    goToNext();
  }, [goToNext]);

  const handlePrevious = useCallback(() => {
    setAudioHasFinished(false);
    goToPrevious();
  }, [goToPrevious]);

  return (
    <ExerciseContainer backHref="/practice/speaking" backLabel="Back to Speaking">
      <div className="mb-6">
        <ProgressIndicator
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          answeredQuestions={getAnsweredIndices()}
          variant="segments"
        />
      </div>

      <QuestionHeader
        questionNumber={currentQuestion}
        totalQuestions={totalQuestions}
        title="Repeat Sentence"
        instructions="You will hear a sentence. Please repeat the sentence exactly as you hear it. The sentence will be played only once."
        showTimer={false}
      />

      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 card-shadow-lg">
        {/* Audio Player */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Listen to the sentence:</h3>
          <AudioPlayer
            src={currentExercise.content.audioUrl}
            maxPlays={currentExercise.content.maxPlays}
            onEnded={() => setAudioHasFinished(true)}
            showWaveform={true}
          />
        </div>

        {/* Instructions */}
        {!audioHasFinished && !isAnswered && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">⚠️ Important:</span> You can only play the audio once. Listen carefully
              and prepare to repeat immediately.
            </p>
          </div>
        )}

        {/* Recording Interface */}
        {audioHasFinished && !isAnswered && (
          <div>
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">🎤 Now record:</span> Repeat the sentence exactly as you heard it. You
                have {currentExercise.content.recordingTime} seconds.
              </p>
            </div>

            <AudioRecorder
              maxDuration={currentExercise.content.recordingTime}
              onRecordingComplete={handleRecordingComplete}
              autoStart={true}
            />
          </div>
        )}

        {/* Completion State */}
        {isAnswered && (
          <CompletionScreen
            title="Response Recorded!"
            description="Your repetition has been submitted for evaluation."
          />
        )}

        {/* Waiting State */}
        {!audioHasFinished && !isAnswered && (
          <div className="text-center py-12 text-gray-500">
            <p>Play the audio above to begin...</p>
          </div>
        )}
      </div>

      <NavigationButtons
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isAnswered={isAnswered}
        showSubmit={false}
        layout="spread"
      />
    </ExerciseContainer>
  );
}
