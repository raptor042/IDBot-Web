"use client"

import { useEffect, useState } from "react";
import { FaArrowRight, FaIdCard } from "react-icons/fa";
import { Country, State } from "country-state-city"
import Camera from "./Camera";

export default function SetUp() {
    const [name, setName] = useState()
    const [_name, set_name] = useState(true)
    const [description, setDescription] = useState()
    const [_description, set_description] = useState(false)
    const [email, setEmail] = useState()
    const [_email, set_email] = useState(false)
    const [age, setAge] = useState()
    const [_age, set_age] = useState()
    const [countries, setCountries] = useState()
    const [states, setStates] = useState()
    const [country, setCountry] = useState()
    const [_country, set_country] = useState()
    const [state, setState] = useState()
    const [_state, set_state] = useState()
    const [phone, setPhone] = useState()
    const [_phone, set_phone] = useState()
    const [address, setAddress] = useState()
    const [_address, set_address] = useState()
    const [pic, setPic] = useState()
    const [_pic, set_pic] = useState()
    const [id, setId] = useState()
    const [_id, set_id] = useState()
    const [dev, setDev] = useState()
    const [_dev, set_dev] = useState()
    const [done, setDone] = useState()

    useEffect(() => {
        const _countries = Country.getAllCountries()
        setCountries(_countries)
    }, [])

    const handleClick = e => {
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
        } else if(_state && state) {
            set_state(false)
            set_phone(true)
        } else if(_phone && phone) {
            set_phone(false)
            set_address(true)
        } else if(_address && address) {
            set_address(false)
            set_pic(true)
        } else if(_pic && pic) {
            set_pic(false)
            set_id(true)
        } else if(_id && id) {
            set_id(false)
            set_dev(true)
        } else if(_dev && dev) {
            set_dev(false)
            setDone(true)
        }
    }

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
                        <select value={state} onChange={e => setState(e.target.value)} className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}>
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
                {_pic ?
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Select an image to use as your profile picture?</h2>
                        <input onChange={e => setPic(e.target.value)} type="file" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
                    </>
                    : null
                }
                {_id ?
                    <>
                        <h2 className="text-lg font-bold my-2" style={{ color : "#000" }}>Select a file which serves as your means of idenity ie: International Passport?</h2>
                        <input onChange={e => setId(e.target.value)} type="file" className="w-full sm:w-1/2 my-2 font-bold text-lg rounded-lg p-4 border-2" style={{ borderColor : "#000" }}/>
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
                            <FaIdCard size={120} color="#000"/>
                        </div>
                        <h1 className="font-bold text-2xl my-4" style={{ color : "#000" }}>Congratulations, you have created your IDBot Identity.</h1>
                    </>
                    : null
                }
            </div>
            <div id="next" className="my-10 flex flex-row justify-end">
                <button onClick={handleClick} className="p-4 rounded-lg text-white text-lg font-bold flex bg-black">
                    {done ? "Go to Dashboard" : <FaArrowRight size={24} color="#fff" className=""/>}
                </button>
            </div>
        </>
    )
}