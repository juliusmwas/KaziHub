import { CiSearch } from "react-icons/ci";


export default function Notes () {
    return(
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg text-black font-bold lg:text-2xl">Notes</h1>
                    <p className="text-xs font-normal p-1 text-gray-500">Quick notes for meetings, ideas, and thoughts</p>
                </div>
                <button className="bg-blue-600 mt-2 text-white flex gap-4  items-center font-medium text-xs lg:text-sm rounded-lg p-2 cursor-pointer hover:bg-blue-500">+ New Note</button>
            </div>

            <div className="mt-5 grid lg:grid-cols-3 gap-3 grid-cols-1">
                <div className="gap-4 col-span-1">
                    <div className=" flex items-center  bg-gray-50 border-1 border-gray-300 rounded-xl px-3  py-2  shadow-sm">
                        <CiSearch className="text-gray-600 text-xl mr-2" />
                        <input
                            type="text"
                            placeholder="Search notes..."
                            className="bg-transparent outline-none w-full placeholder-gray-500 text-gray-700 text-xs font-normal"
                            />
                    </div>
                    <div className="bg-white col-span-2 grid justify-items-center  w-full h-32 mt-3 shadow-sm rounded-xl">
                        <p className="text-xs font-normal  text-gray-500 pt-13">No notes yets. Create your first note!</p>
                    </div>
                </div>

                <div className="bg-white col-span-2 grid justify-items-center  h-64 shadow-sm rounded-xl">
                    <p className="text-xs font-normal  text-gray-500 pt-30">Select a note to view its content</p>
                </div>
            </div>
        </div>
    );
}