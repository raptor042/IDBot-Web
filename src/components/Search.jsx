"use client"

import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProfileInfo from "./ProfileInfo";
import { IDBot_CA } from "@/context/config";
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateAddress } from "@/utils/validations";

export default function Search() {
    const [profile, setProfile] = useState()
    const [option, setOption] = useState("Address")
    const [options, setOptions] = useState(true)
    const [_address, setAddress] = useState(false)
    const [number, setNumber] = useState(false)
    const [profile_info, setProfileInfo] = useState(false)
    const [previous, setPrevious] = useState(false)
    const [next, setNext] = useState(true)
    const [idbot, setIDBot] = useState()

    const router = useRouter()

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

    const handleNext = async e => {
        e.preventDefault()

        if(options && option == "Address") {
            setOptions(false)
            setNext(false)
            setAddress(true)
            setPrevious(true)
        } else if(options && option == "IDBot Number") {
            setOptions(false)
            setNext(false)
            setNumber(true)
            setPrevious(true)
        }
    }

    const handlePrevious = async e => {
        e.preventDefault()

        if(_address) {
            setAddress(false)
            setPrevious(false)
            setOptions(true)
            setNext(true)
        } else if(number) {
            setNumber(false)
            setPrevious(false)
            setOptions(true)
            setNext(true)
        }
    }

    const handleProfile = async e => {
        e.preventDefault()

        const isSubscribed = await idbot.isSubscribed(address)
        console.log(isSubscribed)

        if(isSubscribed) {
            if(option == "IDBot Number") {
                const user = await idbot.getUser(profile)
                console.log(user)

                setProfile(user)
            }
            setOptions(false)
            setAddress(false)
            setNumber(false)
            setNext(false)
            setPrevious(false)
            setProfileInfo(true)
        } else {
            router.push("/error/not_subscribed")
        }
    }

    return (
        <>
            <div className="sm:px-10 my-10">
                <ToastContainer />
                { profile_info && <ProfileInfo profile={profile} admin={false}/> }
                {options && 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Search for a Profile by address or IDBot number</h2>
                        <select onChange={e => setOption(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}>
                            <option value="Address">Search by Address</option>
                            <option value="IDBot Number">Search by IDBot Number</option>
                        </select>
                    </>
                }
                {_address ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Search for a Profile by Address</h2>
                        <div className="flex flex-row items-center">
                            <input onChange={e => setProfile(e.target.value)} type="text" placeholder="Enter an Address...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                            <div className="ml-6">
                                <button onClick={handleProfile} className="p-4 rounded-lg text-white text-lg font-bold bg-black">
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                    : null
                }
                {number ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Search for a Profile by IDBot number</h2>
                        <div className="flex flex-row items-center">
                            <input onChange={e => setProfile(e.target.value)} type="text" placeholder="Enter an IDBot number...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                            <div className="ml-6">
                                <button onClick={handleProfile} className="p-4 rounded-lg text-white text-lg font-bold bg-black">
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                    : null
                }
                <div className="flex flex-row items-center justify-between my-10">
                    <button onClick={handlePrevious} className={previous ? "p-4 rounded-lg text-white text-lg font-bold bg-black" : "invisible"}>
                        <FaArrowLeft size={16} color="#fff"/>
                    </button>
                    <button onClick={handleNext} className={next ? "p-4 rounded-lg text-white text-lg font-bold bg-black" : "invisible"}>
                        <FaArrowRight size={16} color="#fff"/>
                    </button>
                </div>
            </div>
        </>
    )
}