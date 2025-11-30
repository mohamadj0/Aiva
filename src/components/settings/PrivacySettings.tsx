import { Eye, Users, MessageCircle, Lock, UserX } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Button } from "../ui/Button";

export function PrivacySettings() {
  const [profileVisibility, setProfileVisibility] = useLocalStorage("privacy_profile", "union");
  const [showRelationship, setShowRelationship] = useLocalStorage("privacy_relationship", true);
  const [allowSearch, setAllowSearch] = useLocalStorage("privacy_search", true);
  
  const [blockedUsers, setBlockedUsers] = useLocalStorage("blocked_users", [
    { id: 99, name: "Spam Bot 3000", date: "Oct 12, 2024" }
  ]);

  const unblockUser = (id: number) => {
    setBlockedUsers(blockedUsers.filter(u => u.id !== id));
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
          <Eye className="h-5 w-5 text-primary" />
          Visibility Controls
        </h3>

        <div className="space-y-6">
          {/* Profile Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="cursor-pointer">
              <input 
                type="radio" 
                name="visibility" 
                className="peer sr-only" 
                checked={profileVisibility === "public"}
                onChange={() => setProfileVisibility("public")}
              />
              <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-primary peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                <Users className="h-6 w-6 text-gray-400 peer-checked:text-primary mb-2" />
                <div className="font-medium text-gray-900 dark:text-white">Public</div>
                <div className="text-xs text-gray-500">Visible to all Unigap members</div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input 
                type="radio" 
                name="visibility" 
                className="peer sr-only" 
                checked={profileVisibility === "union"}
                onChange={() => setProfileVisibility("union")}
              />
              <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-primary peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                <Lock className="h-6 w-6 text-gray-400 peer-checked:text-primary mb-2" />
                <div className="font-medium text-gray-900 dark:text-white">Union Only</div>
                <div className="text-xs text-gray-500">Only members of your university</div>
              </div>
            </label>

            <label className="cursor-pointer">
              <input 
                type="radio" 
                name="visibility" 
                className="peer sr-only" 
                checked={profileVisibility === "connections"}
                onChange={() => setProfileVisibility("connections")}
              />
              <div className="p-4 rounded-xl border-2 border-gray-200 peer-checked:border-primary peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 transition-all">
                <MessageCircle className="h-6 w-6 text-gray-400 peer-checked:text-primary mb-2" />
                <div className="font-medium text-gray-900 dark:text-white">Connections</div>
                <div className="text-xs text-gray-500">Only people you follow</div>
              </div>
            </label>
          </div>

          {/* Toggles */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Show Relationship Status</div>
                <div className="text-xs text-gray-500">Display your partner tag on profile</div>
              </div>
              <button 
                onClick={() => setShowRelationship(!showRelationship)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showRelationship ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showRelationship ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-600 pt-4">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Allow Search Discovery</div>
                <div className="text-xs text-gray-500">Let others find you by Major/Degree</div>
              </div>
              <button 
                onClick={() => setAllowSearch(!allowSearch)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${allowSearch ? 'bg-primary' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${allowSearch ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blocked Users */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
          <UserX className="h-5 w-5 text-primary" />
          Blocked Users
        </h3>
        
        <div className="space-y-2">
          {blockedUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <span className="font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
              <Button size="sm" variant="outline" onClick={() => unblockUser(user.id)} className="text-xs h-8">
                Unblock
              </Button>
            </div>
          ))}
          {blockedUsers.length === 0 && (
            <p className="text-gray-500 text-sm italic">No blocked users.</p>
          )}
        </div>
      </section>
    </div>
  );
}
