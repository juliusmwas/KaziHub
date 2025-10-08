
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
                <div className="flex">
                    <CiSearch />
                    <input type="text" className="bg-amber-300 " />
                </div>
            </div>
        </div>
    );
}