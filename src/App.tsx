import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import UnionsList from "./pages/UnionsList";
import UnionDetails from "./pages/UnionDetails";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route element={<AppLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/unions" element={<UnionsList />} />
          <Route path="/union/:id" element={<UnionDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/messages" element={<Messages />} />
          
          {/* Redirects */}
          <Route path="/map" element={<Navigate to="/unions" />} />
          <Route path="/academic" element={<Navigate to="/profile/me" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
