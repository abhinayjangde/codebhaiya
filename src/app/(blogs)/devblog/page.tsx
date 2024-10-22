"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import "prismjs/components/prism-bash.js"
import { AiOutlineRead } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { MdPictureAsPdf } from "react-icons/md";
import { FaYoutube } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DevBlog = () => {
  useEffect(() => {
    Prism.highlightAll()
  }, []);
  const [buttonColor, setButtonColor] = useState('text-white');

  const handleCopy = () => {
    setButtonColor('text-green-500');
    setTimeout(() => setButtonColor('text-white'), 2000);
  };
  return (
    <div className="dark:bg-dark py-5 bg-gray-50 p-4 lg:p-12">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
      />
      <div className="relative z-0 max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10">
        <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex">
          Google Seach Course - Search Like a Pro
        </h1>

        <div className="flex pt-5 items-center mb-6 flex-col md:flex-row md:justify-start border-b pb-2">
          <div className="image flex justify-center items-center">
            <div className="h-8 w-8 mb-1 overflow-hidden rounded-full">
              <Link href="https://www.codebhaiya.com/" className="block w-full h-full">
                <Image
                  alt="abhinayjangde"
                  src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/contact.jpg"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <Link href="https://www.codebhaiya.com/" className="text-sm text-slate-900 dark:text-white transition ease-in-out duration-150 mx-2">
              Abhinay Jangde
            </Link>
          </div>
          <div className="rest flex mt-3 md:mt-0">
            <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">
              ·
            </span>
            <span className="text-sm dark:text-gray-400 text-gray-500 mx-2">
              April 10, 2024
            </span>
            <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">
              ·
            </span>
            <span className="text-sm dark:text-gray-400 text-gray-500 flex mx-2">
              <AiOutlineRead className='w-[1.3rem] h-[1.3rem] mr-2' />
              3 Minutes read
            </span>
          </div>
        </div>

        <div className="leading-relaxed text-dark dark:text-gray-100">

         

        </div>

        <div className='hidden md:block absolute top-0 -right-14 px-2 mx-2 bg-white text-black dark:text-white dark:bg-gray-900 rounded-lg shadow-md '>
          <AiOutlineLike onClick={(e) => toast("This functionality is coming soon!")} title='I like this' className={`text-2xl my-4 cursor-pointer`} />
          <PiShareFat onClick={(e) => toast("This functionality is coming soon!")} title='Share' className='text-2xl my-4 cursor-pointer' />
          <MdPictureAsPdf onClick={(e) => toast("This functionality is coming soon!")} title='Download PDF' className='text-2xl my-4 cursor-pointer' />

          <Link href={"/"} target='_blank'>
            <FaYoutube title='Watch Video' className='text-2xl my-4 cursor-pointer' />
          </Link>
        </div>
      </div >

      {/* Blog Footer  */}
      <div className='dark:bg-dark py-5 bg-gray-50 p-4'>
        <div className="max-w-screen-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 lg:p-10">
          <p>Thank you for reading our blog!</p>
          <p>We have a <a className='underline' href="https://discord.com/invite/CxPBRSZut7" target='_blank'>Discord community</a> where you can ask questions and get help from the community.</p>
        </div>
      </div>
    </div>
  )
}

export default DevBlog


/*
<p className='border-l-4 border-l-yellow-400 px-2 my-2'><span>Note:- </span>You can Copy Complete Project Folder by making it a Zip File then Unzip it on Server.</p>
<div className=" relative">
<pre><code className='language-bash'></code></pre>
</div>
<h2 className='text-xl my-4 sm:text-2xl lg:text-3xl'>Why Keyboard Shortcuts?</h2>
<iframe className='hidden md:block mt-2' width="940" height="540" src="https://www.youtube.com/embed/NZtocON0VlI?si=Ft84_cWFo2BuAEsM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
<h3 className='text-xl my-3 sm:text-xl lg:text-2xl'></h3>
*/


