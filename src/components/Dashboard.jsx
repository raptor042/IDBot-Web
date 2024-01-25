"use client"

import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaInfoCircle } from "react-icons/fa"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { ethers } from "ethers"
import Link from "next/link"
import { useRouter } from "next/navigation"
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};
import { IDBot_CA } from "@/context/config"
import { decrypt } from "@/utils/crypto"

export default function Dashboard() {
    const [display, setDisplay] = useState(false)
    const [previous, setPrevious] = useState(false)
    const [next, setNext] = useState(true)
    const [_profileId, setProfileId] = useState(true)
    const [name, setName] = useState()
    const [_name, set_name] = useState(false)
    const [description, setDescription] = useState()
    const [_description, set_description] = useState(false)
    const [email, setEmail] = useState()
    const [_email, set_email] = useState(false)
    const [age, setAge] = useState()
    const [_age, set_age] = useState(false)
    const [country, setCountry] = useState()
    const [_country, set_country] = useState(false)
    const [state_, setState] = useState()
    const [_state, set_state] = useState(false)
    const [phone, setPhone] = useState()
    const [_phone, set_phone] = useState(false)
    const [address_, setAddress] = useState()
    const [_address, set_address] = useState(false)
    const [pic, setPic] = useState()
    const [_pic, set_pic] = useState(false)
    const [score, setScore] = useState()
    const [_score, set_score] = useState(false)
    const [projects, setProjects] = useState([])
    const [_projects, set_projects] = useState(false)
    const [idbot, setIDBot] = useState()
    const [profileId, set_profileId] = useState()

    const router = useRouter()

    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()

    const ABI = JSON.stringify(IDBot_ABI)

    const provider = new ethers.BrowserProvider(walletProvider)

    useEffect(() => {
        const profileId = window.localStorage.getItem("profileId")

        set_profileId(profileId)

        const name = async () => {
            const idbot = new ethers.Contract(
                IDBot_CA,
                JSON.parse(ABI).abi,
                await provider.getSigner()
            )

            const status = await idbot.getVerificationStatus(address)
            console.log(status)

            if(status == "Not Verified") {
                router.push("/error/not_verified")
            } else if(status == "Pending") {
                router.push("/error/pending")
            } else {
                setIDBot(idbot)

                const _name = await idbot.getName(address)
                const name_ = await decrypt(_name)

                setName(name_)
            }
        }

        name()
    })

    const getDescription = async () => {
        const description = await idbot.getDescription(address)
        console.log(description)

        return description
    }

    const getEmail = async () => {
        const email = await idbot.getEmail(address)
        const _email = await decrypt(email)
        console.log(email, _email)

        return _email
    }

    const getAge = async () => {
        const age = await idbot.getAge(address)
        const _age = await decrypt(age)
        console.log(age, _age)

        return _age
    }

    const getCountry = async () => {
        const country = await idbot.getCountry(address)
        console.log(country)

        return country
    }

    const getState = async () => {
        const state = await idbot.getState(address)
        console.log(state)

        return state
    }

    const getPhone = async () => {
        const phone = await idbot.getPhoneNumber(address)
        const _phone = await decrypt(phone)
        console.log(phone, _phone)

        return _phone
    }

    const getAddress = async () => {
        const _address = await idbot.getResidentialAddress(address)
        const address_ = await decrypt(_address)
        console.log(_address, address_)

        return address_
    }

    const getPic = async () => {
        const pic = await idbot.getProfilePicUrl(address)
        const _pic = await decrypt(pic)
        console.log(pic, _pic)

        return _pic
    }

    const getScore = async () => {
        const score = await idbot.getReputationScore(address)
        console.log(Number(ethers.toBigInt(score)))

        return Number(ethers.toBigInt(score))
    }

    const getProjects = async () => {
        const projects = await idbot.getProjects(address)
        console.log(projects)

        return projects
    }

    const handleNext = async e => {
        e.preventDefault()

        setDisplay(false)

        if(_profileId) {
            setProfileId(false)
            set_name(true)
            setPrevious(true)
        } else if(_name) {
            set_name(false)
            set_description(true)

            const description = await getDescription()
            setDescription(description)
        } else if(_description) {
            set_description(false)
            set_email(true)

            const email = await getEmail()
            setEmail(email)
        } else if(_email) {
            set_email(false)
            set_age(true)

            const age = await getAge()
            setAge(age)
        } else if(_age) {
            set_age(false)
            set_country(true)

            const country = await getCountry()
            setCountry(country)
        } else if(_country) {
            set_country(false)
            set_state(true)

            const state = await getState()
            setState(state)
        } else if(_state) {
            set_state(false)
            set_phone(true)

            const phone = await getPhone()
            setPhone(phone)
        } else if(_phone) {
            set_phone(false)
            set_address(true)

            const address = await getAddress()
            setAddress(address)
        } else if(_address) {
            set_address(false)
            set_pic(true)

            const pic = await getPic()
            setPic(pic)
        } else if(_pic) {
            set_pic(false)
            set_score(true)

            const score = await getScore()
            setScore(score)
        } else if(_score) {
            set_score(false)
            set_projects(true)

            const projects = await getProjects()
            if(projects.length > 0) {
                setProjects(projects)
            }
            setNext(false)
        }
    }

    const handlePrevious = async e => {
        e.preventDefault()

        setDisplay(false)

        if(_projects) {
            set_projects(false)
            set_score(true)
            setNext(true)
        } else if(_score) {
            set_score(false)
            set_pic(true)
        } else if(_pic) {
            set_pic(false)
            set_address(true)
        } else if(_address) {
            set_address(false)
            set_phone(true)
        } else if(_phone) {
            set_phone(false)
            set_state(true)
        } else if(_state) {
            set_state(false)
            set_country(true)
        } else if(_country) {
            set_country(false)
            set_age(true)
        } else if(_age) {
            set_age(false)
            set_email(true)
        } else if(_email) {
            set_email(false)
            set_description(true)
        } else if(_description) {
            set_description(false)
            set_name(true)
        } else if(_name) {
            set_name(false)
            setProfileId(true)
            setPrevious(false)
        }
    }

    return (
        <div id="dashboard" className="sm:px-10 my-10">
            { _profileId &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        IDBot Number
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{profileId}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _name &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Full Name
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{name}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _description &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Description
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{description}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _email &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Email Address
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{email}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _age &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Legal Age
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{age}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _country &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Country
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{country}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _state &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        State
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{state_}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _phone &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Phone Number
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{phone}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _address &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Residential Address
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{address_}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _pic &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Profile Picture URL
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{pic}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            { _score &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Reputation Score
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{score}</span>
                        </div>
                        { display ?
                            <AiFillEyeInvisible onClick={() => setDisplay(false)} size={24} color="#000" className="ml-3 cursor-pointer"/> :
                            <AiFillEye onClick={() => setDisplay(true)} size={24} color="#000" className="ml-3 cursor-pointer"/>
                        }
                    </div>
                </>
            }
            {_projects &&
                <>
                    <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Project List</h2>
                    <div className="flex flex-row items-center">
                        <select onChange={e => setCountry(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-2 border-2" style={{ borderColor : "#000" }}>
                            <option>--</option>
                            {
                                projects.map((project, index) => (
                                    <option key={index} value={project[2]}>{`${project[0]} - ${project[2]} - ${Number(project[11])}`}</option>
                                ))
                            }
                        </select>
                        <div className="ml-6 p-2 rounded-lg text-white text-lg font-bold bg-black">
                            <Link href="/project">Add Project</Link>
                        </div>
                    </div>
                </>
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
    )
}