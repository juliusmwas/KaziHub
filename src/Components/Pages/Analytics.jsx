import { LiaMedalSolid } from "react-icons/lia";
import { IoBarChartOutline } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiHazardSign } from "react-icons/gi";

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
                        <h2  className="text-xl font-bold  p-1 text-gray-800">Overdue Tasks</h2>
                        <GiHazardSign  className="text-xl font-bold  p-1 text-red-700" />
                    </div>
                    <h1 className="text-lg font-bold  p-1 text-red-700">0</h1>
                    <p className="text-xs   font-normal p-1 text-gray-500">All tasks on track</p>
                </div>
            </div>
        </div>
    );
}