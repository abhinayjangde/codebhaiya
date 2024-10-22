"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const SocialHandles = ({params}:any) => {
    const router = useRouter()
    useEffect(() => {
        if (params.handles === 'discord') {
            router.push("https://discord.gg/CxPBRSZut7")
        }
        else if (params.handles === 'youtube') {
            router.push("https://www.youtube.com/c/abhinayjangde")
        }
        else if(params.handles === 'instagram'){
            router.push("https://www.instagram.com/abhinayjangde")
        }
        else{
            router.push("/sorry/page/not/found/404")
        }
    }, [])
  return (
    <div></div>
  )
}

export default SocialHandles