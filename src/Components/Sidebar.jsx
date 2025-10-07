import { NavLink } from "react-router-dom";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function Sidebar() {
 const links = [
  { name: "Dashboard", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Collaborations", path: "/collaborations" },
  { name: "Calendar", path: "/calender" },
  { name: "Reminders", path: "/reminders" },
  { name: "Notes", path: "/notes" },
  { name: "Analytics", path: "/analytics" },
  { name: "Settings", path: "/settings" },
];


  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white dark:bg-gray-900 shadow-md border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Navigation
        </h1>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200">
          <FaArrowCircleLeft size={18} />
        </button>
      </div>

      {/* Links */}
      <ul className="flex-1 px-2 py-4 space-y-1">
        {links.map(({ name, path }) => (
          <li key={name}>
            <NavLink
              to={path}
              end={path === "/"} // makes '/' active only on home
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
