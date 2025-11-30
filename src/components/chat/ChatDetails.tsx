import { useState } from "react";
import { X, Phone, Video, Bell, Search, FileText, Image as ImageIcon, Link as LinkIcon, Mic, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { SHARED_CONTENT } from "../../lib/data";

interface ChatDetailsProps {
  chat: any;
  onClose: () => void;
}

export function ChatDetails({ chat, onClose }: ChatDetailsProps) {
  const [activeTab, setActiveTab] = useState<"media" | "files" | "links" | "voice">("media");

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 w-full md:w-80 lg:w-96 animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 className="font-bold text-gray-900">Contact Info</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Info */}
        <div className="p-6 flex flex-col items-center text-center border-b border-gray-100">
          <img 
            src={chat.avatar} 
            alt={chat.name} 
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm border-4 border-white ring-1 ring-gray-100" 
          />
          <h2 className="text-xl font-bold text-gray-900">{chat.name}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {chat.type === 'group' ? '12 Members' : chat.phone || '+1 (555) 000-0000'}
          </p>
          {chat.bio && (
            <p className="text-sm text-gray-600 mt-3 px-4">{chat.bio}</p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 w-full justify-center">
            <div className="flex flex-col items-center gap-1">
              <Button variant="outline" className="w-12 h-12 rounded-full p-0 flex items-center justify-center border-gray-200 hover:border-primary hover:text-primary">
                <Phone className="h-5 w-5" />
              </Button>
              <span className="text-xs text-gray-500">Call</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant="outline" className="w-12 h-12 rounded-full p-0 flex items-center justify-center border-gray-200 hover:border-primary hover:text-primary">
                <Video className="h-5 w-5" />
              </Button>
              <span className="text-xs text-gray-500">Video</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant="outline" className="w-12 h-12 rounded-full p-0 flex items-center justify-center border-gray-200 hover:border-primary hover:text-primary">
                <Search className="h-5 w-5" />
              </Button>
              <span className="text-xs text-gray-500">Search</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Button variant="outline" className="w-12 h-12 rounded-full p-0 flex items-center justify-center border-gray-200 hover:border-primary hover:text-primary">
                <Bell className="h-5 w-5" />
              </Button>
              <span className="text-xs text-gray-500">Mute</span>
            </div>
          </div>
        </div>

        {/* Shared Content Tabs */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
          <div className="flex overflow-x-auto no-scrollbar">
            {[
              { id: "media", label: "Media", icon: ImageIcon },
              { id: "files", label: "Files", icon: FileText },
              { id: "links", label: "Links", icon: LinkIcon },
              { id: "voice", label: "Voice", icon: Mic },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 min-w-[80px] py-3 text-xs font-medium flex flex-col items-center gap-1 border-b-2 transition-colors",
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                {/* @ts-ignore */}
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 min-h-[200px]">
          {activeTab === "media" && (
            <div className="grid grid-cols-3 gap-2">
              {SHARED_CONTENT.media.map((src, i) => (
                <img key={i} src={src} alt="Shared" className="w-full aspect-square object-cover rounded-lg cursor-pointer hover:opacity-90" />
              ))}
            </div>
          )}

          {activeTab === "files" && (
            <div className="space-y-3">
              {SHARED_CONTENT.files.map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "links" && (
            <div className="space-y-3">
              {SHARED_CONTENT.links.map((link, i) => (
                <div key={i} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <LinkIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{link.title}</p>
                    <p className="text-xs text-primary truncate">{link.url}</p>
                    <p className="text-xs text-gray-400 mt-1">{link.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "voice" && (
            <div className="space-y-3">
              {SHARED_CONTENT.voice.map((voice, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="h-1 bg-gray-200 rounded-full w-full mb-1 overflow-hidden">
                      <div className="h-full bg-green-500 w-1/3"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{voice.duration}</span>
                      <span>{voice.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
