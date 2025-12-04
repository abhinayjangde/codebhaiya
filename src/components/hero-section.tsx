"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const HeroSection = () => {
    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center relative w-full">
            <div className="relative flex-col md:flex-col z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-linear-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                <p className='text-4xl md:text-6xl'>CODEBHAIYA</p>

                <p className='text-xl text-gray-300'>
                    the right way to learn coding
                </p>

            </div>
            <ShootingStars />
            <StarsBackground />
        </div>
    )
}

export default HeroSection