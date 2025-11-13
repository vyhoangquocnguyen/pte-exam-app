import Link from "next/link";
import {
  MicrophoneIcon,
  PencilSquareIcon,
  BookOpenIcon,
  SpeakerWaveIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function PracticePage() {
  const skills = [
    {
      name: "Speaking",
      slug: "speaking",
      icon: MicrophoneIcon,
      color: "bg-speaking",
      lightBg: "bg-blue-50",
      textColor: "text-speaking",
      description: "Improve your spoken English with AI-powered feedback",
      exercises: ["Read Aloud", "Repeat Sentence", "Describe Image", "Re-tell Lecture", "Answer Short Question"],
      totalExercises: 45,
      completed: 23,
      averageScore: 74,
      estimatedTime: "15-20 min",
    },
    {
      name: "Writing",
      slug: "writing",
      icon: PencilSquareIcon,
      color: "bg-writing",
      lightBg: "bg-purple-50",
      textColor: "text-writing",
      description: "Master essay writing and text summarization",
      exercises: ["Summarize Written Text", "Essay Writing (200 words)", "Essay Writing (300 words)"],
      totalExercises: 30,
      completed: 18,
      averageScore: 68,
      estimatedTime: "20-30 min",
    },
    {
      name: "Reading",
      slug: "reading",
      icon: BookOpenIcon,
      color: "bg-reading",
      lightBg: "bg-amber-50",
      textColor: "text-reading",
      description: "Enhance reading comprehension and speed",
      exercises: [
        "Multiple Choice (Single)",
        "Multiple Choice (Multiple)",
        "Re-order Paragraphs",
        "Fill in the Blanks",
        "Reading & Writing Fill in Blanks",
      ],
      totalExercises: 60,
      completed: 42,
      averageScore: 76,
      estimatedTime: "10-15 min",
    },
    {
      name: "Listening",
      slug: "listening",
      icon: SpeakerWaveIcon,
      color: "bg-listening",
      lightBg: "bg-pink-50",
      textColor: "text-listening",
      description: "Develop listening skills with varied accents",
      exercises: [
        "Summarize Spoken Text",
        "Multiple Choice (Single)",
        "Multiple Choice (Multiple)",
        "Fill in the Blanks",
        "Highlight Correct Summary",
        "Select Missing Word",
        "Highlight Incorrect Words",
        "Write From Dictation",
      ],
      totalExercises: 55,
      completed: 28,
      averageScore: 70,
      estimatedTime: "15-25 min",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Practice Modules</h1>
        <p className="text-gray-600 text-base md:text-lg">Choose a skill to practice and improve your PTE score</p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const Icon = skill.icon;
          const progressPercentage = Math.round((skill.completed / skill.totalExercises) * 100);

          return (
            <div
              key={skill.slug}
              className="bg-white rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl ${skill.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-gray-900">{skill.name}</h2>
                    <p className="text-sm text-gray-500">{skill.description}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Average Score</p>
                  <p className={`font-display text-2xl font-bold ${skill.textColor}`}>{skill.averageScore}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Completed</p>
                  <p className="font-display text-2xl font-bold text-gray-900">
                    {skill.completed}/{skill.totalExercises}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Est. Time</p>
                  <p className="font-semibold text-sm text-gray-900 flex items-center gap-1 mt-1">
                    <ClockIcon className="w-4 h-4" />
                    {skill.estimatedTime}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-semibold text-gray-900">{progressPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} transition-all duration-500`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Exercise Types */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Exercise Types:</p>
                <div className="flex flex-wrap gap-2">
                  {skill.exercises.map((exercise, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {exercise}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={`/practice/${skill.slug}`}
                className={`flex items-center justify-center gap-2 w-full px-4 py-3 ${skill.color} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity`}>
                Start Practicing
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="mt-8 bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6">
        <h3 className="font-display text-xl font-bold text-brand-900 mb-4">💡 Practice Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-900 text-sm">Daily Practice</p>
              <p className="text-xs text-brand-700">Practice at least 30 minutes every day</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-900 text-sm">Review Feedback</p>
              <p className="text-xs text-brand-700">Always review AI feedback to improve</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircleIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-900 text-sm">Focus on Weak Areas</p>
              <p className="text-xs text-brand-700">Target skills with lower scores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
