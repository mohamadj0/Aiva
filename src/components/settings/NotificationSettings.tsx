import { Bell, Mail, MessageSquare, Heart } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function NotificationSettings() {
  const [notifSettings, setNotifSettings] = useLocalStorage("notifications", {
    push_likes: true,
    push_comments: true,
    push_messages: true,
    email_digest: false,
    email_security: true
  });

  const toggle = (key: keyof typeof notifSettings) => {
    setNotifSettings({ ...notifSettings, [key]: !notifSettings[key] });
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
        <Bell className="h-5 w-5 text-primary" />
        Notification Preferences
      </h3>

      <div className="space-y-6">
        {/* Push Notifications */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Push Notifications</h4>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg"><Heart className="h-4 w-4" /></div>
              <span className="font-medium text-gray-900 dark:text-white">Likes & Reactions</span>
            </div>
            <Switch checked={notifSettings.push_likes} onChange={() => toggle('push_likes')} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><MessageSquare className="h-4 w-4" /></div>
              <span className="font-medium text-gray-900 dark:text-white">Comments & Mentions</span>
            </div>
            <Switch checked={notifSettings.push_comments} onChange={() => toggle('push_comments')} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Mail className="h-4 w-4" /></div>
              <span className="font-medium text-gray-900 dark:text-white">Direct Messages</span>
            </div>
            <Switch checked={notifSettings.push_messages} onChange={() => toggle('push_messages')} />
          </div>
        </div>

        {/* Email Notifications */}
        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email Notifications</h4>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">Weekly Digest</span>
            <Switch checked={notifSettings.email_digest} onChange={() => toggle('email_digest')} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-900 dark:text-white">Security Alerts</span>
            <Switch checked={notifSettings.email_security} onChange={() => toggle('email_security')} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

function Switch({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button 
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed bg-gray-200' : (checked ? 'bg-primary' : 'bg-gray-300')
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}
