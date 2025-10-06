import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Sidebar() {
    return(
        <aside className="w-30 lg:w-50 h-dvh white shadow-sm">
            <div className="flex items-center justify-between py-3 px-1  lg:px-3">
                <h1 className="text-xs px-1 text-gray-500">Navigation</h1>
            </div>

            <ul>
                <li>Dashboard</li>
                <li>Projects</li>
                <li>Collaborations</li>
                <li>Calender</li>
                <li>Reminders</li>
                <li>Notes</li>
                <li>Analytics</li>
                <li>settings</li>
            </ul>
        </aside>
    );
}