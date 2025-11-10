import HeroStats from "@/components/dashboard/hero-stats";
import SkillsGrid from "@/components/dashboard/skill-grid";
import {

  MicrophoneIcon,
  PencilSquareIcon,
  BookOpenIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  // Mock data
  const stats = {
    totalScore: 72,
    testCompleted: 24,
    studyStreak: 7,
    nextGoal: 79,
  };

  const skills = [
    {
      name: "speaking" as const,
      score: 74,
      progress: 82,
      recentTests: 2,
    },
    {
      name: "writing" as const,
      score: 68,
      progress: 76,
      recentTests: 1,
    },
    {
      name: "reading" as const,
      score: 76,
      progress: 84,
      recentTests: 1,
    },
    {
      name: "listening" as const,
      score: 70,
      progress: 78,
      recentTests: 2,
    },
  ];

  const recentActivity = [
    { type: "Speaking", task: "Read Aloud", score: 78, time: "2 hours ago" },
    { type: "Writing", task: "Essay Writing", score: 72, time: "5 hours ago" },
    { type: "Reading", task: "MCQ Multiple", score: 82, time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 lg:pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-600 text-lg">You're on a {stats.studyStreak}-day streak. Keep it up!</p>
        </div>

        {/* Hero Stats */}
        <HeroStats stats={stats} />

        {/* Skills Grid */}
        <div className="mb-8">
          <h2 className="font-display text-3xl font-semibold text-gray-900 mb-6">Your Skills</h2>
          <SkillsGrid skills={skills} />
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="font-display text-3xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${
                        activity.type === "Speaking"
                          ? "bg-blue-50"
                          : activity.type === "Writing"
                          ? "bg-purple-50"
                          : "bg-amber-50"
                      } flex items-center justify-center`}>
                      {activity.type === "Speaking" && <MicrophoneIcon className="w-6 h-6 text-speaking" />}
                      {activity.type === "Writing" && <PencilSquareIcon className="w-6 h-6 text-writing" />}
                      {activity.type === "Reading" && <BookOpenIcon className="w-6 h-6 text-reading" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.task}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Score</p>
                      <p className="font-display text-2xl font-bold text-gray-900">{activity.score}</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
