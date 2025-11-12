import Link from "next/link";
import { MicrophoneIcon, ClockIcon, FireIcon, PlayIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function SpeakingPracticePage() {
  const exerciseTypes = [
    {
      id: "read-aloud",
      name: "Read Aloud",
      description: "Read a text passage aloud with clear pronunciation",
      count: 12,
      difficulty: "Medium",
      timeLimit: "40 seconds",
      icon: "📖",
      color: "border-blue-200 bg-blue-50",
    },
    {
      id: "repeat-sentence",
      name: "Repeat Sentence",
      description: "Listen and repeat the sentence exactly as you hear it",
      count: 15,
      difficulty: "Medium",
      timeLimit: "15 seconds",
      icon: "🔁",
      color: "border-purple-200 bg-purple-50",
    },
    {
      id: "describe-image",
      name: "Describe Image",
      description: "Describe an image in detail within the time limit",
      count: 8,
      difficulty: "Hard",
      timeLimit: "40 seconds",
      icon: "🖼️",
      color: "border-orange-200 bg-orange-50",
    },
    {
      id: "retell-lecture",
      name: "Re-tell Lecture",
      description: "Listen to a lecture and retell it in your own words",
      count: 6,
      difficulty: "Hard",
      timeLimit: "40 seconds",
      icon: "🎓",
      color: "border-pink-200 bg-pink-50",
    },
    {
      id: "answer-short-question",
      name: "Answer Short Question",
      description: "Answer a question with one or a few words",
      count: 4,
      difficulty: "Easy",
      timeLimit: "10 seconds",
      icon: "❓",
      color: "border-green-200 bg-green-50",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <Link
        href="/practice"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeftIcon className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Practice</span>
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-speaking flex items-center justify-center">
            <MicrophoneIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-1">Speaking Practice</h1>
            <p className="text-gray-600">Choose an exercise type to start practicing</p>
          </div>
        </div>

        {/* Stats Badge */}
        <div className="hidden md:flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-xl">
          <div>
            <p className="text-xs text-gray-600">Current Score</p>
            <p className="font-display text-2xl font-bold text-speaking">74</p>
          </div>
          <div className="h-10 w-px bg-blue-200" />
          <div>
            <p className="text-xs text-gray-600">Streak</p>
            <p className="font-display text-2xl font-bold text-orange-600 flex items-center gap-1">
              <FireIcon className="w-5 h-5" />7
            </p>
          </div>
        </div>
      </div>

      {/* Exercise Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exerciseTypes.map((exercise) => {
          const difficultyColorClass = getDifficultyColor(exercise.difficulty);

          return (
            <Link
              key={exercise.id}
              href={`/practice/speaking/${exercise.id}`}
              className={`block bg-white border-2 ${exercise.color} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
              {/* Icon */}
              <div className="text-4xl mb-4">{exercise.icon}</div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{exercise.name}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 min-h-[40px]">{exercise.description}</p>

              {/* Meta Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Questions</span>
                  <span className="font-semibold text-gray-900">{exercise.count} available</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time Limit</span>
                  <span className="font-semibold text-gray-900 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {exercise.timeLimit}
                  </span>
                </div>
              </div>

              {/* Difficulty Badge */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColorClass}`}>
                  {exercise.difficulty}
                </span>
                <div className="flex items-center gap-2 text-speaking font-semibold text-sm">
                  Start
                  <PlayIcon className="w-4 h-4" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
        <h3 className="font-display text-xl font-bold text-blue-900 mb-4">🎯 Speaking Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/50 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">Clear Pronunciation</p>
            <p className="text-sm text-blue-700">
              Speak clearly and at a natural pace. Don't rush, but don't speak too slowly.
            </p>
          </div>
          <div className="bg-white/50 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">Use Natural Intonation</p>
            <p className="text-sm text-blue-700">
              Vary your tone and stress to sound natural. Avoid monotone speaking.
            </p>
          </div>
          <div className="bg-white/50 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">Practice Regularly</p>
            <p className="text-sm text-blue-700">
              Daily practice helps build confidence and improves fluency over time.
            </p>
          </div>
          <div className="bg-white/50 rounded-xl p-4">
            <p className="font-semibold text-blue-900 mb-2">Review AI Feedback</p>
            <p className="text-sm text-blue-700">Pay attention to feedback on pronunciation, fluency, and content.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
