import Link from "next/link"
import { FaCog, FaHome, FaThLarge, FaSearchengin, FaRegCreditCard } from "react-icons/fa"

export default function SideBar() {
    return (
        <div id="sidebar" className="hidden sm:flex h-full w-1/12 p-4 bg-gray-200 sm:flex-col sm:items-center">
            <div className="basis-1/3">
                <Link href="/">
                    <FaHome size={24} color="#000"/>
                </Link>
            </div>
            <div className="basis-1/3">
                <Link href="/dashboard">
                    <FaThLarge size={24} color="#000" className="my-12"/>
                </Link>
                <Link href="/setup">
                    <FaCog size={24} color="#000" className="my-12"/>
                </Link>
                <Link href="/subscription">
                    <FaRegCreditCard size={24} color="#000" className="my-12"/>
                </Link>
                <Link href="/search">
                    <FaSearchengin size={24} color="#000" className="my-12"/>
                </Link>
            </div>
            <div className="basis-1/3"></div>
        </div>
    )
}