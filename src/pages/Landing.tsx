import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { MOCK_UNIVERSITIES } from "../lib/utils";
import { CheckCircle2, AlertCircle, GraduationCap, Globe2, ShieldCheck } from "lucide-react";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const domain = email.split('@')[1];
    const university = MOCK_UNIVERSITIES.find(u => u.domain === domain);

    if (university) {
      setError("");
      setStep("verify");
      // Simulate API call
      setTimeout(() => {
        navigate("/feed");
      }, 1500);
    } else {
      setError("Access Restricted: This domain is not in the Unigap whitelist.");
    }
  };

  return (
    <div className="min-h-screen bg-secondary-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-500 rounded-full blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-500 rounded-full blur-[128px] opacity-20"></div>
      </div>

      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 text-white mb-6 shadow-lg shadow-primary-900/50">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Unigap</h1>
          <p className="text-secondary-200 text-lg">Gateway to the Global Academic Community</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {step === "input" ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Institutional Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg"
                  required
                />
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mt-2 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary-500/20">
                Verify Identity
              </Button>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                  <ShieldCheck className="h-4 w-4 text-secondary-600" />
                  <span>Exclusive Whitelist Access</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Globe2 className="h-4 w-4 text-secondary-600" />
                  <span>Automatic Union Assignment</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Sent!</h3>
              <p className="text-gray-500">
                We've sent a secure link to <span className="font-medium text-gray-900">{email}</span>.
                Please check your inbox to activate your account.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
