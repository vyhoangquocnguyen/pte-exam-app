import {
  TrophyIcon,
  ClipboardDocumentCheckIcon,
  FireIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

import {HeroStatsProps} from "@/types";

const HeroStats = ({ stats }: { stats: HeroStatsProps }) => {
  const statCards = [
    {
      label: "Overall Score",
      value: stats.totalScore,
      icon: TrophyIcon,
      bgColor: "bg-brand-50",
      iconColor: "text-brand-600",
      trend: "↑ 4 points this week",
      trendColor: "text-green-600",
      showTrend: true,
    },
    {
      label: "Tests Completed",
      value: stats.testCompleted,
      icon: ClipboardDocumentCheckIcon,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "12 this month",
      trendColor: "text-gray-500",
      showTrend: false,
    },
    {
      label: "Study Streak",
      value: stats.studyStreak,
      icon: FireIcon,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "days in a row 🔥",
      trendColor: "text-gray-500",
      showTrend: false,
    },
    {
      label: "Next Goal",
      value: stats.nextGoal,
      icon: ChartBarIcon,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: `${stats.nextGoal - stats.totalScore} points to go`,
      trendColor: "text-gray-500",
      showTrend: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map(({ icon: Icon, label, bgColor, iconColor, trend, trendColor, value, showTrend }) => {
        return (
          <div
            key={label}
            className="bg-white rounded-2xl p-6 card-shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
              </div>
              {showTrend && <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />}
            </div>

            <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
            <p className="font-display text-5xl font-bold text-gray-900 mb-2">{value}</p>
            <p className={`text-sm ${trendColor}`}>{trend}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;
