import { Web3Modal } from '@/context/Web3Modal'
import './globals.css'
import { Nunito } from "next/font/google"

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  weight: "400"
})

export const metadata = {
  title: 'IDBot Protocol',
  description: 'IDbot is The Decentralized Identity Verification Protocol aims to establish a secure, privacy-focused system for identity verification within blockchain applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily : nunito.style.fontFamily }}>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  )
}
