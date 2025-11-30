import { useState } from "react";
import { HelpCircle, MessageSquare, ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const FAQS = [
  { q: "How do I verify my university email?", a: "Go to your profile settings and ensure your email ends with a valid .edu domain. The system automatically verifies whitelisted domains." },
  { q: "Can I change my Union?", a: "Your Union is tied to your email domain. If you transfer universities, you must update your email to the new institution's address." },
  { q: "How do I create a group?", a: "Navigate to the 'My Friends' tab and click the '+' icon to start a new group chat or society." },
];

export function SupportSettings() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-700">
        <HelpCircle className="h-5 w-5 text-primary" />
        Help & Support
      </h3>

      {/* Contact Form */}
      <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Contact Support
        </h4>
        <p className="text-sm text-gray-500 mb-4">Found a bug or have a suggestion? Let us know.</p>
        
        <div className="space-y-3">
          <textarea 
            className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-primary focus:outline-none min-h-[100px]"
            placeholder="Describe your issue..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <Button size="sm" onClick={handleSend} disabled={sent || !message.trim()}>
              {sent ? "Sent!" : "Submit Request"}
              {!sent && <Send className="h-3 w-3 ml-2" />}
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h4>
        {FAQS.map((faq, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="font-medium text-sm text-gray-900 dark:text-white">{faq.q}</span>
              {openFaq === i ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
            </button>
            {openFaq === i && (
              <div className="p-4 bg-gray-50 dark:bg-gray-700/30 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
