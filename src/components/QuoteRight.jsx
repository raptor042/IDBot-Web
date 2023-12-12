"use client"

import { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";

export default function QuoteRight() {
    const [size, setSize] = useState()

    useEffect(() => {
        const body = document.getElementsByTagName("body")
        const size = body.clientWidth < 640 ? 16 : 24

        setSize(size)
    }, [size])
    return (
        <div id="quote-right" className="">
            <FaQuoteRight size={size} color="#fbbf24"/>
        </div>
    )
}