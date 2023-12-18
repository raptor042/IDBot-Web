"use client"

import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { store } from "@/store";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function Mobile_SideBar() {
    const { state, dispatch } = useContext(store)
    const { showSideBar } = state

    const [account, setAccount] = useState()

    const { address, isConnected } = useWeb3ModalAccount()

    const { open } = useWeb3Modal()

    useEffect(() => {
        if(isConnected) {
            const _address = truncate(address)

            setAccount(_address)
        }
    }, [isConnected])

    const truncate = (_address) => {
        const start = _address.substring(0, 6)
        const end = _address.substring(36, 42)

        return start + "..." + end
    }

    const handleSideBar = e => {
        e.preventDefault()

        dispatch({
            type : "Display/Hide SideBar",
            payload : {
              showSideBar : false
            }
        })
    }

    return (
        <div id="mobile-sidebar" className={showSideBar ? "absolute top-10 left-0 sm:hidden flex flex-col w-screen h-screen bg-white opacity-90 px-8" : "hidden"}>
            <div className="basis-1/6 flex flex-row items-center justify-end">
                <FaTimes size={24} color="#000" onClick={handleSideBar}/>
            </div>
            <div className="basis-3/6 flex flex-col items-center">
                <h2 className="my-4 font-bold text-xl text-black">
                    <Link href="/">Home</Link>
                </h2>
                <h2 className="my-4 font-bold text-xl text-black">
                    <Link href="/dashboard">Dashboard</Link>
                </h2>
                <h2 className="my-4 font-bold text-xl text-black">
                    <Link href="/setup">Configuration</Link>
                </h2>
                <h2 className="my-4 font-bold text-xl text-black">
                    <Link href="/subscription">Subscription</Link>
                </h2>
                <h2 className="my-4 font-bold text-xl text-black">
                    <Link href="/search">Search Profiles/Projects</Link>
                </h2>
            </div>
            <div className="basis-2/6 flex flex-row justify-center items-center">
                <button onClick={() => open()} className="p-4 text-bold text-lg text-white flex rounded-lg bg-black">
                    { isConnected ?
                        account :
                        <>
                            Connect Wallet
                        </>
                    }
                </button>
            </div>
        </div>
    )
}