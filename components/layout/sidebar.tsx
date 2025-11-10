"use client";

import { useState, useEffect, useCallback } from "react";
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
  XMarkIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronRightIcon as ChevronRightIconSmall,
} from "@heroicons/react/24/outline";

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(" ");

// --- Navigation Data ---
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, description: "Overview & stats" },
  {
    name: "Practice",
    href: "/practice",
    icon: BookOpenIcon,
    description: "Practice modules",
    children: [
      { name: "Speaking", href: "/practice/speaking", icon: MicrophoneIcon },
      { name: "Writing", href: "/practice/writing", icon: PencilSquareIcon },
      { name: "Reading", href: "/practice/reading", icon: DocumentTextIcon },
      { name: "Listening", href: "/practice/listening", icon: SpeakerWaveIcon },
    ],
  },
  { name: "Mock Tests", href: "/mock-tests", icon: AcademicCapIcon, description: "Full-length tests" },
  { name: "Progress", href: "/progress", icon: ChartBarIcon, description: "Analytics & insights" },
];

const isActive = (pathname: string, href: string) => {
  if (href === "/dashboard") return pathname === href;
  return pathname.startsWith(href);
};

// --- STANDALONE SidebarContent Component ---

interface SidebarContentProps {
  openState: boolean;
  toggleFunc: () => void;
  isMobile?: boolean;
  closeMobileSidebar?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  openState,
  toggleFunc,
  isMobile = false,
  closeMobileSidebar,
}) => {
  const pathname = usePathname();
  const handleLinkClick = isMobile ? closeMobileSidebar : undefined;

  // State to manage the dropdown's open/closed status independently
  const [isPracticeDropdownOpen, setIsPracticeDropdownOpen] = useState(isActive(pathname, "/practice"));

  // Sync dropdown state when the path changes externally
  useEffect(() => {
    setIsPracticeDropdownOpen(isActive(pathname, "/practice"));
  }, [pathname]);

  // Handle toggling the practice dropdown
  const togglePracticeDropdown = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop the Link from navigating immediately
    setIsPracticeDropdownOpen((prev) => !prev);
  };

  return (
    <div className="h-full flex flex-col bg-white text-gray-800">
      {/* Header Area (omitted for brevity, assume it's same as previous) */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
        {isMobile ? (
          <>
            <span className="font-bold text-gray-800 text-lg">Menu</span>
            <button onClick={toggleFunc} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            {openState && <span className="font-bold text-gray-800 text-lg">Menu</span>}
            <button
              onClick={toggleFunc}
              className={cn("p-1 rounded-full hover:bg-gray-200 transition-colors", openState ? "ml-auto" : "mx-auto")}
              aria-label="Toggle Sidebar">
              {openState ? (
                <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map(({icon:Icon, name, href, children, description}) => {
          const active = isActive(pathname,href);

          // Determine if this is the 'Practice' item to handle the dropdown logic
          const isPracticeItem = name === "Practice" && children;

          return (
            <div key={name}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                  active ? "bg-brand-50 text-brand-700" : "text-gray-700 hover:bg-gray-100",
                  !openState && !isMobile ? "justify-center px-0" : ""
                )}
                title={!openState && !isMobile ? name : ""}
                onClick={handleLinkClick}>
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    active ? "text-brand-600" : "text-gray-500 group-hover:text-gray-700",
                    !openState && !isMobile ? "mx-auto" : ""
                  )}
                />
                {(openState || isMobile) && (
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-semibold text-sm", active && "text-brand-700")}>{name}</p>
                    <p className="text-xs text-gray-500 truncate">{description}</p>
                  </div>
                )}

                {/* Dropdown Indicator/Button: Appears if there are children AND sidebar is open */}
                {isPracticeItem && (openState || isMobile) && (
                  <button
                    onClick={togglePracticeDropdown}
                    className="p-1 -mr-2 rounded-md hover:bg-gray-200"
                    aria-label={isPracticeDropdownOpen ? "Collapse practice section" : "Expand practice section"}>
                    {isPracticeDropdownOpen ? (
                      <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRightIconSmall className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                )}
              </Link>

              {/* Sub-navigation (Only show if dropdown is open and sidebar is wide enough) */}
              {isPracticeItem && isPracticeDropdownOpen && (openState || isMobile) && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-brand-200 pl-4">
                  {children!.map(({href, icon: ChildIcon, name}) => {
                    // '!' asserts children is present here
                    const childActive = pathname === href;
                    return (
                      <Link
                        key={name}
                        href={href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          childActive
                            ? "bg-brand-100 text-brand-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                        onClick={handleLinkClick}>
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

      {/* Footer (omitted for brevity, assume it's same as previous) */}
      {(openState || isMobile) && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-xl p-4">
            <p className="text-sm font-semibold text-brand-900 mb-1">💡 Quick Tip</p>
            <p className="text-xs text-brand-700">Practice daily for 30 minutes to maintain your streak!</p>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Sidebar Component (This is exported as default) ---
// (This section remains unchanged from the previous version, handling mobile/desktop layout switches)
export default function Sidebar() {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleDesktop = useCallback(() => setIsDesktopOpen((prev) => !prev), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <>
      {/* Mobile Menu Button (Floating action button) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg hover:bg-brand-700 transition-colors flex items-center justify-center">
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={closeMobile} />}

      {/* Sidebar - Mobile (slide-in) */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        <SidebarContent
          openState={isMobileOpen}
          toggleFunc={closeMobile}
          isMobile={true}
          closeMobileSidebar={closeMobile}
        />
      </aside>

      {/* Sidebar - Desktop (fixed, always visible, dynamic width) */}
      <aside
        className={cn(
          "hidden lg:block fixed top-0 bottom-0 left-0 bg-white border-r border-gray-200 z-20 transition-all duration-300",
          isDesktopOpen ? "w-64" : "w-20"
        )}>
        <SidebarContent openState={isDesktopOpen} toggleFunc={toggleDesktop} isMobile={false} />
      </aside>
    </>
  );
}
