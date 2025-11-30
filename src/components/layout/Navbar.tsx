import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/feed" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-xl">
              U
            </div>
            <span className="text-xl font-bold text-secondary-900 hidden md:block">Unigap</span>
          </Link>
          <div className="relative hidden md:block ml-8">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="search"
              placeholder="Search unions, people..."
              className="h-9 w-64 rounded-full bg-gray-100 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell className="h-6 w-6" />
          </button>
          <Link to="/profile/me" className="h-9 w-9 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" alt="Profile" />
          </Link>
        </div>
      </div>
    </header>
  );
}
