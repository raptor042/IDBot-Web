"use client"

import { useEffect, useState } from "react";
import { IDBot_CA } from "@/context/config";
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import ProfileInfo from "./ProfileInfo";

export default function Admin() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [login, setLogin] = useState(true)
    const [profile, setProfile] = useState()
    const [_profile, set_profile] = useState(false)
    const [profiles, setProfiles] = useState([])
    const [_profiles, set_profiles] = useState(false)
    const [loading, setLoading] = useState(false)

    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const ABI = JSON.stringify(IDBot_ABI)

    const provider = new ethers.BrowserProvider(walletProvider)

    useEffect(() => {
        const idbot = async () => {
            const idbot = new ethers.Contract(
                IDBot_CA,
                JSON.parse(ABI).abi,
                await provider.getSigner()
            )

            const profiles = await idbot.getProfiles()
            console.log(profiles, profiles[0], profiles.length)

            if(profiles.length > 0) {
                setProfiles(profiles)
            }
        }

        idbot()
    }, [profile])

    const handleLogin = async e => {
        e.preventDefault()

        setLoading(true)

        const _data = {
            username : username,
            password : password,
            address : address
        }

        const response = await fetch("https://idbot-80bt.onrender.com/login", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(_data)
        })
        const data = await response.text()
        console.log(data)

        if(data == "Successful") {
            setLogin(false)
            set_profiles(true)
        } else {
            alert("You are not an Administrator.")
            setLoading(false)
        }
    }

    const handleProfile = async index => {
        const profile = profiles[index]
        console.log(index, profile)

        setProfile(profile)

        set_profiles(false)
        set_profile(true)
    }

    return (
        <>
            <div className="w-full">
                {login &&
                    <div className="flex flex-row items-center">
                        <div className="w-full">
                            <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Username</h2>
                            <input onChange={e => setUsername(e.target.value)} type="text" placeholder="Enter your username...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                            <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Password</h2>
                            <input onChange={e => setPassword(e.target.value)} type="text" placeholder="Enter your password...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                            <div className="my-6">
                                <button onClick={handleLogin} className="p-4 rounded-lg text-white text-lg font-bold bg-black">
                                    {loading ? 
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        : "Login"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }
                {_profiles && 
                    <div>
                        <h1 className="text-2xl text-black font-bold my-2">Profiles</h1>
                        {profiles.length <= 0 &&
                            <div className="flex fles-row w-full h-3/4 mt-10 items-center justify-center">
                                <h2 className="text-2xl font-bold text-black">No Profiles are registered.</h2>
                            </div>
                        }
                        <div className="grid grid-cols-1">
                            {
                                profiles.map((profile, index) => (
                                    <div key={index} className="flex flex-row items-center my-4">
                                        <h2 className="text-xl font-bold text-black">{profile}</h2>
                                        <button onClick={() => handleProfile(index)} className="ml-12 p-4 rounded-lg text-white text-lg font-bold bg-black">
                                            More Info
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
                {_profile && <ProfileInfo profile={profile} admin={true}/>}
            </div>
        </>
    )
}