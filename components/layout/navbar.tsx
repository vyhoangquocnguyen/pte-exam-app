"use client";

import { useState } from "react";

import {
  AcademicCapIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  HomeIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Practice", href: "/practice", icon: BookOpenIcon },
    { name: "Mock Tests", href: "/mock-test", icon: AcademicCapIcon },
    { name: "Progress", href: "/progress", icon: ChartBarIcon },
  ];
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 ">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-xl text-white font-bold font-display">P</span>
            </div>
            <span className="font-display font-bold text-xl test-gray-900">PTE Master</span>
          </div>

          {/* Desktop Navigator */}
          {/* <div className="hidden md:flex items-center gap-8">
            {navigation.map(({ name, href, icon: Icon }) => {
              return (
                <a key={name} href={href} className="text-sm font-medium text-gray-900 hover:text-brand-500">
                  <Icon className="h-6 w-6" />
                  {name}
                </a>
              );
            })}
          </div> */}

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-brand-50">
              <span className="text-sm font-semibold text-brand-700">Score : 72</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <span className="text-whiet text-sm font-semnibold">JD</span>
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigator */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-4 space-y-1 ">
            {/* {navigation.map(({ name, href, icon: Icon }) => {
              return (
                <a
                  key={name}
                  href={href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{name}</span>
                </a>
              );
            })} */}

            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-3">
                <UserCircleIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-semibold text-gray-900">John Doe</p>
              <p className="text-sm text-gray-500">Score: 72</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
