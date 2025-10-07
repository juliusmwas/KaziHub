import { NavLink } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { GrProjects } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import { FiCalendar, FiBell } from "react-icons/fi";
import { LuStickyNote } from "react-icons/lu";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/", icon: <RiDashboardLine /> },
    { name: "Projects", path: "/projects", icon: <GrProjects /> },
    { name: "Collaborations", path: "/collaborations", icon: <TbUsers /> },
    { name: "Calendar", path: "/calender", icon: <FiCalendar /> },
    { name: "Reminders", path: "/reminders", icon: <FiBell /> },
    { name: "Notes", path: "/notes", icon: <LuStickyNote /> },
    { name: "Analytics", path: "/analytics", icon: <IoBarChartOutline /> },
    { name: "Settings", path: "/settings", icon: <IoSettingsOutline /> },
  ];

  return (
    <aside className="h-full w-60 bg-white shadow-md border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h1 className="text-sm font-medium text-gray-400">Navigation</h1>
      </div>

      <ul className="flex-1 px-2 py-4 space-y-1">
        {links.map(({ name, path, icon }) => (
          <li key={name}>
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-blue-600 bg-gray-100 font-medium"
                    : "text-blue-500 hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span className="text-sm">{name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
