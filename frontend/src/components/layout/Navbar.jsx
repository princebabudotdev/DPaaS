import React from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon, RotateCcw, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

import {
  Bell,
  User,
  LayoutDashboard,
  Palette,
  Github,
  BarChart3,
  Shield,
  FileText,
  Settings,
  Globe,
} from "lucide-react";

export const dpaasFeatures = [
  {
    name: "Dashboard",
    description: "Overview of portfolio status, sync state, and activity",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "My Portfolio",
    description: "View and manage your public developer portfolio",
    icon: Globe,
    path: "/portfolio/me",
  },
  {
    name: "Portfolio Customization",
    description: "Themes, layout, sections, and branding options",
    icon: Palette,
    path: "/portfolio/themes",
  },
  {
    name: "GitHub Integration",
    description: "Connect and sync repositories & contributions",
    icon: Github,
    path: "/github/connect",
  },
  {
    name: "Analytics",
    description: "Track visitors, views, and engagement",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    name: "Notifications",
    description: "Updates about sync, views, and platform changes",
    icon: Bell,
    path: "/notifications",
  },
  {
    name: "Profile Settings",
    description: "Update personal info, bio, skills, and links",
    icon: User,
    path: "/settings/profile",
  },
  {
    name: "Security & Auth",
    description: "Manage password, OAuth, and sessions",
    icon: Shield,
    path: "/settings/security",
  },
  {
    name: "Docs & API",
    description: "Platform documentation and developer APIs",
    icon: FileText,
    path: "/docs",
  },
  {
    name: "Account Settings",
    description: "Plans, billing, and account preferences",
    icon: Settings,
    path: "/settings",
  },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Docs", path: "/docs" },
    { name: "Pricing", path: "/pricing" },
    { name: "Changelog", path: "/changelog" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className="
          w-full h-14 flex items-center gap-6 px-4
        bg-[#f8fafc] dark:bg-[#010409]
        border-b border-neutral-200 dark:border-neutral-800
      "
    >
      {/* Logo */}
      {/* <div className="text-lg font-semibold tracking-tight
        text-neutral-900 dark:text-neutral-100">
        <span className="text-indigo-600 dark:text-indigo-400">
          DP
        </span>
        aaS
      </div> */}

      {/* Search */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search
            size={16}
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              text-neutral-500 dark:text-neutral-400
            "
          />
          <input
            type="text"
            placeholder="Search docs, features, blogs…"
            className="
              w-full h-9 pl-9 pr-4 rounded-md text-sm
              bg-white dark:bg-[#0d1117]
              border border-neutral-300 dark:border-neutral-700
              text-neutral-900 dark:text-neutral-100
              placeholder-neutral-400 dark:placeholder-neutral-500
              focus:outline-none focus:ring-2
              focus:ring-indigo-500/40 dark:focus:ring-indigo-400/40
            "
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <span
                  className="
                    group relative px-2 py-1 text-sm font-medium transition
                    text-neutral-600 hover:text-neutral-900
                    dark:text-neutral-400 dark:hover:text-white
                  "
                >
                  {item.name}
                  <span
                    className={`
                      absolute left-0 -bottom-0.5 h-[1.5px] w-full
                      bg-indigo-600 dark:bg-indigo-400
                      transform transition-transform duration-300
                      ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                      origin-left
                    `}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Refresh */}
        <button
          className="
            p-2 rounded-md transition
            text-neutral-600 hover:text-neutral-900
            dark:text-neutral-400 dark:hover:text-white
            hover:bg-neutral-200 dark:hover:bg-neutral-800
          "
          title="Refresh"
          onClick={() => window.location.reload()}
        >
          <RotateCcw size={16} />
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-md transition
            text-neutral-600 hover:text-neutral-900
            dark:text-neutral-400 dark:hover:text-white
            hover:bg-neutral-200 dark:hover:bg-neutral-800
          "
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Profile */}
        <div
          className="
          ml-1 w-8 h-8 rounded-full
          bg-neutral-300 dark:bg-neutral-700
          flex items-center justify-center
          text-xs font-semibold
          text-neutral-900 dark:text-neutral-100
        "
        >
          P
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
