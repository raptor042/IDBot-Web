"use client"

import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useEffect, useState } from "react"
import { FaWallet } from "react-icons/fa"
import { useAccount } from "wagmi"

export default function ConnectWallet() {
    const { address, isConnected } = useAccount()

    const { open } = useWeb3Modal()

    const [account, setAccount] = useState()

    useEffect(() => {
        if(isConnected) {
            const _address = truncate(address)

            setAccount(_address)
        }
    }, [isConnected])

    const truncate = (_address) => {
        const start = _address.substring(0, 6)
        const end = _address.substring(36, 42)

        return start + "..." + end
    }

    return (
        <div id="connect-wallet" className="absolute top-20 right-20">
            <button onClick={() => open()} className="p-4 text-bold text-lg text-white flex rounded-lg" style={{ backgroundColor : "#101530" }}>
                { isConnected ?
                    account :
                    <>
                        Connect
                        <FaWallet size={24} color="#ffffff" className="ml-4"/>
                    </>
                }
            </button>
        </div>
    )
}