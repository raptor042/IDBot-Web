"use client"

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react"

const projectId = "9c8d0b18b525316d4e07dc49ef35e08c"

const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://mainnet.infura.io/v3/0253203d40d344978948e4641ac65adb"
}

const sepolia = {
    chainId: 11155111,
    name: "Sepolia Testnet",
    currency: "SepoliaETH",
    explorerUrl: "https://sepolia.etherscan.io",
    rpcUrl: "https://sepolia.infura.io/v3/0253203d40d344978948e4641ac65adb"
}

const metadata = {
    name : "IDBot",
    description : "IDBot is The Decentralized Identity Verification Protocol aims to establish a secure, privacy-focused system for identity verification within blockchain applications."
}

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    projectId,
    chains: [sepolia]
})

export function Web3ModalProvider({ children }) {
    return children
}