import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { name: "Features", path: "/features" },
  { name: "Docs", path: "/docs" },
  { name: "Pricing", path: "/pricing" },
  { name: "Blog", path: "/blog" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            DPaaS
          </NavLink>``

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition
                   ${
                     isActive
                       ? "text-gray-900 dark:text-white"
                       : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-black dark:bg-white rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth */}
            <NavLink
              to="/login"
              className="hidden sm:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Sign in
            </NavLink>

            {/* Black Primary Button */}
            <NavLink
              to="/signup"
              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
