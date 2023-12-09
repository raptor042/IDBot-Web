import Image from "next/image"
import idbot from "../../public/idbot.png"

export default function Logo() {
    return (
        <div id="logo" className="absolute top-20 left-20">
            <Image src={idbot} width={120} height={60}/>
        </div>
    )
}