"use client"

import ConnectWallet from "@/components/ConnectWallet";
import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import Mobile_SideBar from "@/components/Mobile_SideBar";
import SetUp from "@/components/SetUp";
import SideBar from "@/components/SideBar";
import { store } from "@/store";
import { useContext } from "react";
import { FaBars } from "react-icons/fa";

export default function SetUpPage() {
    const { state, dispatch } = useContext(store)
    const { showSideBar } = state

    const handleSideBar = e => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              showSideBar : true
            }
        })
    }

    return (
        <div id="setup" className="relative w-screen h-screen flex flex-row">
            <SideBar/>
            <Mobile_SideBar/>
            <div className="sm:w-full md:w-11/12 h-full flex flex-col">
                <div className="basis-1/5 sm:basis-1/3 flex flex-row items-center justify-between px-8 sm:px-16">
                    <Logo/>
                    <div className="sm:hidden">
                        {showSideBar ? null : <FaBars color="#000" size={24} onClick={handleSideBar}/>}
                    </div>
                    <ConnectWallet/>
                </div>
                <div className="basis-4/5 sm:basis-2/3 px-8 sm:px-16">
                    <Heading/>
                    <SetUp/>
                </div>
            </div>
        </div>
    )
}