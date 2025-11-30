import { Home, Building2, Calendar, Settings, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export function BottomNav() {
  const location = useLocation();

  const NAV_ITEMS = [
    { icon: Home, label: "Home", path: "/feed" },
    { icon: Users, label: "My Friends", path: "/messages" },
    { icon: Building2, label: "Unions", path: "/unions" },
    { icon: Calendar, label: "Events", path: "/events" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 min-w-0",
                isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium truncate w-full text-center px-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
