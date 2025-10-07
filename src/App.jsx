import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Components/Pages/Dashboard";
import Projects from "./Components/Pages/Projects";
import Collaborations from "./Components/Pages/Collaborations";
import Calender from "./Components/Pages/Calender";
import Reminders from "./Components/Pages/Reminders";
import Notes from "./Components/Pages/Notes";
import Analytics from "./Components/Pages/Analytics";
import Settings from "./Components/Pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="collaborations" element={<Collaborations />} />
        <Route path="calender" element={<Calender />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="notes" element={<Notes />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
