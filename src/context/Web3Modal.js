"use client"

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react"

import { WagmiConfig } from "wagmi"
import { mainnet, goerli } from "viem/chains"

const projectId = "9c8d0b18b525316d4e07dc49ef35e08c"

const metadata = {
    name : "IDBot",
    description : "IDbot is The Decentralized Identity Verification Protocol aims to establish a secure, privacy-focused system for identity verification within blockchain applications."
}

const chains = [mainnet, goerli]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }) {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}