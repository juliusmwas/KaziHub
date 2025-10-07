import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-60  dark:bg-gray-950 min-h-screen">
        <Navbar />
        <main className="p-6">
          <Outlet /> {/* renders the selected page here */}
        </main>
      </div>
    </div>
  );
}
