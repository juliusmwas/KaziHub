import { LiaMedalSolid } from "react-icons/lia";
import { IoBarChartOutline } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiHazardSign } from "react-icons/gi";
import { LuClock4 } from "react-icons/lu";
import { FiTrendingUp } from "react-icons/fi";

export default function Analytics () {
    return(
        <div>
            <div>
                <div className="flex items-center gap-2">
                    <IoBarChartOutline className="text-xl font-medium  p-1 lg:text-2xl" />
                    <h1 className="text-xl font-bold  p-1 lg:text-2xl">Analytics</h1>
                </div>
                <p className="text-xs font-normal p-1 text-gray-500">Track your productivity and performance insights</p>
            </div>

            <div className="flex mt-3 items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold  p-1 lg:text-xl">Analytics Dashboard</h1>
                    <p className="text-xs font-normal p-1 text-gray-500">Get insights into your productivity and progress</p>
                </div>
                <div className="flex items-center">
                    <LiaMedalSolid  className="text-xl font-semibold  p-1 lg:text-2xl"/>
                    <p className="text-sm lg:text-sm  font-bold p-1 text-gray-500">Productivity Score: 0%</p>
                </div>
            </div>

            <div className="grid  grid-cols-1  gap-4 mt-5 lg:grid-cols-4 ">
                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center  justify-between">
                        <h2  className="text-xs font-bold  p-1 text-gray-800">Total Projects</h2>
                        <GoProjectRoadmap className="text-xl font-bold  p-1 text-blue-600" />
                    </div>
                    <h1 className="text-xl font-bold  p-1 text-blue-600">0</h1>
                    <p className="text-xs   font-normal p-1 text-gray-500">0 active, 0 completed</p>
                </div>

                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center  justify-between">
                        <h2  className="text-xs font-bold  p-1 text-gray-800">Task Completion</h2>
                        <IoMdCheckmarkCircleOutline  className="text-xl font-bold  p-1 text-green-600" />
                    </div>
                    <h1 className="text-xl font-bold  p-1 text-green-600">0%</h1>
                    <p className="text-xs   font-normal p-1 text-gray-500">0 of 0 tasks completed</p>
                </div>

                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center  justify-between">
                        <h2  className="text-xs font-bold  p-1 text-gray-800">Avg Progress</h2>
                        <IoBarChartOutline className="text-xl font-bold  p-1 text-orange-500" />
                    </div>
                    <h1 className="text-xl font-bold  p-1 text-orange-500">0%</h1>
                    <p className="text-xs   font-normal p-1 text-gray-500">Across all active projects</p>
                </div>
                
                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center  justify-between">
                        <h2  className="text-xs font-bold  p-1 text-gray-800">Overdue Tasks</h2>
                        <GiHazardSign  className="text-xl font-bold  p-1 text-red-700" />
                    </div>
                    <h1 className="text-xl font-bold  p-1 text-red-700">0</h1>
                    <p className="text-xs   font-normal p-1 text-gray-500">All tasks on track</p>
                </div>
            </div>

            <div className="grid grid-cols-1  gap-4 mt-5 lg:grid-cols-2">
                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center gap-2 p-2">
                        <GoProjectRoadmap className="text-2xl font-bold  p-1 text-blue-600" />
                        <h1 className="text-lg lg:text-xl  font-semibold">Project Status Overview</h1>
                    </div>

                    <div className="grid ">
                        <div className="flex items-center justify-between p-2">
                           <p className="text-xs   font-medium p-1 ">Active Projects</p>
                           <p className="text-xs   font-medium p-1 ">0/0</p> 
                        </div>
                        <div className="flex items-center justify-between p-2">
                           <p className="text-xs   font-medium p-1 ">Completed Projects</p>
                           <p className="text-xs   font-medium p-1 ">0/0</p> 
                        </div>
                        <div className="flex items-center justify-between p-2">
                           <p className="text-xs   font-medium p-1 ">On Hold</p>
                           <p className="text-xs   font-medium p-1 ">0/0</p> 
                        </div>
                                            
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center gap-2 p-2">
                         <GiHazardSign  className="text-2xl font-bold  p-1 text-red-700" />
                         <h1 className="text-lg lg:text-xl  font-semibold">High Priority Projects</h1>
                    </div>
                    <div  className="grid justify-items-center p-10">
                        <p className="text-xs font-medium p-1 ">No high priority projects at the moment</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center gap-2 p-2">
                        <LuClock4 className="text-2xl font-bold  p-1 text-blue-700" />
                        <h1 className="text-lg lg:text-xl  font-semibold">Recent Activity</h1>
                    </div>
                    <div className="grid gap-3 w-full">
                        <div className="bg-gray-100 rounded-xl px-4 p-2">
                            <h1 className="text-sm lg:text-sm  font-semibold">Task Completed</h1>
                            <p className="text-xs font-normal text-gray-500">Sample Projects</p>
                            <p className="text-xs font-normal text-gray-500">2 hrs ago</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl px-4 p-2">
                            <h1 className="text-sm lg:text-sm  font-semibold">Task Completed</h1>
                            <p className="text-xs font-normal text-gray-500">Sample Projects</p>
                            <p className="text-xs font-normal text-gray-500">2 hrs ago</p>
                        </div>
                        <div className="bg-gray-100 rounded-xl px-4 p-2">
                            <h1 className="text-sm lg:text-sm  font-semibold">Task Completed</h1>
                            <p className="text-xs font-normal text-gray-500">Sample Projects</p>
                            <p className="text-xs font-normal text-gray-500">2 hrs ago</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 px-4 shadow-sm">
                    <div className="flex items-center gap-2 p-2">
                        <FiTrendingUp className="text-2xl font-bold  p-1 text-blue-700" />
                        <h1 className="text-lg lg:text-xl  font-semibold">Productivity Insights</h1>
                    </div>
                    <div className="grid gap-3">
                        <div className="bg-green-100 rounded-xl px-4 p-5">
                            <h2 className="text-xs lg:text-sm text-green-500  pb-3 font-semibold">Great Progress!</h2>
                            <p className="text-xs font-normal text-gray-500">You've completed 0% of your tasks. Keep up the momentum!</p>
                        </div>
                        <div className="bg-blue-100 rounded-xl px-4 p-5">
                            <h2 className="text-xs lg:text-sm text-blue-500  pb-3 font-semibold">Tip of the Day</h2>
                            <p className="text-xs font-normal text-gray-500">Break large tasks into smaller, manageable chunks to maintain momentum.</p>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
}