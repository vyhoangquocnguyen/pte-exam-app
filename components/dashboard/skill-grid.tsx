// "use client";

import Link from "next/link";
import { skillConfig , SkillSummary} from "@/types";

interface SkillsGridProps {
  skills: SkillSummary[];
}

const SkillsGrid = ({ skills }: SkillsGridProps) =>{
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map(({ name, score, progress, recentTests }) => {
        const config = skillConfig[name];
        const Icon = config.icon;

        return (
          <div
            key={name}
            className="bg-white rounded-2xl p-6 card-shadow hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${config.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-gray-900">{config.displayName}</h3>
                  <p className="text-sm text-gray-500">Latest Score</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-display text-3xl font-bold ${config.textColor}`}>{score}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-gray-900">{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${config.color} rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{recentTests} tests completed</p>
            </div>

            <Link
              href={`/practice/${name}`}
              className={`block w-full px-4 py-2.5 ${config.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity text-center`}>
              Practice Now
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SkillsGrid;