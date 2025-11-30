import { useState } from "react";
import { Folder, Plus, Trash2, Check, Search, SortAsc } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { cn } from "../../lib/utils";
import { INITIAL_CHATS } from "../../lib/data";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function ChatFolderSettings() {
  const [folders, setFolders] = useLocalStorage("chat_folders", [
    { id: 1, name: "Friends", chats: [1, 3] },
    { id: 2, name: "Groups", chats: [2, 4] },
    { id: 3, name: "Academic", chats: [1, 4] },
  ]);
  
  const [editingFolder, setEditingFolder] = useState<number | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [chatSearch, setChatSearch] = useState("");

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newId = Math.max(0, ...folders.map(f => f.id)) + 1;
      setFolders([...folders, { id: newId, name: newFolderName.trim(), chats: [] }]);
      setNewFolderName("");
      setEditingFolder(newId);
    }
  };

  const handleDeleteFolder = (id: number) => {
    setFolders(folders.filter(f => f.id !== id));
    if (editingFolder === id) setEditingFolder(null);
  };

  const toggleChatInFolder = (folderId: number, chatId: number) => {
    setFolders(folders.map(f => {
      if (f.id === folderId) {
        const isIncluded = f.chats.includes(chatId);
        return {
          ...f,
          chats: isIncluded ? f.chats.filter(id => id !== chatId) : [...f.chats, chatId]
        };
      }
      return f;
    }));
  };

  // Filter and Sort Chats
  const filteredChats = INITIAL_CHATS
    .filter(chat => chat.name.toLowerCase().includes(chatSearch.toLowerCase()))
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); // Sort by most recent

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Folder className="h-5 w-5 text-primary" />
            Chat Folders
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organize your chats into custom folders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Folder List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex gap-2">
            <Input 
              placeholder="New Folder Name" 
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="h-10"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
            />
            <Button size="sm" onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {folders.map(folder => (
              <div 
                key={folder.id}
                onClick={() => setEditingFolder(folder.id)}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center",
                  editingFolder === folder.id 
                    ? "border-primary bg-primary-50 dark:bg-primary-900/20" 
                    : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <span className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{folder.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 bg-white dark:bg-gray-600 px-2 py-0.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-500">
                    {folder.chats.length}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id); }}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {folders.length === 0 && (
                <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                    <p className="text-sm">No folders created</p>
                </div>
            )}
          </div>
        </div>

        {/* Folder Configuration (Right Side) */}
        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 border border-gray-100 dark:border-gray-700 min-h-[400px] flex flex-col">
          {editingFolder ? (
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-600 shrink-0">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-primary">{folders.find(f => f.id === editingFolder)?.name}</span>
                </h4>
                <span className="text-xs text-gray-500">Select chats to include</span>
              </div>

              {/* Search Bar for Chats */}
              <div className="relative shrink-0">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search to add..." 
                  value={chatSearch}
                  onChange={(e) => setChatSearch(e.target.value)}
                  className="w-full pl-9 pr-4 h-9 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2 overflow-y-auto pr-2 flex-1">
                {filteredChats.map(chat => {
                  const currentFolder = folders.find(f => f.id === editingFolder);
                  const isSelected = currentFolder?.chats.includes(chat.id);
                  
                  return (
                    <div 
                      key={chat.id}
                      onClick={() => toggleChatInFolder(editingFolder, chat.id)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border",
                        isSelected 
                          ? "bg-white dark:bg-gray-600 border-primary shadow-sm" 
                          : "bg-transparent border-transparent hover:bg-white dark:hover:bg-gray-600"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors shrink-0",
                        isSelected ? "bg-primary border-primary" : "border-gray-300 dark:border-gray-500"
                      )}>
                        {isSelected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <img src={chat.avatar} alt={chat.name} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{chat.name}</p>
                            <span className="text-[10px] text-gray-400">{chat.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{chat.type === 'group' ? 'Group' : 'Private Chat'}</p>
                      </div>
                    </div>
                  );
                })}
                {filteredChats.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">No chats found.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center mb-4">
                <Folder className="h-8 w-8 text-gray-300 dark:text-gray-400" />
              </div>
              <p className="font-medium">Select a folder to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
