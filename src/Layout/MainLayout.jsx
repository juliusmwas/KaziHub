import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // desktop toggle
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile overlay toggle

  return (
    <div className="flex h-screen overflow-hidden bg-blue-50">
      {/* 🌐 Sidebar for large screens */}
      <div
        className={`hidden lg:block fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-60 translate-x-0" : "-translate-x-60"
        }`}
      >
        <Sidebar />
      </div>

      {/* 📱 Sidebar for mobile */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Dark overlay (click to close) */}
        <div
          className={`absolute inset-0 bg-black/40 ${
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } transition-opacity duration-300`}
          onClick={() => setIsMobileOpen(false)}
        ></div>

        {/* Sidebar panel */}
        <div className="relative w-60 h-full bg-white shadow-lg">
          <Sidebar />
        </div>
      </div>

      {/* 🧠 Main Content */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "lg:ml-60" : "ml-0"
        }`}
      >
        {/* Fixed Navbar */}
        <div className="sticky top-0 z-30">
          <Navbar
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
          />
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
