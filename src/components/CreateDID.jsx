"use client"

import { useRouter } from "next/navigation"
import { FaArrowAltCircleRight } from "react-icons/fa"

export default function CreateDID() {
    const router = useRouter()

    return (
        <div id="create-did" className="absolute bottom-20 right-20">
            <button onClick={() => window.location.assign("http://localhost:3000/setup")} className="p-4 text-bold text-lg text-white flex rounded-lg" style={{ backgroundColor : "#101530" }}>
                Begin Set-up
                <FaArrowAltCircleRight size={24} className="ml-4" color="#fff"/>
            </button>
        </div>
    )
}