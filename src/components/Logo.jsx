import Image from "next/image"
import idbot from "../../public/idbot.jpg"

export default function Logo() {
    return (
        <div id="logo" className="">
            <Image src={idbot} alt="IDBot Protocol Logo" className="w-32 h-16 sm:w-48 sm:h-24"/>
        </div>
    )
}