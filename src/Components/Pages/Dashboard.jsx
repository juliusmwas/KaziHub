import { FiUsers, FiBarChart2, FiClock, FiTrendingUp } from "react-icons/fi";
import { GoProjectRoadmap } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { FiCalendar, FiBell } from "react-icons/fi";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";


export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-500 text-sm">Your productivity overview at a glance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Active Projects", value: "0", text: "completed this month",icon: <GoProjectRoadmap /> },
          { title: "Task Completed", value: "0",  text: "in the last 7 days", icon: <IoMdCheckmarkCircleOutline /> },
          { title: "Pending Tasks", value: "0", text: "overdue", icon: <LuClock4 /> },
          { title: "Overall Progress", value: "0%", text: "in the last 7 days", icon: <FiTrendingUp /> },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-xl p-4  items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="py-1 flex items-center justify-between">
              <p className="text-black font-medium text-xs">{card.title}</p>
              <div className="text-blue-500 text-sm">{card.icon}</div>
            </div>

            <p className=" py-2 text-lg font-bold text-black">{card.value}</p>
            <p className="text-xs font-normal text-gray-500">{card.value} {card.text}</p>
            
          </div>
        ))}
      </div>

      
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
        <div className="bg-white shadow-sm rounded-xl p-4  hover:shadow-md transition-shadow">
          <div className="flex gap-2 items-center">
            <FiTrendingUp className="text-xs font-medium lg:text-sm" />
            <h1 className="text-lg font-medium lg:text-2xl">Recent Activity</h1>
          </div>
          <p className="text-xs font-normal text-gray-500">Your productivity in the last 7 days</p>

          <div className="gap-3 py-3 grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
            <div className="bg-gray-100  grid text-center items-center  rounded-xl p-7  hover:shadow-md transition-shadow">
              <h1 className="text-blue-500 font-medium">0</h1>
              <p className="text-xs font-normal text-gray-500">Tasks Completed</p>
            </div>

            <div className="bg-gray-100  grid text-center items-center  rounded-xl p-7  hover:shadow-md transition-shadow">
              <h1 className="text-blue-500 font-medium">0</h1>
              <p className="text-xs font-normal text-gray-500">Projects Created</p>
            </div>
          </div>
        </div>

        <div className=" bg-white shadow-sm rounded-xl p-4  hover:shadow-md transition-shadow"> 
           <div className="flex items-center gap-3">  
              <FiCalendar className="text-xs font-medium lg:text-sm"/>
              <h1 className="text-lg font-medium lg:text-2xl">Upcoming Deadlines</h1>
           </div>
           <p className="text-xs font-normal text-gray-500">Tasks that need your attention soon</p>

           <div className="py-7 grid justify-items-center">
            <FiCalendar className="text-3xl text-gray-500" />
            <p className="text-sm lg:text-xl text-gray-500" >No upcoming deadlines</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:gap-5 lg:grid-cols-3">
        <div className="col-span-1 bg-white shadow-sm rounded-xl p-4  hover:shadow-md transition-shadow">
          <h1 className="text-lg font-medium lg:text-2xl">Quick Actions</h1>
          <p className="text-xs font-normal text-gray-500">Get things done faster</p>
          <div className="py-3  gap-2 grid grid-cols-1">
            <button className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-600"><span>+</span> Create New Project</button>
            <button className="bg-gray-100 text-black flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-green-600 hover:text-white"><span><LuClock4 /></span> View Reminders</button>
            <button className="bg-gray-100 text-black flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-green-600 hover:text-white"><span><IoBarChartOutline /></span> Analytics Dashboard</button>
          </div> 
        </div>

        <div className=" col-span-2 p-4 bg-white shadow-sm rounded-xl mt-4 lg:m-0  hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-medium lg:text-2xl">Active Projects</h1>
              <p className="text-xs font-normal text-gray-500">Projects currently in progress</p>
            </div>
            <p className="flex items-center gap-2 text-xs font-normal text-gray-500 cursor-pointer hover:bg-green-600 hover:text-white p-1 px-2 rounded-sm">View All <span><FaArrowRight /></span></p>
          </div>
          
          <div className="py-8  grid justify-items-center">
            <GoProjectRoadmap className="text-3xl"/>
            <p className="text-xs p-2 font-normal text-gray-500">No active Projects</p>
            <button className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"><span>+</span> Create New Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}
