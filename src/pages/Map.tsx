import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

// Mock coordinates for a static map visualization
const UNIONS = [
  { id: 1, name: "Harvard Union", x: "28%", y: "35%", color: "bg-red-600" },
  { id: 2, name: "Oxford Union", x: "48%", y: "28%", color: "bg-blue-600" },
  { id: 3, name: "Sharif Union", x: "62%", y: "38%", color: "bg-green-600" },
  { id: 4, name: "Tsinghua Union", x: "78%", y: "35%", color: "bg-purple-600" },
  { id: 5, name: "Sydney Union", x: "85%", y: "75%", color: "bg-yellow-500" },
];

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-140px)] bg-secondary-900 rounded-2xl overflow-hidden relative shadow-inner border border-secondary-800">
      {/* Placeholder World Map Background */}
      <div 
        className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain"
        style={{ filter: 'invert(1)' }}
      ></div>

      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg max-w-xs">
        <h2 className="font-bold text-secondary-900 text-lg">Global Union Map</h2>
        <p className="text-sm text-gray-600 mt-1">Explore academic communities worldwide. Click a marker to visit the Union.</p>
      </div>

      {/* Interactive Markers */}
      {UNIONS.map((union) => (
        <Link
          key={union.id}
          to={`/union/${union.id}`}
          className="absolute group"
          style={{ left: union.x, top: union.y }}
        >
          <div className="relative flex items-center justify-center">
            <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${union.color}`}></span>
            <span className={`relative inline-flex rounded-full h-4 w-4 ${union.color} border-2 border-white shadow-lg`}></span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max">
              <div className="bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded shadow-lg">
                {union.name}
              </div>
              <div className="w-2 h-2 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
        </Link>
      ))}

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-mono text-gray-500">
        Live Activity
      </div>
    </div>
  );
}
