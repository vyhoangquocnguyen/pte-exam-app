// "use client";

import Link from "next/link";
import { BookOpenIcon, MicrophoneIcon, PencilSquareIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { SkillType } from "@/types";

interface Skill {
  name: SkillType;
  score: number;
  progress: number;
  recentTests: number;
}

interface SkillsGridProps {
  skills: Skill[];
}

const skillConfig: Record<
  SkillType,
  {
    icon: React.ElementType;
    color: string;
    lightColor: string;
    textColor: string;
    displayName: string;
  }
> = {
  speaking: {
    icon: MicrophoneIcon,
    color: "bg-speaking",
    lightColor: "bg-blue-50",
    textColor: "text-speaking",
    displayName: "Speaking",
  },
  writing: {
    icon: PencilSquareIcon,
    color: "bg-writing",
    lightColor: "bg-purple-50",
    textColor: "text-writing",
    displayName: "Writing",
  },
  reading: {
    icon: BookOpenIcon,
    color: "bg-reading",
    lightColor: "bg-amber-50",
    textColor: "text-reading",
    displayName: "Reading",
  },
  listening: {
    icon: SpeakerWaveIcon,
    color: "bg-listening",
    lightColor: "bg-pink-50",
    textColor: "text-listening",
    displayName: "Listening",
  },
};

const SkillsGrid = ({ skills }: SkillsGridProps) =>{
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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