import { useState, useRef, useEffect } from "react";
import { Search, Phone, Video, MoreVertical, Paperclip, Mic, Send, ArrowLeft, CheckCheck, Users, FolderPlus, Settings, ChevronUp, ChevronDown, X, Info } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import { INITIAL_CHATS, MESSAGES } from "../lib/data";
import { ChatDetails } from "../components/chat/ChatDetails";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface MessagesProps {
  isEmbedded?: boolean;
}

// Theme Mapping
const THEME_COLORS: Record<string, string> = {
  default: "bg-blue-600",
  orange: "bg-[#FF4500]",
  emerald: "bg-emerald-600",
  purple: "bg-purple-600",
  rose: "bg-rose-500",
  slate: "bg-slate-700",
  teal: "bg-teal-600",
};

export default function Messages({ isEmbedded = false }: MessagesProps) {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [messageInput, setMessageInput] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // Theme State
  const [activeTheme] = useLocalStorage("chat_theme", "default");
  const bubbleColor = THEME_COLORS[activeTheme] || THEME_COLORS.default;
  
  // Search State
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(-1);
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  const [activeTopic, setActiveTopic] = useState("All");
  const topics = ["Friends", "Groups", "Academic", "Projects"]; 

  const activeChat = INITIAL_CHATS.find(c => c.id === selectedChatId);
  
  const filteredChats = INITIAL_CHATS.filter(chat => {
    if (activeTopic === "All") return true;
    return chat.topics.includes(activeTopic);
  });

  const handleChatSelect = (id: number) => {
    setSelectedChatId(id);
    setMobileView("chat");
    setShowDetails(false);
    setIsSearching(false);
    setSearchQuery("");
    setShowMenu(false);
  };

  const handleBackToList = () => {
    setMobileView("list");
    setSelectedChatId(null);
    setShowDetails(false);
    setShowMenu(false);
  };

  // Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(-1);
      return;
    }

    const results = MESSAGES.filter(msg => 
      msg.content.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(msg => msg.id);

    setSearchResults(results);
    if (results.length > 0) {
      setCurrentSearchIndex(0);
    } else {
      setCurrentSearchIndex(-1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (currentSearchIndex >= 0 && searchResults.length > 0) {
      const msgId = searchResults[currentSearchIndex];
      messageRefs.current[msgId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentSearchIndex, searchResults]);

  const nextSearchResult = () => {
    if (searchResults.length === 0) return;
    setCurrentSearchIndex((prev) => (prev + 1) % searchResults.length);
  };

  const prevSearchResult = () => {
    if (searchResults.length === 0) return;
    setCurrentSearchIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
  };

  const closeSearch = () => {
    setIsSearching(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-300 text-gray-900 font-medium rounded px-0.5">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className={cn(
      "flex bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative",
      isEmbedded ? "h-[calc(100vh-200px)]" : "h-[calc(100vh-80px)]"
    )}>
      {/* Sidebar / Chat List */}
      <div className={cn(
        "w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col bg-white transition-all duration-300",
        mobileView === "chat" ? "hidden md:flex" : "flex",
        showDetails && "hidden lg:flex"
      )}>
        {/* Header & Topics */}
        <div className="flex flex-col border-b border-gray-100 bg-white z-10">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">My Friends</h2>
            <Link to="/settings">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-primary"
                title="Manage Folders in Settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="px-4 pb-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 min-w-max">
              <button 
                onClick={() => setActiveTopic("All")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-full transition-all border",
                  activeTopic === "All" 
                    ? "bg-primary text-white border-primary shadow-sm" 
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                )}
              >
                All Chats
              </button>
              {topics.map(topic => (
                <button 
                  key={topic}
                  onClick={() => setActiveTopic(topic)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-full transition-all border",
                    activeTopic === topic 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  )}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full pl-9 pr-4 h-9 bg-gray-100 rounded-lg text-sm border-none focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className={cn(
                  "p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50",
                  selectedChatId === chat.id ? "bg-primary-50 border-l-4 border-l-primary pl-[12px]" : "border-l-4 border-l-transparent"
                )}
              >
                <div className="relative">
                  <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                  {chat.type === 'group' && (
                      <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                          <div className="bg-orange-100 p-1 rounded-full">
                              <Users className="w-3 h-3 text-orange-600" />
                          </div>
                      </div>
                  )}
                  {chat.type === 'direct' && chat.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-400">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                      {chat.type === 'group' && <span className="font-medium text-gray-700">Alice: </span>}
                      {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <FolderPlus className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p className="text-sm">No chats in "{activeTopic}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={cn(
        "flex-1 flex-col bg-[#FDFDFD] relative",
        mobileView === "list" ? "hidden md:flex" : "flex"
      )}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white shrink-0 z-20">
              {isSearching ? (
                <div className="flex items-center gap-2 w-full animate-fade-in">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search in chat..." 
                      className="w-full pl-9 pr-4 h-10 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 min-w-[80px] justify-center">
                    {searchResults.length > 0 ? (
                       <span>{currentSearchIndex + 1} of {searchResults.length}</span>
                    ) : (
                       searchQuery && <span>0 found</span>
                    )}
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                    <button onClick={prevSearchResult} disabled={searchResults.length === 0} className="p-2 hover:bg-white rounded-md disabled:opacity-50">
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button onClick={nextSearchResult} disabled={searchResults.length === 0} className="p-2 hover:bg-white rounded-md disabled:opacity-50">
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" onClick={closeSearch}>
                    <span className="text-sm font-medium text-gray-600">Cancel</span>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button onClick={handleBackToList} className="md:hidden p-2 -ml-2 text-gray-600">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => setShowDetails(true)}
                      className="flex items-center gap-3 hover:bg-gray-50 p-1.5 -ml-1.5 rounded-lg transition-colors max-w-full"
                    >
                      <img src={activeChat.avatar} alt={activeChat.name} className="w-9 h-9 rounded-full" />
                      <div className="text-left min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 truncate">
                          {activeChat.name}
                          {activeChat.type === 'group' && <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Group</span>}
                        </h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                          {activeChat.type === 'group' 
                              ? '12 members • 3 online' 
                              : (activeChat.status === 'online' ? 'Online' : 'Last seen recently')
                          }
                        </p>
                      </div>
                    </button>
                  </div>
                  
                  <div className="relative">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn("text-gray-500", showMenu && "bg-gray-100 text-gray-900")} 
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>

                    {showMenu && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setShowMenu(false)}></div>
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-40 animate-fade-in origin-top-right">
                          <button 
                            onClick={() => { setIsSearching(true); setShowMenu(false); }} 
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                          >
                            <Search className="h-4 w-4 text-gray-500" /> Search
                          </button>
                          <button 
                            onClick={() => setShowMenu(false)}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                          >
                            <Phone className="h-4 w-4 text-gray-500" /> Voice Call
                          </button>
                          <button 
                            onClick={() => setShowMenu(false)}
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                          >
                            <Video className="h-4 w-4 text-gray-500" /> Video Call
                          </button>
                          <div className="h-px bg-gray-100 my-1" />
                          <button 
                            onClick={() => { setShowDetails(true); setShowMenu(false); }} 
                            className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                          >
                            <Info className="h-4 w-4 text-gray-500" /> View Details
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Messages View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://subtlepatterns.com/patterns/geometry.png')]">
              {MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  ref={(el) => (messageRefs.current[msg.id] = el)}
                  className={cn(
                    "flex w-full",
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[75%] px-4 py-2 rounded-2xl shadow-sm relative group transition-all duration-300",
                      msg.sender === "me" 
                        ? `${bubbleColor} text-white rounded-br-none` 
                        : "bg-white text-gray-900 rounded-bl-none border border-gray-100",
                      searchResults.includes(msg.id) && "ring-2 ring-yellow-400 ring-offset-2"
                    )}
                  >
                    {activeChat.type === 'group' && msg.sender !== 'me' && (
                        <p className="text-xs font-bold text-orange-600 mb-1">Alice Smith</p>
                    )}
                    <p className="text-sm leading-relaxed">
                      {isSearching ? highlightText(msg.content, searchQuery) : msg.content}
                    </p>
                    <div className={cn(
                      "text-[10px] mt-1 flex items-center gap-1 justify-end",
                      msg.sender === "me" ? "text-white/80" : "text-gray-400"
                    )}>
                      {msg.time}
                      {msg.sender === "me" && <CheckCheck className="h-3 w-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Write a message..."
                    className="w-full h-10 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-10 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    onKeyDown={(e) => e.key === 'Enter' && setMessageInput('')}
                  />
                </div>
                {messageInput ? (
                  <Button 
                    size="sm" 
                    className={cn("rounded-full w-10 h-10 p-0 flex items-center justify-center", bubbleColor)}
                    onClick={() => setMessageInput('')}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Send className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Your Friends & Groups</h3>
            <p className="max-w-xs mt-2">Select a chat from the list or start a new conversation with a connection.</p>
          </div>
        )}
      </div>

      {/* Chat Details Sidebar (Right Side) */}
      {showDetails && activeChat && (
        <div className="absolute inset-0 z-20 md:static md:z-0 md:w-auto bg-white">
          <ChatDetails chat={activeChat} onClose={() => setShowDetails(false)} />
        </div>
      )}
    </div>
  );
}
