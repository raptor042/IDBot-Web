"use client"

import ConnectWallet from "@/components/ConnectWallet";
import CreateDID from "@/components/CreateDID";
import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import Mobile_SideBar from "@/components/Mobile_SideBar";
import Quote from "@/components/Quote";
import QuoteLeft from "@/components/QuoteLeft";
import QuoteRight from "@/components/QuoteRight";
import SideBar from "@/components/SideBar";
import { store } from "@/store";
import { decrypt, encrypt } from "@/utils/crypto";
import { useContext, useEffect } from "react";
import { FaBars } from "react-icons/fa";

export default function HomePage() {
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
        <div id="app" className="relative w-screen h-screen flex flex-row">
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
                    <Heading slug="Lets set-up and configure your IDBot identity"/>
                    <div className="flex flex-row my-8">
                        <div className="w-full sm:basis-2/3">
                            <div className="flex flex-row justify-start">
                                <QuoteLeft/>
                            </div>
                            <div className="flex flex-row justify-center ml-8">
                                <Quote/>
                            </div>
                            <div className="flex flex-row justify-end">
                                <QuoteRight/>
                            </div>
                        </div>
                        <div className="hidden sm:basis-1/3"></div>
                    </div>
                    <div className="flex flex-row items-end sm:items-center justify-center sm:justify-end">
                        <CreateDID/>
                    </div>
                </div>
            </div>
        </div>
    )
}