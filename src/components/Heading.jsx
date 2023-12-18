export default function Heading({ slug }) {
    return (
        <div id="heading" className="">
            <h1 className="sm:text-xl md:text-2xl font-bold my-2 text-black">Welcome to the IDBot Protocol</h1>
            <span className="sm:text-md md:text-lg text-gray-500 my-2">
                { slug }
            </span>
        </div>
    )
}