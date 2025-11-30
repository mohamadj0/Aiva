import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />
      <div className="flex container mx-auto max-w-7xl">
        <Sidebar />
        <main className="flex-1 w-full lg:max-w-2xl xl:max-w-3xl mx-auto p-4 pb-24 lg:pb-8">
          <Outlet />
        </main>
        {/* Right Sidebar for Desktop - Suggestions/Events */}
        <aside className="hidden xl:block w-80 p-4 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-4">
            <h3 className="font-bold text-secondary-800 mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="bg-primary-50 text-primary-700 rounded-lg p-2 text-center min-w-[50px]">
                  <div className="text-xs font-bold">NOV</div>
                  <div className="text-lg font-bold">12</div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold line-clamp-1">Global AI Ethics Symposium</h4>
                  <p className="text-xs text-gray-500">MIT Union • Live</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <BottomNav />
    </div>
  );
}
