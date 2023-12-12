import { FaCog, FaHome, FaShareAlt, FaThLarge } from "react-icons/fa"

export default function SideBar() {
    return (
        <div id="sidebar" className="hidden sm:flex h-full w-1/12 p-4 bg-gray-200 sm:flex-col sm:items-center">
            <div className="basis-1/3">
                <FaThLarge size={24} color="#000"/>
            </div>
            <div className="basis-1/3">
                <FaHome size={24} color="#000" className="my-16"/>
                <FaCog size={24} color="#000" className="my-16"/>
                <FaShareAlt size={24} color="#000" className="my-16"/>
            </div>
            <div className="basis-1/3"></div>
        </div>
    )
}