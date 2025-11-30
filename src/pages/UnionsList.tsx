import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";

const UNIONS = [
  { id: 1, name: "Harvard Union", members: "15.2k", location: "Cambridge, MA", x: "28%", y: "35%", color: "bg-red-600" },
  { id: 2, name: "MIT Union", members: "12.5k", location: "Cambridge, MA", x: "29%", y: "36%", color: "bg-red-500" },
  { id: 3, name: "Oxford Union", members: "18.1k", location: "Oxford, UK", x: "48%", y: "28%", color: "bg-blue-600" },
  { id: 4, name: "Sharif Union", members: "8.4k", location: "Tehran, Iran", x: "62%", y: "38%", color: "bg-green-600" },
  { id: 5, name: "Tsinghua Union", members: "22.3k", location: "Beijing, China", x: "78%", y: "35%", color: "bg-purple-600" },
  { id: 6, name: "Sydney Union", members: "10.1k", location: "Sydney, Australia", x: "85%", y: "75%", color: "bg-yellow-500" },
];

export default function UnionsList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUnions = UNIONS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Global Unions</h1>
          <p className="text-gray-500">Explore academic communities worldwide.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search unions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 h-10 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
      </div>

      {/* Union List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUnions.map((union) => (
          <Link 
            key={union.id} 
            to={`/union/${union.id}`}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${union.color} bg-opacity-10 flex items-center justify-center text-xl font-bold ${union.color.replace('bg-', 'text-')}`}>
                {union.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{union.name}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {union.members}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {union.location}</span>
                </div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>

      {/* Integrated Map View */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Interactive Map
        </h2>
        <div className="h-[400px] bg-secondary-900 rounded-2xl overflow-hidden relative shadow-inner border border-secondary-800">
          {/* Placeholder World Map Background */}
          <div 
            className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain"
            style={{ filter: 'invert(1)' }}
          ></div>

          {/* Interactive Markers */}
          {UNIONS.map((union) => (
            <Link
              key={union.id}
              to={`/union/${union.id}`}
              className="absolute group"
              style={{ left: union.x, top: union.y }}
            >
              <div className="relative flex items-center justify-center">
                <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-75 ${union.color}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${union.color} border-2 border-white shadow-lg`}></span>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max z-10">
                  <div className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                    {union.name}
                  </div>
                  <div className="w-2 h-2 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
