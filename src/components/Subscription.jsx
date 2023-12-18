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

    const { state, dispatch } = useContext(store)

    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const ABI = JSON.stringify(IDBot_ABI)

    const provider = new ethers.BrowserProvider(walletProvider)

    const profileId = localStorage.getItem("profileId")
  
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
    })

    const handleClick = async e => {
        e.preventDefault()

        console.log(sub.split(","), idbot)

        const subscribe = await idbot.subscribe(
            address,
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
                    {_sub && !done && "Subscribe"}
                    {!_sub && done && <Link href="/dashboard">Go to Dashboard</Link>}
                </button>
            </div>
        </>
    )
}