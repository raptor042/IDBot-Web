"use client"

import { useRouter } from "next/navigation"

export default function CreateDID() {
    const router = useRouter()

    return (
        <div id="create-did" className="">
            <button onClick={() => window.location.assign("https://id-bot-benjamin1234-ben.vercel.app/setup")} className="p-4 text-bold text-lg text-white flex rounded-lg bg-black">
                Begin Set-up
            </button>
        </div>
    )
}