import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import Switch from "../ui/ToogleTheme";

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Projects", path: "/projects" },
  { name: "Docs", path: "/docs" },
  { name: "Pricing", path: "/pricing" },
];

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold text-indigo-600"
          >
            DPaaS
          </NavLink>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition-colors
                   ${
                     isActive
                       ? "text-indigo-600 dark:text-indigo-400"
                       : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                   }
                   after:absolute after:left-0 after:-bottom-1 after:h-[2px]
                   after:bg-indigo-600 after:transition-all
                   ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <Switch />

            {/* Auth / Profile */}
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white dark:bg-[#020617] shadow-lg border border-gray-200 dark:border-gray-800">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Settings
                    </NavLink>

                    <NavLink
                      to="/billing"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Billing
                    </NavLink>

                    <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
