import { Web3ModalProvider } from '@/context/Web3Modal'
import './globals.css'
import { Nunito } from "next/font/google"
import { StateProvider } from '@/store'

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
        <StateProvider>
          <Web3ModalProvider>{children}</Web3ModalProvider>
        </StateProvider>
      </body>
    </html>
  )
}
