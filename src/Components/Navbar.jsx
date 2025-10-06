import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function Navbar() {
    return(
        <nav className="bg-white h-13 lg:h-18 shadow-sm flex justify-between items-center">
            <div className="flex items-center p-2 gap-1">
                <img src="/public/Logo.png" alt="" className="h-10 lg:h-15 " />
                <h1 className="text-base font-bold text-blue-500 lg:text-2xl">KaziHub</h1>
            </div>
            <div className="flex p-2 px-8  gap-5 lg: items-center text-base lg:text-2xl text-blue-500 cursor-pointer">
                <MdOutlineNotificationsActive />
                <FaRegUser />
            </div>
        </nav>
    );
}