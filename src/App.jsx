import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Dashboard from "./Components/Pages/Dashboard";
import Projects from "./Components/Pages/Projects";
import Collaborations from "./Components/Pages/Collaborations";
import Calender from "./Components/Pages/Calender";
import Reminders from "./Components/Pages/Reminders";
import Notes from "./Components/Pages/Notes";
import Analytics from "./Components/Pages/Analytics";
import Settings from "./Components/Pages/Settings";
import LandingPage from "./Components/Pages/LandingPage";
import GetStarted from "./Components/Pages/GetStarted";
import ProjectDetails from "./Components/ProjectDetails"; 

export default function App() {
  return (
    <Routes>
      {/* Landing and Auth pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/get-started" element={<GetStarted />} />

      {/* Protected Main App */}
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:id" element={<ProjectDetails />} /> 
        <Route path="collaborations" element={<Collaborations />} />
        <Route path="calender" element={<Calender />} />
        <Route path="reminders" element={<Reminders />} />
        <Route path="notes" element={<Notes />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirects for old paths */}
      <Route path="/settings" element={<Navigate to="/app/settings" replace />} />
      <Route path="/projects" element={<Navigate to="/app/projects" replace />} />
      <Route path="/dashboard" element={<Navigate to="/app" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
