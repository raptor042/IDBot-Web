import ConnectWallet from "@/components/ConnectWallet";
import CreateDID from "@/components/CreateDID";
import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import Quote from "@/components/Quote";
import QuoteLeft from "@/components/QuoteLeft";
import QuoteRight from "@/components/QuoteRight";
import SideBar from "@/components/SideBar";

export default function HomePage() {
    return (
        <div id="app" className="w-screen h-screen flex flex-row">
            <SideBar/>
            <div className="relative w-11/12 h-full">
                <ConnectWallet/>
                <Logo/>
                <Heading/>
                <QuoteLeft/>
                <Quote/>
                <QuoteRight/>
                <CreateDID/>
            </div>
        </div>
    )
}