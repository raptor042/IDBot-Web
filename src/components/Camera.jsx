"use client"

import { store } from "@/store"
import { useContext, useEffect, useState } from "react"

export default function Camera() {
    const [video, setVideo] = useState(true)
    const [canvas, setCanvas] = useState(false)
    const [video_el, setVideoEl] = useState()
    const [stream, setStream] = useState()

    const { dispatch } = useContext(store)

    useEffect(() => {
        if("mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices) {
            const createMedia = async () => {
                await media()
            }

            createMedia()
        }
    }, [])

    const media = async () => {
        const body = document.getElementsByTagName("body")

        // const constraints = {
        //     video : {
        //         width : body.clientWidth < 640 ? 200 : 600,
        //         height : body.clientWidth < 640 ? 800 : 300
        //     }
        // }

        const videoStream = await navigator.mediaDevices.getUserMedia({ video })
        const video_el = document.querySelector("#video")
        video_el.srcObject = videoStream
        setVideoEl(video_el)
        setStream(videoStream)
    }

    const handleCapture = e => {
        e.preventDefault()
        const body = document.getElementsByTagName("body")

        const canvas_el = document.querySelector("#canvas")
        // canvas_el.width = body.clientWidth < 640 ? 200 : 600,
        // canvas_el.height = body.clientWidth < 640 ? 800 : 300
        canvas_el.getContext("2d").drawImage(video_el, 0, 0)

        dispatch({
            type : "Set Profile DataURL",
            payload : {
                profile_url : canvas_el.toDataURL("image/png")
            }
        })

        stream.getTracks().forEach(track => {
            track.stop()
        })

        video_el.srcObject = null

        setVideo(false)
        setCanvas(true)
    }

    return (
        <div id="camera" className="">
            <video autoPlay id="video" className={video ? "w-full block" : "hidden"}></video>
            <canvas id="canvas" className={canvas ? "w-full block" : "hidden"}></canvas>
            <p className="font-bold text-lg text-gray-400">
                {canvas ?
                    "The Image has been captured. You can proceed."
                    : "Make sure your camera is well positioned to captured. If the photo is not clear, you will not be verified."
                }
            </p>
            <div className={video ? "flex flex-row justify-center my-8" : "hidden"}>
                <button onClick={handleCapture} className="rounded-lg bg-black font-bold text-lg text-white p-4">
                    Capture
                </button>
            </div>
        </div>
    )
}