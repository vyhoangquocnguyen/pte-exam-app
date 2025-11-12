import Link from "next/link";
import {
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  PlayIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function MockTestsPage() {
  const availableTests = [
    {
      id: "test-1",
      name: "Full Mock Test 1",
      duration: "3 hours",
      totalQuestions: 87,
      sections: [
        { name: "Speaking & Writing", duration: "77-93 min", questions: 28 },
        { name: "Reading", duration: "32-41 min", questions: 20 },
        { name: "Listening", duration: "45-57 min", questions: 39 },
      ],
      difficulty: "Medium",
      status: "available",
    },
    {
      id: "test-2",
      name: "Full Mock Test 2",
      duration: "3 hours",
      totalQuestions: 87,
      sections: [
        { name: "Speaking & Writing", duration: "77-93 min", questions: 28 },
        { name: "Reading", duration: "32-41 min", questions: 20 },
        { name: "Listening", duration: "45-57 min", questions: 39 },
      ],
      difficulty: "Hard",
      status: "available",
    },
  ];

  const completedTests = [
    {
      id: "test-completed-1",
      name: "Full Mock Test 1",
      completedDate: "2 days ago",
      overallScore: 72,
      scores: {
        speaking: 74,
        writing: 68,
        reading: 76,
        listening: 70,
      },
    },
    {
      id: "test-completed-2",
      name: "Practice Test 1",
      completedDate: "1 week ago",
      overallScore: 68,
      scores: {
        speaking: 70,
        writing: 65,
        reading: 72,
        listening: 66,
      },
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-50 border-green-200";
      case "Medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Hard":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
            <AcademicCapIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1">Mock Tests</h1>
            <p className="text-gray-600 text-base md:text-lg">
              Take full-length PTE practice tests to assess your readiness
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <p className="text-sm text-purple-900">
            <span className="font-semibold">💡 Tip:</span> Take mock tests in a quiet environment with no distractions.
            Each test takes approximately 3 hours to complete.
          </p>
        </div>
      </div>

      {/* Available Tests */}
      <div className="mb-12">
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">Available Tests</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableTests.map((test) => {
            const difficultyClass = getDifficultyColor(test.difficulty);

            return (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{test.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {test.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <ChartBarIcon className="w-4 h-4" />
                        {test.totalQuestions} questions
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${difficultyClass}`}>
                    {test.difficulty}
                  </span>
                </div>

                {/* Sections */}
                <div className="space-y-3 mb-6">
                  {test.sections.map((section, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{section.name}</p>
                        <p className="text-xs text-gray-500">{section.questions} questions</p>
                      </div>
                      <span className="text-xs text-gray-600">{section.duration}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  href={`/mock-tests/${test.id}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all">
                  <PlayIcon className="w-5 h-5" />
                  Start Test
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed Tests */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">Completed Tests</h2>

        {completedTests.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center card-shadow">
            <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No completed tests yet. Start your first mock test!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTests.map((test) => (
              <div key={test.id} className="bg-white rounded-2xl p-6 card-shadow hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Test Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-gray-900 mb-1">{test.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarIcon className="w-4 h-4" />
                          Completed {test.completedDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scores */}
                  <div className="flex items-center gap-6">
                    {/* Overall Score */}
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Overall</p>
                      <p className="font-display text-3xl font-bold text-gray-900">{test.overallScore}</p>
                    </div>

                    {/* Skill Scores */}
                    <div className="hidden sm:grid grid-cols-4 gap-3">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Speaking</p>
                        <p className="font-display text-xl font-bold text-speaking">{test.scores.speaking}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Writing</p>
                        <p className="font-display text-xl font-bold text-writing">{test.scores.writing}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Reading</p>
                        <p className="font-display text-xl font-bold text-reading">{test.scores.reading}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Listening</p>
                        <p className="font-display text-xl font-bold text-listening">{test.scores.listening}</p>
                      </div>
                    </div>

                    {/* View Results Button */}
                    <Link
                      href={`/mock-tests/results/${test.id}`}
                      className="px-6 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                      View Results
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
