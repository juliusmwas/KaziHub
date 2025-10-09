import { CiSearch } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import { GrProjects } from "react-icons/gr";
import { FiBell } from "react-icons/fi";


export default function Reminders () {
    return(
          <div>
                    <nav className=" bg-white items-center p-2 shadow-sm rounded-xl ">
                        <div>
                            <h1 className=" flex items-center  gap-3 text-lg text-blue-600 font-bold lg:text-2xl"><FiBell /> Reminders</h1>
                            <p className="text-xs font-normal text-gray-500">Keep track of your one-off tasks and quick reminders</p>
                        </div>
        
                        <div className="flex gap-2  mt-3">
                            <p className="text-xs  text-black font-medium p-0.5 lg:p-1 bg-gray-200 rounded-sm w-32">0/0 Task Completed</p>
                            <p className="text-xs  text-black font-medium p-0.5 lg:p-1 bg-gray-200 rounded-sm w-32">0 Total Reminders</p>
                        </div>
                    </nav>
        
                    
        
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 items-center ">
                        <div className=" flex items-center bg-gray-50 border-1 border-gray-300 rounded-xl px-3 py-2 w-full max-w-sm shadow-sm">
                            <CiSearch className="text-gray-600 text-xl mr-2" />
                            <input
                                type="text"
                                placeholder="Search reminders..."
                                className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-700 text-xs font-normal"
                            />
                        </div>
        
                        <div className=" bg-gray-50 border-1 border-gray-300 p-2 rounded-xl shadow-sm text-xs font-normal">
                            <select name="" id="" className="w-full bg-gray-50" >
                                <option value="All status">All status</option>
                                <option value="Not Started">Not Started</option>
                                <option value="In progress"> In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
        
                        <div className=" bg-gray-50 border-1 border-gray-300 p-2 rounded-xl shadow-sm text-xs font-normal">
                            <select name="" id="" className="w-full bg-gray-50">
                                <option value="All Priority">All Priority</option>
                                <option value="Plannig">High</option>
                                <option value="Active">Medium</option>
                                <option value="On hold">Low</option>
                            </select>
                        </div>
                        
                        <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white flex gap-4   justify-center items-center font-medium text-xs lg:text-sm rounded-lg  p-2 cursor-pointer hover:bg-blue-500"><span>+</span>New Reminder</button>
                
                    </div>
        
                    <div className="grid justify-items-center bg-gray-50 p-10 shadow-sm rounded-xl mt-4">
                        <div className="justify-items-center p-5">
                            <FiBell className="text-2xl text-gray-500"/>
                            <h1 className="text-lg font-medium  p-1 lg:text-2xl">No reminders yet</h1>
                            <p className="text-xs font-normal p-1 text-gray-500">Create your first reminder to keep track of important tasks!</p>
                            <button className="bg-blue-600 mt-2 text-white flex gap-4  items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500">+ Create New Reminder</button>
                        </div>    
                    </div>
        
                </div>
    );
}