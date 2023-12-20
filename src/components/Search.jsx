"use client"

import { useEffect, useState } from "react";
import ProfileInfo from "./ProfileInfo";
import { IDBot_CA } from "@/context/config";
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};

export default function Search() {
    const [profile, setProfile] = useState()
    const [_profile, set_profile] = useState(true)
    const [profile_info, setProfileInfo] = useState(false)
    const [idbot, setIDBot] = useState()

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
    })

    const handleProfile = async e => {
        e.preventDefault()

        const isSubscribed = await idbot.isSubscribed(address)
        console.log(isSubscribed)

        if(isSubscribed) {
            set_profile(false)
            setProfileInfo(true)
        }
    }

    return (
        <>
            <div className="sm:px-10 my-10">
                { profile_info && <ProfileInfo profile={profile}/> }
                {_profile ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Search for a Profile by address or IDBot number</h2>
                        <div className="flex flex-row items-center">
                            <input onChange={e => setProfile(e.target.value)} type="text" placeholder="Enter a profile address/IDBot number...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                            <div className="ml-6">
                                <button onClick={handleProfile} className="p-4 rounded-lg text-white text-lg font-bold bg-black">
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                    : null
                }
            </div>
        </>
    )
}