"use client"

import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaInfoCircle } from "react-icons/fa"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import IDBot_ABI from "@/context/IDBot.json" assert {type:"json"};
import { ethers } from "ethers"
import { IDBot_CA } from "@/context/config"

export default function ProfileInfo({ profile, admin }) {
    const [display, setDisplay] = useState(false)
    const [previous, setPrevious] = useState(false)
    const [next, setNext] = useState(true)
    const [profileId, setProfileId] = useState()
    const [_profileId, set_ProfileId] = useState(true)
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
    const [url, setUrl] = useState()
    const [_url, set_url] = useState(false)
    const [score, setScore] = useState()
    const [_score, set_score] = useState(false)
    const [projects, setProjects] = useState([])
    const [_projects, set_projects] = useState(false)
    const [verify, setVerify] = useState(false)
    const [idbot, setIDBot] = useState()
    const [loading, setLoading] = useState(false)
    const [_loading, set_loading] = useState(false)

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

            const profileId = await idbot.getIDBotNumber(profile)

            setIDBot(idbot)
            setProfileId(Number(ethers.toBigInt(profileId)))
        }

        contract()
    }, [profileId, idbot])

    const getName = async () => {
        const name = await idbot.getName(profile)
        console.log(name)

        return name
    }

    const getDescription = async () => {
        const description = await idbot.getDescription(profile)
        console.log(description)

        return description
    }

    const getEmail = async () => {
        const email = await idbot.getEmail(profile)
        console.log(email)

        return email
    }

    const getAge = async () => {
        const age = await idbot.getAge(profile)
        console.log(age)

        return age
    }

    const getCountry = async () => {
        const country = await idbot.getCountry(profile)
        console.log(country)

        return country
    }

    const getState = async () => {
        const state = await idbot.getState(profile)
        console.log(state)

        return state
    }

    const getPhone = async () => {
        const phone = await idbot.getPhoneNumber(profile)
        console.log(phone)

        return phone
    }

    const getAddress = async () => {
        const _address = await idbot.getResidentialAddress(profile)
        console.log(_address)

        return _address
    }

    const getPic = async () => {
        const pic = await idbot.getProfilePicUrl(profile)
        console.log(pic)

        return pic
    }

    const getURL = async () => {
        const url = await idbot.getIdentityUrl(profile)
        console.log(url)

        return url
    }

    const getScore = async () => {
        const score = await idbot.getReputationScore(profile)
        console.log(Number(ethers.toBigInt(score)))

        return Number(ethers.toBigInt(score))
    }

    const getProjects = async () => {
        const projects = await idbot.getProjects(profile)
        console.log(projects, projects.length)

        return projects
    }

    const handleNext = async e => {
        e.preventDefault()

        setDisplay(false)

        if(_profileId) {
            set_ProfileId(false)
            setPrevious(true)
            set_name(true)

            const name = await getName()
            setName(name)
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
            if(admin) {
                set_url(true)

                const url = await getURL()
                setUrl(url)
            } else {
                set_score(true)

                const score = await getScore()
                setScore(score)
            }
        } else if(_url) {
            set_url(false)
            set_score(true)

            const score = await getScore()
            setScore(score)
        } else if(_score) {
            set_score(false)
            if(!admin) {
                setNext(false)
            }
            set_projects(true)

            const projects = await getProjects()
            if(projects.length > 0) {
                setProjects(projects)
            }
        } else if(_projects && admin) {
            setNext(false)
            set_projects(false)
            setVerify(true)
        }
    }

    const handlePrevious = async e => {
        e.preventDefault()

        setDisplay(false)

        if(verify && admin) {
            setVerify(false)
            set_projects(true)
            setNext(true)
        } else if(_projects) {
            set_projects(false)
            set_score(true)
            setNext(true)
        } else if(_score) {
            set_score(false)
            if(admin) {
                set_url(true)   
            } else {
                set_pic(true)
            }
        } else if(_url) {
            set_url(false)
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
            set_ProfileId(true)
            setPrevious(false)
        }
    }

    const handleVerify = async e => {
        e.preventDefault()

        setLoading(true)

        const response = await fetch(`https://idbot-80bt.onrender.com/verify/${profile}`, {
            method : "GET",
            mode : "no-cors"
        })

        idbot.on("Verified", (user, e) => {
            console.log(`User ${user} has been verified.`)
            alert("Profile has been verified.")
            setLoading(false)
        })
    }

    const handleUnverify = async e => {
        e.preventDefault()

        set_loading(true)

        const response = await fetch(`https://idbot-80bt.onrender.com/unverify/${profile}`, {
            method : "GET",
            mode : "no-cors"
        })

        idbot.on("Unverified", (user, e) => {
            console.log(`User ${user} has been unverified.`)
            alert("Profile has been unverified.")
            set_loading(false)
        })
    }


    return (
        <div id="profile-info" className="sm:px-10 my-10">
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
            { _url && admin &&
                <>
                    <h2 className="text-lg font-bold my-2 flex items-center" style={{ color : "#000" }}>
                        Identity URL
                        <FaInfoCircle size={16} color="#000" className="ml-3"/>
                    </h2>
                    <div className="flex flex-row items-center w-full">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-black">
                            <span className={display ? "blur-none" : "blur"}>{url}</span>
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
            { _projects &&
                <>
                    <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Project List</h2>
                    <select onChange={e => setCountry(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-2 border-2" style={{ borderColor : "#000" }}>
                        {
                            projects.map((project, index) => (
                                <option key={index} value={project[2]}>{`${project[0]} - ${project[2]} - ${Number(project[11])}`}</option>
                            ))
                        }
                    </select>
                </>
            }
            { admin && verify &&
                <div className="flex flex-row items-center justify-around">
                    <button onClick={handleVerify} className="p-4 rounded-lg text-white text-lg font-bold bg-black">
                        {!loading && "Verify Profile"}
                        {loading && 
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                    </button>
                    <button onClick={handleUnverify} className="p-4 rounded-lg text-white text-lg font-bold bg-black">
                        {!_loading && "Remove Verification"}
                        {_loading && 
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        }
                    </button>
                </div>
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