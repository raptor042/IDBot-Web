"use client"

import { useContext, useEffect, useState } from "react";
import { store } from "@/store";
import ID from "../../public/id.jpg"
import Image from "next/image";
import Link from "next/link";
import { IDBot_CA } from "@/context/config";
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};
import { ethers } from "ethers"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

export default function Subscription() {
    const [sub, setSub] = useState(true)
    const [_sub, set_sub] = useState(true)
    const [done, setDone] = useState(false)
    const [idbot, setIDBot] = useState()
    const [loading, setLoading] = useState(false)
    const [profileId, setProfileId] = useState()

    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const ABI = JSON.stringify(IDBot_ABI)

    const provider = new ethers.BrowserProvider(walletProvider)
  
    useEffect(() => {
        const contract = async () => {
            const idbot = new ethers.Contract(
                IDBot_CA,
                JSON.parse(ABI).abi,
                await provider.getSigner()
            )

            setIDBot(idbot)
        }

        contract()

        const profileId = window.localStorage.getItem("profileId")
        setProfileId(profileId)
    })

    const handleClick = async e => {
        e.preventDefault()

        setLoading(true)

        console.log(sub.split(","), idbot)

        const subscribe = await idbot.subscribe(
            Number(sub.split(",")[0]),
            {
                value : ethers.parseEther(`${sub.split(",")[1]}`)
            }
        )
        console.log(subscribe)

        idbot.on("Subscribed", (account, duration, e) => {
            console.log(`You have subscribed to the IDBot protocol for a duration of ${duration} days.`)

            set_sub(false)
            setDone(true)
        })
    }

    return (
        <>
            <div className="sm:px-10 my-10">
                {_sub ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Select a Subscription</h2>
                        <select onChange={e => setSub(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}>
                            <option value={[365, 0.1]}>Yearly - 0.1 ETH</option>
                            <option value={[84, 0.04]}>Quarterly - 0.04 ETH</option>
                            <option value={[28, 0.015]}>Monthly - 0.015 ETH</option>
                        </select>
                    </>
                    : null
                }
                {done ?
                    <>
                        <div className="flex flex-row justify-center">
                            <Image src={ID} alt="IDentity" className="w-64 h-32"/>
                        </div>
                        <h1 className="font-bold text-xl my-4" style={{ color : "#000" }}>Congratulations, you have subscribed to the IDBot protocol. You will be verified soon.</h1>
                    </>
                    : null
                }
            </div>
            <div id="sub" className="my-10 flex flex-row justify-end">
                <button onClick={handleClick} className="p-4 rounded-lg text-white text-lg font-bold flex bg-black">
                    {_sub && !done && !loading && "Subscribe"}
                    {_sub && !done && loading && 
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    {!_sub && done && <Link href="/dashboard">Go to Dashboard</Link>}
                </button>
            </div>
        </>
    )
}