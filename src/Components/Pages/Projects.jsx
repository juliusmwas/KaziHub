
import { GrProjects } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";

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

            <div className="bg-white mt-3 p-2 lg:p-3 shadow-sm rounded-xl">
                <h1 className="flex items-center gap-5 justify-center text-lg text-blue-600 font-bold lg:text-2xl"><span><GrProjects /></span>Projects</h1>
            </div>

            <div>
                <div className="mt-2 flex items-center bg-white rounded-xl px-3 py-2 w-full max-w-sm shadow-sm">
                    <CiSearch className="text-gray-600 text-xl mr-2" />
                    <input
                        type="text"
                        placeholder="Search projects here..."
                        className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-700"
                    />
                </div>

                <div>
                    <select name="" id="">
                        <option value="All status">All status</option>
                        <option value="Plannig">Planning</option>
                        <option value="Active">Active</option>
                        <option value="On hold">On Hold</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>

                <div>
                    <select name="" id="">
                        <option value="All Priority">All Priority</option>
                        <option value="Plannig">High</option>
                        <option value="Active">Medium</option>
                        <option value="On hold">Low</option>
                    </select>
                </div>
                <div>c</div>
                <button className="bg-blue-600 text-white flex gap-4 px-4 items-center font-medium text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500"><span>+</span> Create New Project</button>
        
            </div>
        </div>
    );
}