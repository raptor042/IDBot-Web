import Link from "next/link";

export default function CreateDID() {
    return (
        <div id="create-did" className="">
            <button className="p-4 text-bold text-lg text-white flex rounded-lg bg-black">
                <Link href="/setup">Begin Set-up</Link>
            </button>
        </div>
    )
}