import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, Video, Users, Building2, UserCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import Messages from "./Messages";

// Tabs configuration
const TABS = [
  { id: "university", label: "My University", icon: Building2 },
  { id: "following", label: "Following", icon: UserCheck },
  { id: "friends", label: "My Friends", icon: Users }
];

// Mock Current User Context
const CURRENT_USER = {
  union: "MIT Union",
  followingIds: [101, 103], // IDs of users being followed
  groupIds: [201, 202] // IDs of groups joined
};

const POSTS = [
  {
    id: 1,
    authorId: 101,
    author: "Dr. Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100",
    role: "Faculty",
    union: "MIT Union", // Matches User
    time: "2h ago",
    content: "Thrilled to announce our latest publication on Quantum Computing architectures. This was a collaborative effort!",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
    likes: 245,
    comments: 42,
    type: "post",
    isGroupPost: false
  },
  {
    id: 2,
    authorId: 201,
    author: "Robotics Society",
    avatar: "https://ui-avatars.com/api/?name=RS&background=000080&color=fff",
    role: "Club",
    union: "MIT Union",
    time: "5h ago",
    content: "Don't forget! The inter-university bot battle starts in 1 hour. Join the live stream.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    likes: 128,
    comments: 15,
    type: "event",
    isLive: true,
    isGroupPost: true // Belongs to Groups Tab
  },
  {
    id: 3,
    authorId: 103,
    author: "James Wilson",
    avatar: "https://ui-avatars.com/api/?name=JW&background=random",
    role: "Student",
    union: "Oxford Union", // Different Union
    time: "1d ago",
    content: "Looking for collaborators for a cross-university study on AI ethics. DM if interested!",
    likes: 45,
    comments: 12,
    type: "post",
    isGroupPost: false
  },
  {
    id: 4,
    authorId: 104,
    author: "Maria Garcia",
    avatar: "https://ui-avatars.com/api/?name=MG&background=random",
    role: "Student",
    union: "MIT Union", // Matches User
    time: "3h ago",
    content: "Has anyone taken Prof. Miller's Advanced Algorithms class? Need some advice on the final project.",
    likes: 12,
    comments: 8,
    type: "post",
    isGroupPost: false
  },
  {
    id: 5,
    authorId: 202,
    author: "AI Research Group",
    avatar: "https://ui-avatars.com/api/?name=AI&background=FF4500&color=fff",
    role: "Research Group",
    union: "Global",
    time: "30m ago",
    content: "Weekly sync meeting notes are up. Please review the new dataset parameters before Monday.",
    likes: 56,
    comments: 4,
    type: "post",
    isGroupPost: true
  }
];

export default function Feed() {
  const [activeTab, setActiveTab] = useState("university");

  // Filtering Logic based on User Requirements
  const filteredPosts = POSTS.filter(post => {
    if (activeTab === 'university') {
      // Only posts from the user's own university (excluding group posts for clarity, or including them if they are university-wide)
      // Here we strictly show individual posts from the same union
      return post.union === CURRENT_USER.union && !post.isGroupPost;
    }
    if (activeTab === 'following') {
      // Posts from people/entities the user follows (regardless of university)
      return CURRENT_USER.followingIds.includes(post.authorId);
    }
    // Note: 'friends' tab now renders the Messages component, so no post filtering needed for it here
    return false;
  });

  return (
    <div className="space-y-6">
      {/* Feed Tabs */}
      <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200 flex sticky top-20 z-30">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2",
              activeTab === tab.id
                ? "bg-secondary-50 text-secondary-700 shadow-sm"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden md:inline">{tab.label}</span>
            <span className="md:hidden">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      {activeTab === 'friends' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Messages isEmbedded={true} />
        </motion.div>
      ) : (
        <>
          {/* Create Post Input (Context Aware) */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex gap-4">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" 
                alt="Me" 
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder={
                    activeTab === 'university' ? "Share with MIT Union..." :
                    "Share an update..."
                  }
                  className="w-full h-10 bg-gray-50 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <Video className="h-4 w-4 mr-2" />
                  Live Event
                </Button>
              </div>
              <Button size="sm">Post</Button>
            </div>
          </div>

          {/* Empty State / Info */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No new posts in this section.</p>
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-4 flex items-start justify-between">
                  <div className="flex gap-3">
                    <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{post.author}</h3>
                        {post.role !== "Student" && (
                          <span className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-medium",
                            post.role === "Faculty" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                          )}>
                            {post.role}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{post.union}</span>
                        <span>•</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className="px-4 pb-3">
                  <p className="text-gray-800 whitespace-pre-line">{post.content}</p>
                </div>

                {post.image && (
                  <div className="relative">
                    <img src={post.image} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
                    {post.isLive && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE NOW
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-gray-600 hover:text-secondary-600 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
