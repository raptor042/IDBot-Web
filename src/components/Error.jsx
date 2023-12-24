"use client"

import { FaExclamationCircle, FaExclamationTriangle } from "react-icons/fa";

export default function Error({ slug }) {
    return (
        <>
            <div className="flex flex-row justify-center my-10">
                {slug == "not_verified" && <FaExclamationCircle size={72} color="#ef4444"/>}
                {slug == "pending" && <FaExclamationTriangle size={72} color="#fde047"/>}
                {slug == "not_subscribed" && <FaExclamationTriangle size={72} color="#fde047"/>}
            </div>
            <h1 className="font-bold text-xl my-4" style={{ color : "#000" }}>
                {slug == "not_verified" && "You are not verified, hence cannot access certain information from IDBot."}
                {slug == "pending" && "Your verification is pending, hence you cannot access certain information from IDBot."}
                {slug == "not_subscribed" && "You have not subscribed, hence cannot access certain information from IDBot."}
            </h1>
        </>
    )
}