"use client"

import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Country, State } from "country-state-city"
import { store } from "@/store";
import ID from "../../public/id.jpg"
import Image from "next/image";
import Link from "next/link";
import Profile_ABI from "@/context/Profile.json" assert {type:"json"};
import { ethers } from "ethers"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

export default function AddProject() {
    const [name, setName] = useState()
    const [_name, set_name] = useState(true)
    const [description, setDescription] = useState()
    const [_description, set_description] = useState(false)
    const [ca, setCa] = useState()
    const [_ca, set_ca] = useState(false)
    const [chain, setChain] = useState()
    const [_chain, set_chain] = useState(false)
    const [website, setWebsite] = useState()
    const [_website, set_website] = useState(false)
    const [telegram, setTelegram] = useState()
    const [_telegram, set_telegram] = useState(false)
    const [twitter, setTwitter] = useState()
    const [_twitter, set_twitter] = useState(false)
    const [discord, setDiscord] = useState()
    const [_discord, set_discord] = useState(false)
    const [linktree, setLinktree] = useState()
    const [_linktree, set_linktree] = useState(false)
    const [done, setDone] = useState()
    const [idbot_profile, setIDBotProfile] = useState()

    const { state, dispatch } = useContext(store)

    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const ABI = JSON.stringify(Profile_ABI)

    const provider = new ethers.BrowserProvider(walletProvider)

    const profile = localStorage.getItem("profile")
  
    useEffect(() => {
        const contract = async () => {
            const idbot_profile = new ethers.Contract(
                profile,
                JSON.parse(ABI).abi,
                await provider.getSigner()
            )

            setIDBotProfile(idbot_profile)
        }

        contract()
    }, [])

    const handleSubmit = async () => {
        const project = await idbot_profile.addProject(
            name,
            description,
            ca,
            website,
            telegram,
            twitter,
            discord,
            linktree
        )
        console.log(project)

        idbot_profile.on("AddProject", (ca, name, e) => {
            console.log(`You have added ${name} at ${ca} to your project list.`)
        })
    }

    const handleClick = async e => {
        e.preventDefault()

        if(_name && name) {
            set_name(false)
            set_description(true)
        } else if(_description && description) {
            set_description(false)
            set_ca(true)
        } else if(_ca && ca) {
            set_ca(false)
            set_chain(true)
        } else if(_chain && chain) {
            set_chain(false)
            set_website(true)
        } else if(_website && website) {
            set_website(false)
            set_telegram(true)
        } else if(_telegram && telegram) {
            set_telegram(false)
            set_twitter(true)
        } else if(_twitter && twitter) {
            set_twitter(false)
            set_discord(true)
        } else if(_discord && discord) {
            set_discord(false)
            set_linktree(true)
        } else if(_linktree && linktree) {
            set_linktree(false)
            console.log(address, isConnected)
            setDone(true)
            if(address && isConnected) {
                await handleSubmit()
            } else {
                alert("Connect your wallet.")
            }
        }
    }

    return (
        <>
            <div id="add-project" className="sm:px-10 my-10">
                {_name ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is the name of your project?</h2>
                        <input onChange={e => setName(e.target.value)} type="text" placeholder="Enter the name of your project...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg focus:border-amber-400 p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_description ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Describe your project in a few words?</h2>
                        <input onChange={e => setDescription(e.target.value)} type="text" placeholder="Describe your project...." className="w-full my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_ca ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is the contract address of your project?</h2>
                        <input onChange={e => setCa(e.target.value)} type="text" placeholder="Enter the contract address...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_chain ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is the name of the blockchain where your project was deployed?</h2>
                        <input onChange={e => setChain(e.target.value)} type="text" placeholder="Enter the blockchain name...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_website ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Does your project have a website link?</h2>
                        <input onChange={e => setWebsite(e.target.value)} type="text" placeholder="Enter your website link...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_telegram ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Does your project have a telegram link?</h2>
                        <input placeholder="Enter your telegram link...." onChange={e => setTelegram(e.target.value)} type="text" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_twitter ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Does your project have a twitter link?</h2>
                        <input placeholder="Enter your twitter link...." onChange={e => setTwitter(e.target.value)} type="text" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_discord ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Does your project have a discord link?</h2>
                        <input placeholder="Enter your discord link...." onChange={e => setDiscord(e.target.value)} type="text" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_linktree ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Does your project have a linktree?</h2>
                        <input placeholder="Enter your linktree...." onChange={e => setLinktree(e.target.value)} type="text" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {done ?
                    <>
                        <div className="flex flex-row justify-center">
                            <Image src={ID} alt="IDentity" className="w-64 h-32"/>
                        </div>
                        <h1 className="font-bold text-xl my-4" style={{ color : "#000" }}>Congratulations, your project have been added.</h1>
                    </>
                    : null
                }
            </div>
            <div id="next" className="my-10 flex flex-row justify-end">
                <button onClick={handleClick} className="p-4 rounded-lg text-white text-lg font-bold flex bg-black">
                    {!_linktree && !done && <FaArrowRight size={16} color="#fff" className=""/>}
                    {_linktree && !done && "Submit"}
                    {!_linktree && done && <Link href="/dashboard">Go to Dashboard</Link>}
                </button>
            </div>
        </>
    )
}