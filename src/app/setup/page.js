import ConnectWallet from "@/components/ConnectWallet";
import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import SetUp from "@/components/SetUp";
import SideBar from "@/components/SideBar";

export default function SetUpPage() {
    return (
        <div id="setup" className="w-screen h-screen flex flex-row">
            <SideBar/>
            <div className="relative w-11/12 h-full">
                <ConnectWallet/>
                <Logo/>
                <Heading/>
                <SetUp/>
            </div>
        </div>
    )
}