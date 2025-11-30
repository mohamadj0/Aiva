import { Home, Building2, Calendar, User, LogOut, Settings, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/feed" },
  { icon: Users, label: "My Friends", path: "/messages" },
  { icon: Building2, label: "Unions", path: "/unions" },
  { icon: Calendar, label: "Events", path: "/events" },
  { icon: User, label: "Profile", path: "/profile/me" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-500 dark:text-gray-400")} />
              {item.label}
            </Link>
          );
        })}
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
