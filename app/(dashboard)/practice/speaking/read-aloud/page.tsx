"use client";

import { useExerciseState } from "@/hooks/use-exercise-state";
import ExerciseContainer from "@/components/practice/exercise-container";
import QuestionHeader from "@/components/practice/question-header";
import AudioRecorder from "@/components/practice/audio-recorder";
import ProgressIndicator from "@/components/practice/progress-indicator";
import NavigationButtons from "@/components/practice/navigation-buttons";
import RestartButton from "@/components/practice/restart-button";
import PhaseTimer from "@/components/practice/phase-timer";
import CompletionScreen from "@/components/practice/completion-screen";
import { mockReadAloudExercises } from "@/lib/mock-data/exercises";
import { usePreparationTimer } from "@/hooks/use-preparation-timer";

export default function ReadAloudPage() {
  const exercises = mockReadAloudExercises;

  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    submitAnswer,
    goToNext,
    goToPrevious,
    isQuestionAnswered,
    getAnsweredIndices,
    resetCurrentQuestion,
  } = useExerciseState({
    exerciseId: "read-aloud-session",
    exerciseType: "speaking",
    totalQuestions: exercises.length,
    onComplete: (data) => {
      console.log("Read Aloud exercises completed:", data);
      // TODO: Send to backend for AI evaluation
    },
  });

  const currentExercise = exercises[currentQuestionIndex];
  const questionId = currentExercise.id;
  const isAnswered = isQuestionAnswered(questionId);

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    submitAnswer(questionId, {
      audioBlob: blob,
      duration,
      text: currentExercise.content.text,
    });
  };

  const timer = usePreparationTimer({
    preparationTime: currentExercise.content.preparationTime,
    recordingTime: currentExercise.content.recordingTime,
    autoStart: true, // Starts the preparation timer automatically
  });

  const handleRestartQuestion = () => {
    resetCurrentQuestion(questionId);
    timer.reset();
    timer.start(); // Restart the preparation timer
  };

  return (
    <ExerciseContainer maxWidth="full" backHref="/practice/speaking" backLabel="Back to Speaking">
      {/* Progress Bar */}
      <div className="mb-6">
        <ProgressIndicator
          currentQuestion={currentQuestion}
          totalQuestions={totalQuestions}
          answeredQuestions={getAnsweredIndices()}
          variant="segments"
        />
      </div>

      {/* Question Header */}
      <QuestionHeader
        questionNumber={currentQuestion}
        totalQuestions={totalQuestions}
        title="Read Aloud"
        instructions={`Look at the text below. You have ${currentExercise.content.preparationTime} seconds to read it silently, then record yourself reading it aloud.`}
        timeLimit={currentExercise.timeLimit}
        showTimer={false} // The PhaseTimer will handle the display
      />

      {/* Main Content */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 mb-6 card-shadow-lg">
        {/* Text to Read */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <p className="text-lg leading-relaxed text-gray-800">{currentExercise.content.text}</p>
        </div>

        {/* Recording Interface */}
        {!isAnswered ? (
          <>
            <PhaseTimer
              isPreparation={timer.isPreparation}
              isRecording={timer.isRecording}
              isCompleted={timer.isCompleted}
              isAnswered={isAnswered}
              timeLeft={timer.timeLeft}
              formatTime={timer.formatTime}
            />
            {timer.isPreparation && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <span className="font-semibold">👀 Prepare:</span> Read the passage silently. The recording will begin
                  automatically when the timer ends.
                </p>
              </div>
            )}

            {timer.isRecording && (
              <AudioRecorder
                autoStart={true}
                maxDuration={currentExercise.content.recordingTime}
                onRecordingComplete={handleRecordingComplete}
              />
            )}
          </>
        ) : (
          <CompletionScreen
            title="Recording Submitted!"
            description="Your response has been recorded and will be evaluated.">
            <RestartButton onRestart={handleRestartQuestion} variant="secondary" size="sm" />
          </CompletionScreen>
        )}
      </div>

      {/* Navigation */}
      <NavigationButtons
        onPrevious={goToPrevious}
        onNext={goToNext}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        isAnswered={isAnswered || timer.isCompleted}
        showSubmit={false}
        layout="spread"
      />
    </ExerciseContainer>
  );
}
