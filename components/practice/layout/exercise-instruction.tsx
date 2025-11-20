"use client";

import { PlayIcon } from "@heroicons/react/24/outline";
import {
  ExerciseContent,
  ExerciseType,
  ReadAloudContent,
  RepeatSentenceContent,
  DescribeImageContent,
} from "@/types/exercise-schemas";

interface RetellLectureContent {
  preparationTime: number;
  recordingTime: number;
}

interface AnswerShortQuestionContent {
  recordingTime: number;
}

interface ExerciseInstructionsProps {
  exerciseType: ExerciseType;
  subType: string;
  content: ExerciseContent;
  onStart: () => void;
}

export function ExerciseInstructions({ exerciseType, subType, content, onStart }: ExerciseInstructionsProps) {
  const getInstructions = () => {
    if (exerciseType === ExerciseType.SPEAKING) {
      switch (subType) {
        case "read-aloud": {
          const readAloudContent = content as ReadAloudContent;
          return {
            title: "Read Aloud Instructions",
            steps: [
              `You will have ${readAloudContent.preparationTime} seconds to prepare`,
              "Read the text aloud clearly and naturally",
              `Recording will last ${readAloudContent.recordingTime} seconds`,
              "Your pronunciation, fluency, and content will be evaluated",
            ],
            tips: [
              "Read the text during preparation time",
              "Speak clearly and at a natural pace",
              "Pronounce all words correctly",
              "Maintain appropriate intonation",
            ],
          };
        }
        case "repeat-sentence": {
          const repeatSentenceContent = content as RepeatSentenceContent;
          return {
            title: "Repeat Sentence Instructions",
            steps: [
              "Listen to the audio carefully",
              "You will hear it only ONCE",
              `You have ${repeatSentenceContent.recordingTime} seconds to repeat it`,
              "Try to repeat exactly what you heard",
            ],
            tips: [
              "Listen carefully to every word",
              "Pay attention to intonation",
              "Speak clearly and confidently",
              "Don't add or remove words",
            ],
          };
        }
        case "describe-image": {
          const describeImageContent = content as DescribeImageContent;
          return {
            title: "Describe Image Instructions",
            steps: [
              `You have ${describeImageContent.preparationTime} seconds to study the image.`,
              "Describe the image in detail.",
              `You will have ${describeImageContent.recordingTime} seconds to record your description.`,
              "Focus on the key information and main points.",
            ],
            tips: [
              "Start with a general overview of the image.",
              "Describe the most important details and elements.",
              "Use specific vocabulary and descriptive language.",
              "Organize your description logically.",
            ],
          };
        }
        case "retell-lecture": {
          const retellLectureContent = content as RetellLectureContent;
          return {
            title: "Retell Lecture Instructions",
            steps: [
              "You will hear a short lecture.",
              `You have ${retellLectureContent.preparationTime} seconds to prepare after the lecture.`,
              "Retell the lecture in your own words.",
              `You will have ${retellLectureContent.recordingTime} seconds to record your response.`,
            ],
            tips: [
              "Take notes on the main points and supporting details.",
              "Start with a topic sentence that summarizes the lecture.",
              "Use keywords and phrases from the lecture.",
              "Speak clearly and structure your response.",
            ],
          };
        }
        case "answer-short-question": {
          const answerShortQuestionContent = content as AnswerShortQuestionContent;
          return {
            title: "Answer Short Question Instructions",
            steps: [
              "You will hear a short question.",
              "Answer the question with a single word or a few words.",
              `You have ${answerShortQuestionContent.recordingTime} seconds to answer.`,
            ],
            tips: [
              "Listen carefully to the question.",
              "Your answer should be short and to the point.",
              "Don't hesitate before answering.",
              "Speak clearly.",
            ],
          };
        }
      }
    }

    return {
      title: "Exercise Instructions",
      steps: ["Follow the prompts", "Complete the task", "Submit your answer"],
      tips: ["Read carefully", "Manage your time", "Check before submitting"],
    };
  };

  const instructions = getInstructions();

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{instructions.title}</h2>

      <div className="space-y-6">
        {/* Steps */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What to do:</h3>
          <ol className="space-y-2">
            {instructions.steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tips */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips:</h3>
          <ul className="space-y-2">
            {instructions.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-lg text-lg font-semibold">
          <PlayIcon className="w-6 h-6" />
          Start Exercise
        </button>
      </div>
    </div>
  );
}
