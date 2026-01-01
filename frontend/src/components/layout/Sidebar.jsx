import { NavLink } from "react-router-dom";
// import { dpaasSideMenu } from "./dpaasSideMenu";
// import { LogOut } from "lucide-react";

// dpaasSideMenu.js
import {
  LayoutDashboard,
  Globe,
  Palette,
  Github,
  BarChart3,
  Bell,
  User,
  Shield,
  Settings,
  LogOut,
} from "lucide-react";

 const dpaasSideMenu = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "My Portfolio", path: "/portfolio/me", icon: Globe },
  { name: "Customize", path: "/portfolio/themes", icon: Palette },
  { name: "GitHub Sync", path: "/github/connect", icon: Github },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Profile", path: "/settings/profile", icon: User },
  { name: "Security", path: "/settings/security", icon: Shield },
  { name: "Settings", path: "/settings", icon: Settings },
];


const SideMenu = () => {
  return (
    <aside
      className="
      
        w-64 h-screen flex flex-col
        bg-[#f8fafc] dark:bg-[#010409]
        border-r border-neutral-200 dark:border-neutral-800
        text-neutral-900 dark:text-neutral-100
      "
    >
      {/* Logo */}
      <div className="px-6 py-5 text-xl font-semibold tracking-tight">
        <span className="text-indigo-600 dark:text-indigo-400">DP</span>aaS
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1">
        {dpaasSideMenu.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {({ isActive }) => (
              <div
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-md
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                  }
                `}
              >
                <item.icon size={18} />
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-neutral-200 dark:border-neutral-800">
        <button
          className="
            w-full flex items-center gap-3 px-4 py-2.5 rounded-md
            text-sm font-medium
            text-neutral-600 dark:text-neutral-400
            hover:bg-neutral-200 dark:hover:bg-neutral-800
            hover:text-neutral-900 dark:hover:text-white
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
