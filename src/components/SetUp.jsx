"use client"

import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Country, State } from "country-state-city"
import Camera from "./Camera";
import { store } from "@/store";
import ID from "../../public/id.jpg"
import Image from "next/image";
import Link from "next/link";
import { IDBot_CA } from "@/context/config";
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};
import { ethers } from "ethers"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

export default function SetUp() {
    const [name, setName] = useState()
    const [_name, set_name] = useState(true)
    const [description, setDescription] = useState()
    const [_description, set_description] = useState(false)
    const [email, setEmail] = useState()
    const [_email, set_email] = useState(false)
    const [age, setAge] = useState()
    const [_age, set_age] = useState(false)
    const [countries, setCountries] = useState()
    const [states, setStates] = useState()
    const [country, setCountry] = useState()
    const [_country, set_country] = useState(false)
    const [state_, setState] = useState()
    const [_state, set_state] = useState(false)
    const [phone, setPhone] = useState()
    const [_phone, set_phone] = useState(false)
    const [address_, setAddress] = useState()
    const [_address, set_address] = useState(false)
    const [pic, setPic] = useState()
    const [id, setId] = useState()
    const [_id, set_id] = useState()
    const [dev, setDev] = useState()
    const [_dev, set_dev] = useState()
    const [done, setDone] = useState()
    const [loading, setLoading] = useState(false)

    const { state, dispatch } = useContext(store)
    const { account, camera, profile_url } = state

    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    useEffect(() => {
        const _countries = Country.getAllCountries()
        setCountries(_countries)
    }, [])

    const dataURLToBlob = (dataURL, filename) => {
        let arr = dataURL.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            blob = atob(arr[arr.length - 1]),
            n = blob.length,
            u8Arr = new Uint8Array(n)

        console.log(arr, mime, blob, n, u8Arr)

        while (n--) {
            u8Arr[n] = blob.charCodeAt(n)
        }

        console.log(new File([u8Arr], filename, { type : mime }))

        return new File([u8Arr], filename, { type : mime })
    }

    const handleFile = e => {
        e.preventDefault()

        const input = document.querySelector("#identity")
        const file = input.files[0]
        console.log(file)

        setId(file)
    }

    const handleSubmit = async () => {
        const form = new FormData()
        console.log(form, pic, account)

        form.append("name", name)
        form.append("description", description)
        form.append("email", email)
        form.append("age", age)
        form.append("country", country)
        form.append("state", state_)
        form.append("phone", phone)
        form.append("address", address_)
        form.append("pic", pic)
        form.append("id", id)
        form.append("dev", dev)
        form.append("account", address)

        console.log(form)

        const response = await fetch("https://idbot-80bt.onrender.com/profile", {
            method : "POST",
            body : form
        })
        const data = await response.json()
        console.log(data)
    }

    const handleClick = async e => {
        e.preventDefault()

        if(_name && name) {
            set_name(false)
            set_description(true)
        } else if(_description && description) {
            set_description(false)
            set_email(true)
        } else if(_email && email) {
            set_email(false)
            set_age(true)
        } else if(_age && age) {
            set_age(false)
            set_country(true)
        } else if(_country && country) {
            const _states = State.getStatesOfCountry(`${country.split(",")[1]}`)
            console.log(country.split(","), _states)
            setStates(_states)

            set_country(false)
            set_state(true)
        } else if(_state && state_) {
            set_state(false)
            set_phone(true)
        } else if(_phone && phone) {
            set_phone(false)
            set_address(true)
        } else if(_address && address_) {
            set_address(false)
            dispatch({
                type : "Display/Hide Camera",
                payload : {
                    camera : true
                }
            })
        } else if(camera && profile_url) {
            const file = dataURLToBlob(profile_url, "selfie")
            setPic(file)

            dispatch({
                type : "Display/Hide Camera",
                payload : {
                    camera : false
                }
            })
            set_id(true)
        } else if(_id && id) {
            set_id(false)
            set_dev(true)
        } else if(_dev && dev) {
            setLoading(true)
            console.log(address, isConnected)
            if(address && isConnected) {
                await handleSubmit()
            } else {
                alert("Connect your wallet.")
            }
        }
    }

    const ABI = JSON.stringify(IDBot_ABI)

    const provider = new ethers.BrowserProvider(walletProvider)

    const idbot = new ethers.Contract(
        IDBot_CA,
        JSON.parse(ABI).abi,
        provider
    )

    idbot.on("CreateProfile", (profile, owner, profileId, e) => {
        console.log(`A user with public address : ${owner} has created an IDBot profile at ${profile}. Your IDBot profile ID is ${profileId}.`)

        set_dev(false)
        setDone(true)

        dispatch({
            type : "Set Profile and ProfileId",
            payload : {
                profile,
                profileId
            }
        })

        localStorage.setItem("profile", profile)
        localStorage.setItem("profileId", profileId)
    })

    return (
        <>
            <div id="set-up" className="sm:px-10 my-10">
                {_name ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is your Full Name?</h2>
                        <input onChange={e => setName(e.target.value)} type="text" placeholder="Enter your full name...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg focus:border-amber-400 p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_description ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Describe yourself in a few words?</h2>
                        <input onChange={e => setDescription(e.target.value)} type="text" placeholder="Describe yourself...." className="w-full my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_email ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is your Email Address?</h2>
                        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email address...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_age ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>How old are you?</h2>
                        <input onChange={e => setAge(e.target.value)} type="text" placeholder="Enter your legal age...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_country ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Select your Country?</h2>
                        <select onChange={e => setCountry(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}>
                            {
                                countries.map((coun, index) => (
                                    <option key={index} value={[coun.name, coun.isoCode, coun.phonecode, coun.flag]}>{`${coun.flag} ${coun.name}`}</option>
                                ))
                            }
                        </select>
                    </>
                    : null
                }
                {_state ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Select your State?</h2>
                        <select value={state_} onChange={e => setState(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}>
                            {
                                states.map((sat, index) => (
                                    <option key={index} value={sat.name}>{`${country.split(",")[3]} ${sat.name}`}</option>
                                ))
                            }
                        </select>
                    </>
                    : null
                }
                {_phone ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is your phone number?</h2>
                        <input placeholder={`${country.split(",")[3]} +${country.split(",")[2]}`} onChange={e => setPhone(e.target.value)} type="text" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_address ? 
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>What is your residential address?</h2>
                        <input onChange={e => setAddress(e.target.value)} type="text" placeholder="Enter your residential address...." className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {camera ?
                    <>
                        <Camera/>
                    </>
                    : null
                }
                {_id ?
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Select a file which serves as your means of idenity ie: International Passport?</h2>
                        <input id="identity" onChange={handleFile} type="file" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_dev ?
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Are you are Web2/3 Developer?</h2>
                        <select value={dev} onChange={e => setDev(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </>
                    : null
                }
                {done ?
                    <>
                        <div className="flex flex-row justify-center">
                            <Image src={ID} alt="IDentity" className="w-64 h-32"/>
                        </div>
                        <h1 className="font-bold text-xl my-4" style={{ color : "#000" }}>Congratulations, you have made the first step in your IDBot journey. Your information will be verified in 24 hours.</h1>
                    </>
                    : null
                }
            </div>
            <div id="next" className="my-10 flex flex-row justify-end">
                <button onClick={handleClick} className="p-4 rounded-lg text-white text-lg font-bold flex bg-black">
                    {!_dev && !done && <FaArrowRight size={16} color="#fff" className=""/>}
                    {_dev && !done && !loading && "Submit"}
                    {_dev && !done && loading && 
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    {!_dev && done && <Link href="/dashboard">Go to Dashboard</Link>}
                </button>
            </div>
        </>
    )
}