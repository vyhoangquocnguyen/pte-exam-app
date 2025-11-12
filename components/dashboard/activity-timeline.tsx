"use client";

import Link from "next/link";
import { skillConfig, Activity } from "@/types";
import { ClockIcon } from "@heroicons/react/24/outline";
import { getScoreColor } from "@/lib/utils";

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 bg-white rounded-2xl p-6 card-shadow">
      {activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No recent activity. Start practicing!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(({type, exerciseId, task, score, time}) => {
            const config = skillConfig[type];
            const Icon = config.icon;
            const scoreColor = getScoreColor(score);

            return (
              <div
                key={exerciseId}
                className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 md:flex-1">
                  <div
                    className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 truncate">{task}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="capitalize">{config.displayName}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-gray-500">Score</p>
                    <p className={`font-display text-2xl font-bold ${scoreColor}`}>{score}</p>
                  </div>
                  <Link
                    href={`/practice/${type}/${exerciseId}/results`}
                    className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Review
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activities.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <Link
            href="/progress"
            className="block w-full text-center px-4 py-2 text-brand-600 font-semibold hover:bg-brand-50 rounded-lg transition-colors">
            View All Activity
          </Link>
        </div>
      )}
    </div>
  );
};
export default ActivityTimeline;
