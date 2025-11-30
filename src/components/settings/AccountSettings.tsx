import { useState } from "react";
import { Lock, Smartphone, Shield, LogOut, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function AccountSettings() {
  const [twoFactor, setTwoFactor] = useLocalStorage("2fa_enabled", false);
  const [sessions, setSessions] = useState([
    { id: 1, device: "iPhone 13 Pro", location: "New York, USA", active: true, current: true },
    { id: 2, device: "MacBook Air M2", location: "New York, USA", active: true, current: false },
    { id: 3, device: "Chrome on Windows", location: "Boston, USA", active: true, current: false },
  ]);
  
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [passwordStatus, setPasswordStatus] = useState<"idle" | "success" | "error">("idle");

  const handlePasswordChange = () => {
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordStatus("error");
      return;
    }
    if (passwordForm.new.length < 8) {
      setPasswordStatus("error");
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setPasswordStatus("success");
      setPasswordForm({ current: "", new: "", confirm: "" });
      setTimeout(() => setPasswordStatus("idle"), 3000);
    }, 800);
  };

  const terminateSession = (id: number) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Password Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
          <Lock className="h-5 w-5 text-primary" />
          Password & Security
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</label>
            <Input 
              type="password" 
              placeholder="Current Password" 
              value={passwordForm.current}
              onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
            />
            <Input 
              type="password" 
              placeholder="New Password" 
              value={passwordForm.new}
              onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
            />
            <Input 
              type="password" 
              placeholder="Confirm New Password" 
              value={passwordForm.confirm}
              onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
            />
            
            <div className="flex items-center justify-between mt-2">
               {passwordStatus === "success" && (
                 <span className="text-sm text-green-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4"/> Updated!</span>
               )}
               {passwordStatus === "error" && (
                 <span className="text-sm text-red-600 flex items-center gap-1"><AlertTriangle className="h-4 w-4"/> Mismatch or too short</span>
               )}
               <Button size="sm" onClick={handlePasswordChange} disabled={!passwordForm.current || !passwordForm.new}>
                 Update Password
               </Button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-4 w-4 text-secondary-600" />
                  Two-Factor Authentication
                </h4>
                <p className="text-xs text-gray-500 mt-1">Secure your account with 2FA.</p>
              </div>
              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactor ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            {twoFactor && (
               <div className="text-xs bg-green-50 text-green-700 p-2 rounded border border-green-100">
                 2FA is active via Authenticator App.
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Active Sessions */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
          <Smartphone className="h-5 w-5 text-primary" />
          Active Sessions
        </h3>
        
        <div className="space-y-3">
          {sessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${session.current ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    {session.device}
                    {session.current && <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Current</span>}
                  </p>
                  <p className="text-xs text-gray-500">{session.location}</p>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" onClick={() => terminateSession(session.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="pt-6 mt-6 border-t border-red-100">
        <h3 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h3>
        <div className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-xl">
          <div>
            <h4 className="font-medium text-red-900">Deactivate Account</h4>
            <p className="text-sm text-red-700">Temporarily disable or permanently delete your account.</p>
          </div>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-100 hover:border-red-300">
            Deactivate
          </Button>
        </div>
      </section>
    </div>
  );
}
