import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, BookOpen, Award, Heart, Edit2, Save, X, Mail, Globe, Camera, Briefcase, Plus, Trash2, Languages, Sparkles, Link as LinkIcon, Lock, LayoutList, FileText, MoreHorizontal, MessageCircle, Share2, UserPlus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";

// Interfaces (kept same as before)
interface WorkExperience {
  id: number;
  role: string;
  company: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
}

interface Article {
  id: number;
  title: string;
  publisher: string;
  year: string;
  link: string;
}

// Mock Posts Data for Profile
const USER_POSTS = [
  {
    id: 101,
    time: "2d ago",
    content: "Just submitted my final thesis draft! It's been a long journey exploring the depths of Neural Architecture Search. Huge thanks to my advisor Dr. White for the guidance.",
    likes: 156,
    comments: 24,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 102,
    time: "1w ago",
    content: "Attending the Global AI Ethics Symposium next week. Who else from MIT Union is going? Let's connect!",
    likes: 89,
    comments: 12,
    image: null
  }
];

export default function Profile() {
  const { id } = useParams();
  const isOwnProfile = id === 'me' || id === undefined;
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "posts">("info");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Mock State for Profile Data
  const [profile, setProfile] = useState({
    name: isOwnProfile ? "Alex Johnson" : "Dr. Emily White",
    role: isOwnProfile ? "Student" : "Faculty",
    degreeLevel: isOwnProfile ? "Ph.D. Candidate" : "Professor",
    major: isOwnProfile ? "Computer Science" : "Physics",
    university: "MIT",
    bio: isOwnProfile ? "Coffee enthusiast, amateur photographer, and full-time bug hunter." : "Researching Quantum Mechanics and condensed matter physics.",
    relationshipStatus: "In a Relationship",
    partnerName: "Sarah Lee",
    email: isOwnProfile ? "alex.j@mit.edu" : "emily.white@mit.edu",
    website: isOwnProfile ? "alexj.dev" : "physics.mit.edu/white",
    interests: isOwnProfile ? "Artificial Intelligence, Machine Learning" : "Quantum Physics, Thermodynamics",
    avatar: isOwnProfile 
      ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200"
      : "https://ui-avatars.com/api/?name=Emily+White&background=0D8ABC&color=fff",
    skills: isOwnProfile ? ["Python", "React", "TensorFlow"] : ["Quantum Mechanics", "Mathematics", "Teaching"],
    languages: ["English (Native)", "Spanish (B2)"],
    workExperience: [
      {
        id: 1,
        role: isOwnProfile ? "Research Assistant" : "Senior Lecturer",
        company: "MIT",
        startYear: "2022",
        endYear: "Present",
        isCurrent: true
      }
    ] as WorkExperience[],
    articles: [
      { 
        id: 1, 
        title: isOwnProfile ? "Efficient Transformers" : "Quantum Entanglement in Macro Systems", 
        publisher: "IEEE", 
        year: "2024", 
        link: "doi.org/10.1109/CVPR.2024.001" 
      }
    ] as Article[]
  });

  // Reset profile data when ID changes (simulating fetch)
  useEffect(() => {
    setProfile(prev => ({
        ...prev,
        name: isOwnProfile ? "Alex Johnson" : "Dr. Emily White",
        // ... update other fields based on ID in a real app
    }));
  }, [id, isOwnProfile]);

  // Temporary state for inputs
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const handleSave = () => {
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Work Experience Handlers ---
  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now(),
      role: "",
      company: "",
      startYear: "",
      endYear: "",
      isCurrent: false
    };
    setProfile({ ...profile, workExperience: [...profile.workExperience, newWork] });
  };

  const updateWorkExperience = (id: number, field: keyof WorkExperience, value: any) => {
    setProfile({
      ...profile,
      workExperience: profile.workExperience.map(w => 
        w.id === id ? { ...w, [field]: value } : w
      )
    });
  };

  const removeWorkExperience = (id: number) => {
    setProfile({
      ...profile,
      workExperience: profile.workExperience.filter(w => w.id !== id)
    });
  };

  // --- Article Handlers ---
  const addArticle = () => {
    const newArticle: Article = {
      id: Date.now(),
      title: "",
      publisher: "",
      year: new Date().getFullYear().toString(),
      link: ""
    };
    setProfile({ ...profile, articles: [...profile.articles, newArticle] });
  };

  const updateArticle = (id: number, field: keyof Article, value: string) => {
    setProfile({
      ...profile,
      articles: profile.articles.map(a => 
        a.id === id ? { ...a, [field]: value } : a
      )
    });
  };

  const removeArticle = (id: number) => {
    setProfile({
      ...profile,
      articles: profile.articles.filter(a => a.id !== id)
    });
  };

  // --- Skill/Language Handlers ---
  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skillToRemove) });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setProfile({ ...profile, languages: [...profile.languages, newLanguage.trim()] });
      setNewLanguage("");
    }
  };

  const removeLanguage = (langToRemove: string) => {
    setProfile({ ...profile, languages: profile.languages.filter(l => l !== langToRemove) });
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-secondary-900 to-secondary-700 relative">
        </div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-4">
            <div className="relative group">
              <img 
                src={profile.avatar} 
                alt="Profile" 
                className="w-24 h-24 rounded-xl border-4 border-white shadow-md bg-white object-cover"
              />
              {isEditing && isOwnProfile && (
                <div 
                  className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="text-white h-8 w-8" />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </div>
              )}
              {!isEditing && (
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-50 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 mb-1">
              {isOwnProfile ? (
                isEditing ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                )
              ) : (
                <>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" /> Connect
                  </Button>
                  <Link to="/messages">
                    <Button size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" /> Message
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div>
            {isEditing ? (
              <div className="space-y-3 max-w-md">
                <Input 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})} 
                  className="font-bold text-xl"
                  placeholder="Full Name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Level of Education</label>
                    <Input 
                      value={profile.degreeLevel} 
                      onChange={(e) => setProfile({...profile, degreeLevel: e.target.value})} 
                      placeholder="e.g. Ph.D. Candidate, Master's"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Field of Study</label>
                    <Input 
                      value={profile.major} 
                      onChange={(e) => setProfile({...profile, major: e.target.value})} 
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {profile.name}
                    {!isOwnProfile && <span className="text-xs font-normal bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{profile.role}</span>}
                </h1>
                <p className="text-gray-600 font-medium">{profile.degreeLevel} in {profile.major}</p>
              </>
            )}
            
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {profile.university} Union
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Class of 2025
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-t border-gray-100">
          <button
            onClick={() => setActiveTab("info")}
            className={cn(
              "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative",
              activeTab === "info" ? "text-primary" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <FileText className="h-4 w-4" />
            About
            {activeTab === "info" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={cn(
              "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative",
              activeTab === "posts" ? "text-primary" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <LayoutList className="h-4 w-4" />
            Posts
            {activeTab === "posts" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content Section Switch */}
      {activeTab === "info" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Left Column: Info & Skills */}
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
                  {/* General Information */}
                  <section>
                  <h3 className="text-lg font-bold text-secondary-900 mb-4 pb-2 border-b border-gray-100">General Information</h3>
                  
                  {isEditing ? (
                      <div className="space-y-4">
                      <div>
                          <label className="text-sm font-medium text-gray-700">Bio</label>
                          <textarea 
                          className="w-full mt-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
                          rows={3}
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="text-sm font-medium text-gray-700">Relationship Status</label>
                              <select 
                              className="w-full mt-1 p-2 border border-gray-300 rounded-lg text-sm h-11 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                              value={profile.relationshipStatus}
                              onChange={(e) => setProfile({...profile, relationshipStatus: e.target.value})}
                              >
                              <option>Single</option>
                              <option>In a Relationship</option>
                              <option>Married</option>
                              </select>
                          </div>
                          {profile.relationshipStatus === "In a Relationship" && (
                              <div>
                              <label className="text-sm font-medium text-gray-700">Partner Name</label>
                              <Input 
                                  value={profile.partnerName}
                                  onChange={(e) => setProfile({...profile, partnerName: e.target.value})}
                              />
                              </div>
                          )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                  Email
                                  <span className="text-xs font-normal text-gray-400 flex items-center gap-1">
                                      <Lock className="h-3 w-3" /> Verified
                                  </span>
                              </label>
                              <Input 
                                  value={profile.email}
                                  disabled
                                  className="bg-gray-100 text-gray-500 cursor-not-allowed"
                              />
                              <p className="text-xs text-gray-400 mt-1">Institutional email cannot be changed.</p>
                          </div>
                          <div>
                              <label className="text-sm font-medium text-gray-700">Website</label>
                              <Input 
                                  value={profile.website}
                                  onChange={(e) => setProfile({...profile, website: e.target.value})}
                              />
                          </div>
                      </div>
                      </div>
                  ) : (
                      <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="flex items-center gap-3 text-gray-600">
                          <Mail className="h-5 w-5 text-gray-400" />
                          {profile.email}
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                          <Globe className="h-5 w-5 text-gray-400" />
                          <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                              {profile.website}
                          </a>
                          </div>
                          <div className="flex items-center gap-3 text-gray-600">
                          <Heart className="h-5 w-5 text-pink-500" />
                          <span>{profile.relationshipStatus}</span>
                          {profile.relationshipStatus === "In a Relationship" && (
                              <>
                              <span className="text-gray-300">•</span>
                              <span className="text-primary hover:underline cursor-pointer">{profile.partnerName}</span>
                              </>
                          )}
                          </div>
                      </div>
                      </div>
                  )}
                  </section>

                  {/* Professional Experience */}
                  <section>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                          <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-primary" />
                              Experience
                          </h3>
                          {isEditing && (
                              <Button size="sm" variant="ghost" onClick={addWorkExperience} className="text-primary hover:text-primary-700">
                                  <Plus className="h-4 w-4 mr-1" /> Add
                              </Button>
                          )}
                      </div>

                      <div className="space-y-6 relative">
                          {/* Timeline Line */}
                          {!isEditing && profile.workExperience.length > 0 && (
                               <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-100"></div>
                          )}

                          {profile.workExperience.map((work, index) => (
                              <div key={work.id} className="relative">
                                  {isEditing ? (
                                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                                          <div className="flex justify-between items-start">
                                              <h4 className="text-sm font-bold text-gray-500 uppercase">Position {index + 1}</h4>
                                              <button onClick={() => removeWorkExperience(work.id)} className="text-red-500 hover:text-red-700">
                                                  <Trash2 className="h-4 w-4" />
                                              </button>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                              <Input 
                                                  placeholder="Role (e.g. Intern)" 
                                                  value={work.role}
                                                  onChange={(e) => updateWorkExperience(work.id, 'role', e.target.value)}
                                              />
                                              <Input 
                                                  placeholder="Company/Organization" 
                                                  value={work.company}
                                                  onChange={(e) => updateWorkExperience(work.id, 'company', e.target.value)}
                                              />
                                          </div>
                                          <div className="flex items-center gap-3">
                                              <Input 
                                                  placeholder="Start Year" 
                                                  className="w-24"
                                                  value={work.startYear}
                                                  onChange={(e) => updateWorkExperience(work.id, 'startYear', e.target.value)}
                                              />
                                              <span className="text-gray-400">-</span>
                                              {work.isCurrent ? (
                                                  <div className="h-11 flex items-center px-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">
                                                      Present
                                                  </div>
                                              ) : (
                                                  <Input 
                                                      placeholder="End Year" 
                                                      className="w-24"
                                                      value={work.endYear}
                                                      onChange={(e) => updateWorkExperience(work.id, 'endYear', e.target.value)}
                                                  />
                                              )}
                                              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer ml-2">
                                                  <input 
                                                      type="checkbox" 
                                                      checked={work.isCurrent}
                                                      onChange={(e) => updateWorkExperience(work.id, 'isCurrent', e.target.checked)}
                                                      className="rounded text-primary focus:ring-primary"
                                                  />
                                                  Current
                                              </label>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="flex gap-4">
                                          <div className="mt-1.5 relative z-10">
                                              <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm"></div>
                                          </div>
                                          <div>
                                              <h4 className="font-bold text-gray-900">{work.role}</h4>
                                              <div className="text-gray-600 font-medium">{work.company}</div>
                                              <div className="text-sm text-gray-400 mt-1">
                                                  {work.startYear} - {work.isCurrent ? "Present" : work.endYear}
                                              </div>
                                          </div>
                                      </div>
                                  )}
                              </div>
                          ))}
                          {!isEditing && profile.workExperience.length === 0 && (
                              <p className="text-gray-500 italic text-sm">No work experience added yet.</p>
                          )}
                      </div>
                  </section>

                  {/* Academic Information */}
                  <section>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                      <h3 className="text-lg font-bold text-secondary-900 flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          Academic Profile
                      </h3>
                  </div>
                  
                  <div className="space-y-6">
                      <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Research Interests</h4>
                      {isEditing ? (
                          <Input 
                          value={profile.interests}
                          onChange={(e) => setProfile({...profile, interests: e.target.value})}
                          placeholder="Comma separated interests"
                          />
                      ) : (
                          <div className="flex flex-wrap gap-2">
                          {profile.interests.split(',').map((tag) => (
                              <span key={tag} className="bg-secondary-50 text-secondary-700 px-3 py-1 rounded-full text-sm font-medium">
                              {tag.trim()}
                              </span>
                          ))}
                          </div>
                      )}
                      </div>

                      <div>
                      <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                              <Award className="h-4 w-4 text-primary" />
                              Publications & Achievements
                          </h4>
                          {isEditing && (
                              <Button size="sm" variant="ghost" onClick={addArticle} className="text-primary hover:text-primary-700">
                                  <Plus className="h-4 w-4 mr-1" /> Add Article
                              </Button>
                          )}
                      </div>

                      <div className="space-y-3">
                          {profile.articles.map((article) => (
                              <div key={article.id} className={cn(
                                  "p-4 border rounded-lg transition-colors",
                                  isEditing ? "bg-gray-50 border-gray-200" : "border-gray-100 hover:bg-gray-50"
                              )}>
                                  {isEditing ? (
                                      <div className="space-y-3">
                                          <div className="flex justify-between items-start gap-3">
                                              <Input 
                                                  placeholder="Article Title" 
                                                  value={article.title}
                                                  onChange={(e) => updateArticle(article.id, 'title', e.target.value)}
                                                  className="font-medium"
                                              />
                                              <button onClick={() => removeArticle(article.id)} className="text-red-500 hover:text-red-700 p-1">
                                                  <Trash2 className="h-4 w-4" />
                                              </button>
                                          </div>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                              <Input 
                                                  placeholder="Publisher / Conference" 
                                                  value={article.publisher}
                                                  onChange={(e) => updateArticle(article.id, 'publisher', e.target.value)}
                                              />
                                              <div className="flex gap-3">
                                                  <Input 
                                                      placeholder="Year" 
                                                      value={article.year}
                                                      onChange={(e) => updateArticle(article.id, 'year', e.target.value)}
                                                      className="w-24"
                                                  />
                                                  <Input 
                                                      placeholder="DOI / Link" 
                                                      value={article.link}
                                                      onChange={(e) => updateArticle(article.id, 'link', e.target.value)}
                                                      className="flex-1"
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  ) : (
                                      <>
                                          <h5 className="font-semibold text-gray-900">{article.title}</h5>
                                          <p className="text-sm text-gray-500 mt-1">{article.publisher} • {article.year}</p>
                                          {article.link && (
                                              <a href={`https://${article.link}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs text-primary font-medium hover:underline">
                                                  <LinkIcon className="h-3 w-3" />
                                                  {article.link}
                                              </a>
                                          )}
                                      </>
                                  )}
                              </div>
                          ))}
                          {!isEditing && profile.articles.length === 0 && (
                              <p className="text-gray-500 text-sm italic">No publications added yet.</p>
                          )}
                      </div>
                      </div>
                  </div>
                  </section>
              </div>
          </div>

          {/* Right Column: Skills & Languages */}
          <div className="space-y-6">
              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Skills
                  </h3>
                  
                  {isEditing && (
                      <div className="flex gap-2 mb-4">
                          <Input 
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              placeholder="Add a skill..."
                              className="h-9 text-sm"
                              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <Button size="sm" onClick={addSkill} disabled={!newSkill.trim()}>Add</Button>
                      </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill) => (
                          <span key={skill} className={cn(
                              "px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1",
                              isEditing ? "bg-gray-100 text-gray-700 pr-2" : "bg-primary-50 text-primary-700"
                          )}>
                              {skill}
                              {isEditing && (
                                  <button onClick={() => removeSkill(skill)} className="text-gray-400 hover:text-red-500">
                                      <X className="h-3 w-3" />
                                  </button>
                              )}
                          </span>
                      ))}
                      {profile.skills.length === 0 && !isEditing && (
                          <p className="text-gray-500 text-sm italic">No skills added.</p>
                      )}
                  </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center gap-2">
                      <Languages className="h-5 w-5 text-primary" />
                      Languages
                  </h3>

                  {isEditing && (
                      <div className="flex gap-2 mb-4">
                          <Input 
                              value={newLanguage}
                              onChange={(e) => setNewLanguage(e.target.value)}
                              placeholder="Add language..."
                              className="h-9 text-sm"
                              onKeyDown={(e) => e.key === 'Enter' && addLanguage()}
                          />
                          <Button size="sm" onClick={addLanguage} disabled={!newLanguage.trim()}>Add</Button>
                      </div>
                  )}

                  <div className="space-y-2">
                      {profile.languages.map((lang) => (
                          <div key={lang} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                              <span className="text-gray-700 font-medium text-sm">{lang}</span>
                              {isEditing && (
                                  <button onClick={() => removeLanguage(lang)} className="text-gray-400 hover:text-red-500">
                                      <X className="h-4 w-4" />
                                  </button>
                              )}
                          </div>
                      ))}
                      {profile.languages.length === 0 && !isEditing && (
                          <p className="text-gray-500 text-sm italic">No languages added.</p>
                      )}
                  </div>
              </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
          {/* Posts Feed for Profile */}
          {USER_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                  <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{profile.university} Union</span>
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
                <img src={post.image} alt="Post content" className="w-full h-auto max-h-[500px] object-cover" />
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
            </div>
          ))}
          {USER_POSTS.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed">
              <p className="text-gray-500">No posts yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
