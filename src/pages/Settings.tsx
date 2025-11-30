import { useState } from "react";
import { User, Shield, Smartphone, Bell, HelpCircle, Folder, Palette } from "lucide-react";
import { cn } from "../lib/utils";

// Import Sub-Components
import { ChatFolderSettings } from "../components/settings/ChatFolderSettings";
import { ChatAppearanceSettings } from "../components/settings/ChatAppearanceSettings";
import { AccountSettings } from "../components/settings/AccountSettings";
import { PrivacySettings } from "../components/settings/PrivacySettings";
import { GeneralSettings } from "../components/settings/GeneralSettings";
import { NotificationSettings } from "../components/settings/NotificationSettings";
import { SupportSettings } from "../components/settings/SupportSettings";

const SECTIONS = [
  { id: "appearance", label: "Chat Appearance", icon: Palette },
  { id: "folders", label: "Chat Folders", icon: Folder },
  { id: "account", label: "Account & Security", icon: User },
  { id: "privacy", label: "Privacy & Data", icon: Shield },
  { id: "general", label: "General & Preferences", icon: Smartphone },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "support", label: "Support & Feedback", icon: HelpCircle },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("appearance");

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-100px)]">
      {/* Settings Sidebar */}
      <aside className="w-full lg:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-fit overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="font-bold text-xl text-secondary-900 dark:text-white">Settings</h2>
        </div>
        <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                activeSection === section.id
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary border-b-2 lg:border-b-0 lg:border-l-4 border-primary"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white lg:border-l-4 lg:border-transparent"
              )}
            >
              <section.icon className="h-5 w-5" />
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 animate-fade-in min-w-0">
        {activeSection === "appearance" && <ChatAppearanceSettings />}
        {activeSection === "folders" && <ChatFolderSettings />}
        {activeSection === "account" && <AccountSettings />}
        {activeSection === "privacy" && <PrivacySettings />}
        {activeSection === "general" && <GeneralSettings />}
        {activeSection === "notifications" && <NotificationSettings />}
        {activeSection === "support" && <SupportSettings />}
      </main>
    </div>
  );
}
