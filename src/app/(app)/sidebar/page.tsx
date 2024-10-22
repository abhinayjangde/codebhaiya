"use client"
import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'
import Link from 'next/link'
import { RiSideBarFill } from 'react-icons/ri'

const Sidebar = () => {
  
const [toggle, setToggle] = useState(true);

  return (
    <div className="dark:bg-dark py-5 bg-gray-50 p-4 lg:p-8 lg:px-20">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"
      />

   
        <div className="max-w-screen-xl mx-auto bg-white dark:bg-black rounded-lg shadow-md p-6 lg:p-10">
          <h1 className="text-center text-xl md:text-3xl justify-center lg:text-3xl font-semibold text-gray-800 dark:text-white mb-1 flex">
            Complete Guide of UFW (Uncomplicated Firewall)
          </h1>
          
          {/* Contents  */}
          <div className="leading-relaxed text-dark dark:text-gray-100">
              <p> TUtorial Content</p>
              <p>hello</p>
          </div>
        </div>
        
      
     
        


       

        
        {/* <div className="absolute">
        <div className="relative z-0 max-w-screen-xl mx-auto bg-white dark:bg-green-900 rounded-lg shadow-md p-6 lg:p-10">
        <div className="flex items-center flex-col md:flex-row md:justify-start">
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
            <span className="text-sm dark:text-gray-400 text-gray-500 mx-2 pt-1">
              April 10, 2024
            </span>
          </div>
         
       
        </div>
        
        <button className='absolute top-0 -left-24'>Open/Close</button>
        </div>
        </div> */}
  


      
    </div>
  )
}

export default Sidebar


/*
<p className='border-l-4 border-l-yellow-400 px-2 my-2'><span>Note:- </span>You can Copy Complete Project Folder by making it a Zip File then Unzip it on Server.</p>
<div className=" relative">
<pre><code className='language-bash'></code></pre>
</div>
<h2 className='text-xl my-4 sm:text-2xl lg:text-3xl'>Why Keyboard Shortcuts?</h2>
<iframe className='hidden md:block mt-2' width="940" height="540" src="https://www.youtube.com/embed/NZtocON0VlI?si=Ft84_cWFo2BuAEsM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
<h3 className='text-xl my-3 sm:text-xl lg:text-2xl'></h3>
*/



     
// <div className="min-h-screen w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] flex items-center justify-center">
//   <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

//   <div className="container mx-auto lg:my-2">
//     <h2 className="sm:text-4xl text-2xl font-medium title-font text-gray-900 my-10 text-center dark:text-white">
//       COMING SOON ...
//     </h2>
//   </div>
// </div>