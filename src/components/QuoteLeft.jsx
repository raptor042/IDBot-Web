"use client"

import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

export default function QuoteLeft() {
    const [size, setSize] = useState()

    useEffect(() => {
        const body = document.getElementsByTagName("body")
        const size = body.clientWidth < 640 ? 16 : 24

        setSize(size)
    }, [size])
    return (
        <div id="quote-left" className="">
            <FaQuoteLeft size={size} color="#fbbf24"/>
        </div>
    )
}