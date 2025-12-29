import { useState } from "react";
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  Github,
} from "lucide-react";

const navItems = ["Dashboard", "Projects", "Issues"];

export default function Navbar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <nav className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Left */}
          <div className="flex items-center gap-6">
            <Github className="h-7 w-7 text-slate-900 dark:text-white" />

            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`relative text-sm font-medium transition
                  ${
                    active === item
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }
                `}
              >
                {item}

                {/* Active underline */}
                {active === item && (
                  <span className="absolute -bottom-4 left-0 h-0.5 w-full bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex flex-1 justify-center">
            <div className="relative w-full max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition" />
              <input
                type="text"
                placeholder="Search or jump to..."
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 py-2 pl-9 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 border rounded px-1.5 py-0.5 group-focus-within:border-indigo-500 transition">
                /
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Create */}
            <button className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition">
              <Plus size={18} />
              <ChevronDown size={14} />
            </button>

            {/* Notifications */}
            <button className="relative rounded-md p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition">
              <Bell size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Avatar */}
            <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <img
                src="https://avatars.githubusercontent.com/u/1?v=4"
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
              <ChevronDown size={14} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
