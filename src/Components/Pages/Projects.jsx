
import { GrProjects } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";

export default function Projects () {
    return(
        <div>
            <nav className=" bg-white items-center p-2 shadow-sm rounded-xl flex justify-between">
                <div>
                    <h1 className="text-lg text-blue-600 font-bold lg:text-2xl">KaziHub</h1>
                    <p className="text-xs font-normal text-gray-500">Organize • Plan • Achieve</p>
                </div>

                <div className="flex gap-1 flex-col">
                    <p className="text-xs  text-black font-medium p-0.5 lg:p-1 bg-gray-300 rounded-sm">0 Active Projects</p>
                    <p className="text-xs  text-black font-medium p-0.5 lg:p-1 bg-gray-300 rounded-sm">0/0 Tasks Done</p>
                </div>
            </nav>

            <div className="bg-gray-100 mt-3 p-2 lg:p-3 shadow-sm rounded-xl">
                <h1 className="flex items-center gap-5 justify-center text-lg text-blue-600 font-bold lg:text-2xl"><span><GrProjects /></span>Projects</h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 items-center ">
                <div className=" flex items-center bg-gray-50 border-1 border-gray-300 rounded-xl px-3 py-2 w-full max-w-sm shadow-sm">
                    <CiSearch className="text-gray-600 text-xl mr-2" />
                    <input
                        type="text"
                        placeholder="Search projects here..."
                        className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-700 text-xs font-normal"
                    />
                </div>

                <div className=" bg-gray-50 border-1 border-gray-300 p-2 rounded-xl shadow-sm text-xs font-normal">
                    <select name="" id="" className="w-full bg-gray-50" >
                        <option value="All status">All status</option>
                        <option value="Plannig">Planning</option>
                        <option value="Active">Active</option>
                        <option value="On hold">On Hold</option>
                        <option value="Complete">Complete</option>
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
                
                <button className="bg-gradient-to-r from-blue-500 to-green-500 text-white flex gap-4 px-4  justify-center items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"><span>+</span>New Project</button>
        
            </div>

            <div className="grid justify-items-center bg-gray-50 p-10 shadow-sm rounded-xl mt-4">
                <div className="justify-items-center p-5">
                    <GrProjects className="text-2xl text-gray-500"/>
                    <h1 className="text-lg font-medium  p-1 lg:text-2xl">No projects yet</h1>
                    <p className="text-xs font-normal p-1 text-gray-500">Create your first project to start organizing your goals!</p>
                    <button className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500">+ Create New Project</button>
                </div>    
            </div>

            <div className="group bg-gray-50 border border-gray-300 rounded-xl w-32 flex gap-3 items-center mt-5 p-2 cursor-pointer hover:bg-green-600 hover:text-white">
                <FiUserPlus className="text-sm font-bold text-gray-500 group-hover:text-white" />
                <p className="text-sm font-medium text-gray-500 group-hover:text-white">Invite User</p>
            </div>


        </div>
    );
}