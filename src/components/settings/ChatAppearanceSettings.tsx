import { Palette, MessageCircle } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { cn } from "../../lib/utils";

const THEMES = [
  { id: "default", name: "Classic Blue", color: "bg-blue-600", bubble: "bg-blue-600" },
  { id: "orange", name: "Royal Orange", color: "bg-[#FF4500]", bubble: "bg-[#FF4500]" },
  { id: "emerald", name: "Emerald Green", color: "bg-emerald-600", bubble: "bg-emerald-600" },
  { id: "purple", name: "Midnight Purple", color: "bg-purple-600", bubble: "bg-purple-600" },
  { id: "rose", name: "Rose Pink", color: "bg-rose-500", bubble: "bg-rose-500" },
  { id: "slate", name: "Slate Gray", color: "bg-slate-700", bubble: "bg-slate-700" },
  { id: "teal", name: "Ocean Teal", color: "bg-teal-600", bubble: "bg-teal-600" },
];

export function ChatAppearanceSettings() {
  const [activeTheme, setActiveTheme] = useLocalStorage("chat_theme", "default");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Chat Appearance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Customize the look and feel of your messaging experience.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Theme Selection */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Color Theme</h4>
          <div className="grid grid-cols-1 gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl border transition-all",
                  activeTheme === theme.id
                    ? "border-primary bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary"
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <div className={cn("w-10 h-10 rounded-full shadow-sm", theme.color)}></div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-gray-900 dark:text-white">{theme.name}</div>
                </div>
                {activeTheme === theme.id && (
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6 flex flex-col justify-center border border-gray-200 dark:border-gray-700 h-fit sticky top-6">
          <h4 className="text-xs font-bold text-gray-400 uppercase text-center mb-6">Preview</h4>
          <div className="space-y-4 w-full max-w-xs mx-auto">
            {/* Incoming */}
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700 max-w-[85%]">
                <p className="text-sm">Hey! How do you like the new theme?</p>
              </div>
            </div>
            
            {/* Outgoing (Themed) */}
            <div className="flex justify-end">
              <div className={cn(
                "text-white px-4 py-2 rounded-2xl rounded-br-none shadow-sm max-w-[85%]",
                THEMES.find(t => t.id === activeTheme)?.bubble || "bg-blue-600"
              )}>
                <p className="text-sm">It looks amazing! Love the colors. 😍</p>
                <div className="text-[10px] text-white/80 text-right mt-1 flex items-center justify-end gap-1">
                  10:42 AM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
