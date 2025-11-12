"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  ChartBarIcon,
  MicrophoneIcon,
  PencilSquareIcon,
  SpeakerWaveIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronRightIcon as ChevronRightSmallIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils"; // classNames helper (like clsx)

// --- Navigation Config ---
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Practice",
    href: "/practice",
    icon: BookOpenIcon,
    children: [
      { name: "Speaking", href: "/practice/speaking", icon: MicrophoneIcon },
      { name: "Writing", href: "/practice/writing", icon: PencilSquareIcon },
      { name: "Reading", href: "/practice/reading", icon: DocumentTextIcon },
      { name: "Listening", href: "/practice/listening", icon: SpeakerWaveIcon },
    ],
  },
  { name: "Mock Tests", href: "/mock-tests", icon: AcademicCapIcon },
  { name: "Progress", href: "/progress", icon: ChartBarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<boolean>(pathname.startsWith("/practice"));

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenDropdown((prev) => !prev);
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed top-16 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-20"
      )}>
      {/* === Header === */}
      <div className="flex items-center justify-center p-4">
        <span className="font-bold text-gray-800 text-lg">Menu</span>
      </div>

      {/* === Navigation === */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hidden">
        {navigation.map(({ name, href, icon: Icon, children }) => {
          const active = pathname.startsWith(href);
          const isPractice = name === "Practice";

          return (
            <div key={name}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                  active ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={isPractice ? handleToggleDropdown : undefined}>
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    active ? "text-brand-600" : "text-gray-500 group-hover:text-gray-700"
                  )}
                />
                <span>{name}</span>
                {isPractice && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDropdown(e);
                    }}
                    className="ml-auto p-1 rounded-md hover:bg-gray-200"
                    aria-label="Toggle Practice Menu">
                    {openDropdown ? (
                      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRightSmallIcon className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                )}
              </Link>{" "}
              {/* Dropdown (only visible when open) */}
              {isPractice && openDropdown && (
                <div className="ml-6 mt-1 space-y-1 border-l-2 border-brand-100 pl-3">
                  {children!.map(({ name, href, icon: ChildIcon }) => {
                    const childActive = pathname === href;
                    return (
                      <Link
                        key={name}
                        href={href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                          childActive
                            ? "bg-brand-100 text-brand-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}>
                        <ChildIcon className="w-4 h-4" />
                        {name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* === Footer (optional) === */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-4">
          <p className="text-sm font-semibold text-brand-900 mb-1">💡 Quick Tip</p>
          <p className="text-xs text-brand-700">Practice daily for 30 minutes to maintain your streak!</p>
        </div>
      </div>
    </aside>
  );
}
