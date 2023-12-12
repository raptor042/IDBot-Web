"use client"

import { useEffect, useRef } from "react"

export default function Camera() {
    const video_el = useRef(null)
    const image_el = useRef(null)

    useEffect(() => {
        if("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
            const createMedia = async () => {
                await media()
            }

            createMedia()
        }
    })

    const media = async () => {
        const constraints = {
            video : {
                width : 500,
                height : 250
            }
        }
        const videoStream = await navigator.mediaDevices.getUserMedia(constraints)
        video_el.current.srcObject = videoStream
        console.log(video_el.current.toDataUrl("image/png"))

        image_el.current.src = video_el.current.toDataUrl("image/png")
    }

    return (
        <div id="camera" className="flex flex-row">
            <video autoPlay ref={video_el}></video>
            <img ref={image_el} className="ml-4"/>
        </div>
    )
}