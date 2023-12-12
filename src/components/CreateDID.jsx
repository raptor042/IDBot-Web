"use client"

import { useRouter } from "next/navigation"

export default function CreateDID() {
    const router = useRouter()

    return (
        <div id="create-did" className="">
            <button onClick={() => window.location.assign("http://localhost:3000/setup")} className="p-4 text-bold text-lg text-white flex rounded-lg bg-black hover:bg-amber-400">
                Begin Set-up
            </button>
        </div>
    )
}