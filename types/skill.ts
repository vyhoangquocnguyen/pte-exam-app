    import { BookOpenIcon, MicrophoneIcon, PencilSquareIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
    import type { SkillType } from "./index";

    // Centralized config for all skill types
    export const skillConfig: Record<
    SkillType,
    {
        icon: React.ElementType;
        displayName: string;
        color: string;
        lightColor: string;
        textColor: string;
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

    // Helper types
    export interface SkillSummary {
    name: SkillType;
    score: number;
    progress: number;
    recentTests: number;
    }

    export interface Activity {
    type: SkillType;
    task: string;
    score: number;
    time: string;
    exerciseId: string;
    }

