import { FiFolderPlus } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";

export default function Collaborations () {
    return(
        <div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4  items-center">
                <div className="col-span-3">
                    <h1 className="text-xl lg:text-2xl mb-2 font-bold">Collaborative Workspaces</h1>
                    <p className="text-xs font-normal text-gray-500">Create and manage shared projects with your team.</p>
                </div>

                <div>
                    <button className="bg-blue-600 w-full mt-3 justify-center text-white flex gap-4 px-4 items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"><FiFolderPlus />  New Collaborative Project</button>
                </div>
            </div>
        <div className="mt-6">
            <h1 className="text-xl font-semibold">Your Collaborative Projects</h1>
        </div>
        
        <div className="bg-white p-5 mt-5 shadow-xs rounded-xl">
            <div className="p-7 grid justify-items-center">
                <TbUsers className="text-5xl text-gray-400  font-semibold" />
                <h1 className="text-xl font-medium p-1">No collaborative projects yet</h1>
                <p className="text-xs font-normal text-gray-500">Start collaborating by creating a new project or accepting invitations from team members.</p>
                <div className="lg:flex p-3 gap-4 items-center grid grid-cols-1">
                    <button className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"><span>+</span> Create Project</button>
                    <button className="bg-gray-400 text-white flex justify-center gap-4 px-4 items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500">Browse Project</button>
                </div>
            </div>
            
        </div>
        <div className="group bg-gray-50 border border-gray-300 rounded-xl w-32 flex gap-3 items-center mt-5 p-2 cursor-pointer hover:bg-green-600 hover:text-white">
            <FiUserPlus className="text-sm font-bold text-gray-500 group-hover:text-white" />
            <p className="text-sm font-medium text-gray-500 group-hover:text-white">Invite User</p>
        </div>

        

        </div>
    );
}