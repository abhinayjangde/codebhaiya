"use client"
import React, { useEffect } from 'react'

const Creator = () => {
    useEffect(() => {
        document.title = 'Become a Creator - The right way to learn coding'
    }, [])
  return (
    <>
    <div className='dark:bg-dark py-5 bg-gray-50 p-4'>
                <div className="max-w-screen-lg mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">

                    <h1 className="text-center text-2xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-2 flex border-b pb-2 uppercase">Become a Creator</h1>
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">The right way to learn coding</p>
                </div>
            </div>
    </>
  )
}

export default Creator