import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SideMenu from "../components/layout/Sidebar";

const AppLayout = ({ children }) => {
  const location = useLocation();

  // Routes where layout should NOT appear
  const authRoutes = ["/login", "/signup", "/forgotPassword" , ];

  const hideLayout = authRoutes.includes(location.pathname);

  // If auth route → render only page
  if (hideLayout) {
    return (
      <div className="min-h-screen w-full bg-white dark:bg-[#0D1117]">
        {children}
      </div>
    );
  }

  // Normal app layout
  return (
    <div className="h-screen w-full bg-white dark:bg-[#0D1117] flex">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <SideMenu />
      </div>

      {/* Main Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-64 right-0 h-14 z-40">
          <Navbar />
        </div>

        {/* Scrollable Content */}
        <main className="pt-14 px-8 py-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
