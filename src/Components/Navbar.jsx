import { FiSidebar, FiBell } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Navbar({ toggleSidebar, toggleMobile }) {
  const [greeting, setGreeting] = useState("Good evening");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <nav className="bg-white h-11 shadow-sm flex justify-between items-center px-3 sticky top-0 z-30">
      <div className="flex items-center gap-5">
        <button
          className="text-xl cursor-pointer lg:text-2xl text-blue-500 hover:text-blue-600"
          onClick={() => {
            if (window.innerWidth < 1024) toggleMobile();
            else toggleSidebar();
          }}
        >
          <FiSidebar />
        </button>

        <p className="text-xs font-normal text-gray-500">
          {greeting}, Julius
        </p>
      </div>

      <div className="px-3 flex items-center text-2xl cursor-pointer text-gray-600 hover:text-blue-500">
        <FiBell />
      </div>
    </nav>
  );
}
