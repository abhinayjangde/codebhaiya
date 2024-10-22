'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'

const Notes = () => {
  useEffect(() => {
    document.title = 'Notes - The right way to learn coding'
  }, [])
  return (
    <div className="h-[30rem] sm:h-[60rem] w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-2xl sm:text-5xl mt-10 dark:text-white">
        Notes are coming soon...
      </p>
      <Link href="/" className="text-blue-500">Go back</Link>
    </div>
  )
}

export default Notes