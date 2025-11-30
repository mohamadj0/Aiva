import { Calendar, MapPin, Video, Clock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";

const EVENTS = [
  {
    id: 1,
    title: "Global AI Ethics Symposium",
    organizer: "Stanford Union",
    date: "Nov 12, 2024",
    time: "14:00 GMT",
    type: "Conference",
    isLive: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Advanced Quantum Mechanics Workshop",
    organizer: "MIT Union",
    date: "Nov 15, 2024",
    time: "09:00 EST",
    type: "Workshop",
    isLive: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Sustainable Architecture Thesis Defense",
    organizer: "Delft Union",
    date: "Nov 18, 2024",
    time: "11:00 CET",
    type: "Defense",
    isLive: false,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Events() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Academic Events</h1>
          <p className="text-gray-500">Conferences, Defenses, and Workshops</p>
        </div>
        <Button>Create Event</Button>
      </div>

      <div className="grid gap-6">
        {EVENTS.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
            <div className="md:w-1/3 h-48 md:h-auto relative">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              {event.isLive && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-gray-900">
                {event.type}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
                  <Calendar className="h-4 w-4" />
                  {event.date} • {event.time}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  {event.organizer}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                    ))}
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500">+42</div>
                </div>
                <Button size="sm" className="gap-2">
                    View Details <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
