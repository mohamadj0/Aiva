import { useEffect } from "react";
import { Smartphone, Moon, Sun, Globe, Type } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const LANGUAGES = [
  { code: "en", name: "English (US)" },
  { code: "fa", name: "فارسی (Persian)" },
  { code: "ar", name: "العربية (Arabic)" },
  { code: "zh-CN", name: "简体中文 (Chinese Simplified)" },
  { code: "zh-TW", name: "繁體中文 (Chinese Traditional)" },
  { code: "ru", name: "Русский (Russian)" },
  { code: "la", name: "Lingua Latina (Latin)" },
  { code: "es", name: "Español (Spanish)" },
  { code: "fr", name: "Français (French)" },
  { code: "de", name: "Deutsch (German)" },
  { code: "it", name: "Italiano (Italian)" },
  { code: "pt", name: "Português (Portuguese)" },
  { code: "ja", name: "日本語 (Japanese)" },
  { code: "ko", name: "한국어 (Korean)" },
  { code: "tr", name: "Türkçe (Turkish)" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "ms", name: "Bahasa Melayu" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)" },
  { code: "th", name: "ไทย (Thai)" },
  { code: "nl", name: "Nederlands (Dutch)" },
  { code: "pl", name: "Polski (Polish)" },
  { code: "uk", name: "Українська (Ukrainian)" },
];

export function GeneralSettings() {
  const [darkMode, setDarkMode] = useLocalStorage("theme_dark", false);
  const [language, setLanguage] = useLocalStorage("app_language", "en");
  const [fontSize, setFontSize] = useLocalStorage("font_size", "medium");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
        <Smartphone className="h-5 w-5 text-primary" />
        Display & Preferences
      </h3>

      <div className="space-y-4">
        {/* Theme */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="h-6 w-6 text-primary" /> : <Sun className="h-6 w-6 text-orange-500" />}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Appearance</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Switch between Light and Dark mode.</p>
            </div>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
          >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Language</h4>
              <p className="text-xs text-gray-500">Select your preferred interface language.</p>
            </div>
          </div>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary max-w-[200px]"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Type className="h-5 w-5 text-gray-500" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Font Size</h4>
              <p className="text-xs text-gray-500">Adjust text readability.</p>
            </div>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {['small', 'medium', 'large'].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  fontSize === size 
                    ? 'bg-white dark:bg-gray-600 text-primary shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
