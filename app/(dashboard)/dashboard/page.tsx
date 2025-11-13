import ActivityTimeline from "@/components/dashboard/activity-timeline";
import HeroStats from "@/components/dashboard/hero-stats";
import SkillsGrid from "@/components/dashboard/skill-grid";

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
    { type: "speaking" as const, task: "Read Aloud", score: 78, time: "2 hours ago", exerciseId: "ex123" },
    { type: "writing" as const, task: "Essay Writing", score: 72, time: "5 hours ago", exerciseId: "ex456" },
    { type: "reading" as const, task: "MCQ Multiple", score: 82, time: "1 day ago", exerciseId: "ex789" },
  ];

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ">
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
          <ActivityTimeline activities={recentActivity} />
        </div>
      </div>
    </div>
  );
}
