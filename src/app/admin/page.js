"use client"

import Admin from "@/components/Admin";
import ConnectWallet from "@/components/ConnectWallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export default function AdminPage() {
    const { address, isConnected } = useWeb3ModalAccount()

    return (
        <div id="admin" className="w-screen h-screen p-10">
            {!isConnected && <ConnectWallet/>}
            {isConnected && <Admin/>}
        </div>
    )
}