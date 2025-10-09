import { LuClock4 } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // keep this import for functionality

export default function Calender() {
  const [value, setValue] = useState(new Date());

  // 🗓️ Example tasks for specific days (you can later fetch these from an API)
  const tasks = {
    "2025-10-09": ["Finish React dashboard", "Review UI design", "Send progress report"],
    "2025-10-10": ["Team meeting at 10AM", "Fix calendar hover bug"],
    "2025-10-12": ["Deploy new build", "Prepare project documentation"],
  };

  // Format the selected date
  const formattedDate = value.toISOString().split("T")[0];
  const dayTasks = tasks[formattedDate] || [];

  return (
    <div>
      <div className="bg-white p-3 shadow-xs rounded-xl">
        {/* Header */}
        <div className="flex items-center gap-3 p-2">
          <LuClock4 className="text-sm font-medium lg:text-xl" />
          <h1 className="text-lg text-gray-800 font-medium lg:text-2xl">
            Pending Tasks
          </h1>
          <p className="text-gray-500 text-sm font-medium">(0)</p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500 text-sm" />
          <select className="bg-gray-50 border border-gray-300 p-2 rounded-xl shadow-sm text-xs font-normal w-64">
            <option>All Tasks (0)</option>
            <option>Overdue (0)</option>
            <option>Due Today (0)</option>
            <option>Upcoming (0)</option>
            <option>High priority (0)</option>
          </select>
        </div>

        {/* Empty state */}
        <div className="grid justify-items-center m-10 p-5">
          <IoMdCheckmarkCircleOutline className="text-3xl text-gray-500 font-medium lg:text-4xl" />
          <p className="text-gray-500 text-sm font-medium">No pending tasks</p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white mt-6 p-4 rounded-xl shadow-sm">
        <h1 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Calendar
        </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-xl overflow-hidden">
            <Calendar
              onChange={setValue}
              value={value}
              className="w-full text-sm rounded-xl border-none"
            />
          </div>
        </div>
      </div>

      {/* Selected Date Display + Tasks */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow-sm">
        <h2 className="text-center text-gray-800 font-semibold mb-2">
          Tasks for {value.toDateString()}
        </h2>

        {dayTasks.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
            {dayTasks.map((task, index) => (
              <li
                key={index}
                className="hover:text-green-600 transition-colors duration-200"
              >
                {task}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 text-sm italic">
            No tasks for this day
          </p>
        )}
      </div>

      {/* Inline Tailwind Overrides */}
      <style jsx>{`
        /* Calendar overrides for modern look */
        .react-calendar {
          background-color: white;
          border-radius: 0.75rem;
          width: 100%;
        }
        .react-calendar__tile {
          padding: 0.75rem 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }
        .react-calendar__tile:hover {
          background-color: #16a34a;
          color: white;
        }
        .react-calendar__tile--active {
          background-color: #16a34a !important;
          color: white !important;
        }
        .react-calendar__navigation button {
          color: #16a34a;
          font-weight: 600;
          border-radius: 0.5rem;
        }
        .react-calendar__navigation button:hover {
          background-color: #dcfce7;
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
}
