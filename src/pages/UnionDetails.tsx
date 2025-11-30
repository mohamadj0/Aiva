import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Users, Filter, Search, MessageCircle, UserPlus } from "lucide-react";
import { Button } from "../components/ui/Button";

const MEMBERS = [
  { id: 1, name: "Dr. Emily White", role: "Faculty", major: "Physics", level: "Professor" },
  { id: 2, name: "John Doe", role: "Student", major: "Computer Science", level: "Master's" },
  { id: 3, name: "Alice Smith", role: "Student", major: "Mathematics", level: "Bachelor's" },
  { id: 4, name: "Robert Brown", role: "Staff", major: "Administration", level: "Staff" },
  { id: 5, name: "Sarah Connor", role: "Student", major: "Robotics", level: "Ph.D." },
];

export default function UnionDetails() {
  const { id } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Union Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-secondary-50 z-0"></div>
        <div className="relative z-10">
            <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center text-secondary-900 text-3xl font-bold mb-4 shadow-lg border-2 border-secondary-50">
            U{id}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Union Details</h1>
            <p className="text-gray-500">Viewing members and activities</p>
            
            <div className="flex justify-center gap-8 mt-6 text-sm">
            <div className="text-center">
                <div className="font-bold text-xl text-gray-900">12.5k</div>
                <div className="text-gray-500">Members</div>
            </div>
            <div className="text-center">
                <div className="font-bold text-xl text-gray-900">45</div>
                <div className="text-gray-500">Societies</div>
            </div>
            </div>
        </div>
      </div>

      {/* Advanced Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search members..." 
              className="w-full pl-9 pr-4 h-9 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:border-primary"
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full md:w-auto gap-2"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        {filterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
            <select className="h-9 rounded-lg border border-gray-200 text-sm px-2">
              <option>All Roles</option>
              <option>Faculty</option>
              <option>Student</option>
            </select>
            <select className="h-9 rounded-lg border border-gray-200 text-sm px-2">
              <option>All Degrees</option>
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>Ph.D.</option>
            </select>
            <select className="h-9 rounded-lg border border-gray-200 text-sm px-2">
              <option>All Majors</option>
              <option>Computer Science</option>
              <option>Physics</option>
            </select>
            <select className="h-9 rounded-lg border border-gray-200 text-sm px-2">
              <option>Any Status</option>
              <option>Active</option>
              <option>Alumni</option>
            </select>
          </div>
        )}
      </div>

      {/* Member List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 font-semibold text-gray-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Members
        </div>
        <div className="divide-y divide-gray-100">
          {MEMBERS.map((member) => (
            <div key={member.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors group">
              <Link to={`/profile/${member.id}`} className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors">{member.name}</h4>
                  <p className="text-xs text-gray-500">{member.level} • {member.major}</p>
                </div>
                <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    member.role === 'Faculty' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                    {member.role}
                </span>
              </Link>
              
              <div className="flex items-center gap-2 self-end md:self-auto">
                 <Button variant="ghost" size="sm" className="text-gray-500 h-8">
                    <UserPlus className="h-4 w-4" />
                 </Button>
                 <Link to="/messages">
                    <Button size="sm" variant="outline" className="h-8 text-xs gap-2">
                        <MessageCircle className="h-3 w-3" />
                        Request Chat
                    </Button>
                 </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
