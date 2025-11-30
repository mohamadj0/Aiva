// Centralized mock data for the application
export const USERS = [
  { id: 101, name: "Dr. Emily White", avatar: "https://ui-avatars.com/api/?name=Emily+White&background=0D8ABC&color=fff", role: "Faculty" },
  { id: 102, name: "John Doe", avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random", role: "Student" },
  { id: 103, name: "Sarah Lee", avatar: "https://ui-avatars.com/api/?name=Sarah+Lee&background=FF4500&color=fff", role: "Student" },
];

export const GROUPS = [
  { id: 201, name: "Robotics Club", avatar: "https://ui-avatars.com/api/?name=RC&background=FF4500&color=fff" },
  { id: 202, name: "Study Group: Algo", avatar: "https://ui-avatars.com/api/?name=SG&background=000080&color=fff" },
];

// Added timestamps for sorting
export const INITIAL_CHATS = [
  {
    id: 1,
    type: "direct",
    name: "Dr. Emily White",
    avatar: "https://ui-avatars.com/api/?name=Emily+White&background=0D8ABC&color=fff",
    status: "online",
    lastMessage: "That sounds like a great thesis topic!",
    time: "10:42 AM",
    timestamp: 1731408120000, // Recent
    unread: 2,
    topics: ["Friends", "Academic"],
    phone: "+1 (555) 123-4567",
    bio: "Professor of Physics at MIT. Researching Quantum Mechanics."
  },
  {
    id: 2,
    type: "group",
    name: "Robotics Club",
    avatar: "https://ui-avatars.com/api/?name=RC&background=FF4500&color=fff",
    status: "active",
    lastMessage: "Meeting at 5 PM in the lab.",
    time: "11:30 AM",
    timestamp: 1731411000000, // Most Recent
    unread: 5,
    topics: ["Groups", "Projects"],
    bio: "Official Robotics Club of MIT Union."
  },
  {
    id: 3,
    type: "direct",
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    status: "offline",
    lastMessage: "Can you send me the PDF?",
    time: "Yesterday",
    timestamp: 1731321600000,
    unread: 0,
    topics: ["Friends"],
    phone: "+1 (555) 987-6543",
    bio: "Computer Science Student."
  },
  {
    id: 4,
    type: "group",
    name: "Study Group: Algo",
    avatar: "https://ui-avatars.com/api/?name=SG&background=000080&color=fff",
    status: "active",
    lastMessage: "Who solved problem 4?",
    time: "Mon",
    timestamp: 1731235200000,
    unread: 0,
    topics: ["Groups", "Academic"],
    bio: "Advanced Algorithms Study Group."
  },
  {
    id: 5,
    type: "direct",
    name: "Alice Smith",
    avatar: "https://ui-avatars.com/api/?name=Alice+Smith&background=random",
    status: "online",
    lastMessage: "Thanks for the help!",
    time: "2 days ago",
    timestamp: 1731148800000,
    unread: 0,
    topics: ["Friends"],
    phone: "+1 (555) 111-2222",
    bio: "Mathematics Student."
  }
];

export const MESSAGES = [
  { id: 1, sender: "them", content: "Hi Alex! I saw your profile in the MIT Union group.", time: "10:30 AM" },
  { id: 2, sender: "me", content: "Hi Dr. White! Yes, I'm currently working on my Ph.D. proposal.", time: "10:32 AM" },
  { id: 3, sender: "them", content: "That's wonderful. Are you focusing on Neural Architecture Search?", time: "10:35 AM" },
  { id: 4, sender: "me", content: "Exactly! I'm trying to optimize it for edge devices.", time: "10:36 AM" },
  { id: 5, sender: "them", content: "That sounds like a great thesis topic! We should discuss this further.", time: "10:42 AM" },
  { id: 6, sender: "me", content: "I have some initial drafts. Should I send them over?", time: "10:45 AM" },
  { id: 7, sender: "them", content: "Yes, please do. Also, check this paper on NAS.", time: "10:46 AM" },
  { id: 8, sender: "me", content: "Will do. Thanks!", time: "10:47 AM" }
];

export const SHARED_CONTENT = {
  media: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&h=200",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=200&h=200",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=200&h=200",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=200&h=200",
  ],
  files: [
    { name: "Thesis_Draft_v1.pdf", size: "2.4 MB", date: "Nov 10" },
    { name: "Research_Proposal.docx", size: "1.1 MB", date: "Nov 08" },
    { name: "Lab_Results_Q3.xlsx", size: "850 KB", date: "Oct 25" },
  ],
  links: [
    { title: "Neural Architecture Search Survey", url: "arxiv.org/abs/1234.5678", date: "Yesterday" },
    { title: "MIT Event Schedule", url: "mit.edu/events", date: "Nov 01" },
  ],
  voice: [
    { duration: "0:45", date: "Today, 10:40 AM" },
    { duration: "1:20", date: "Yesterday" },
  ]
};
