"use client"
import React,{useEffect} from 'react';
import Link from 'next/link';
const NotFound = () => {
    
    useEffect(() => {
    document.title = '404 Not Found - CodeBhaiya';
    }, [])
    
    return (
        <div className='flex justify-center items-center min-h-[56rem]'
        style={{ backgroundImage: "url('https://codebhaiya.s3.ap-south-1.amazonaws.com/images/404.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className='flex border border-gray-800 flex-col justify-center gap-2 items-start backdrop-blur-md bg-blue-400/70 px-9 py-6 rounded-md' style={{ backgroundImage: "url('https://codebhaiya.s3.ap-south-1.amazonaws.com/images/404.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <h2 className='text-4xl font-bold'><span className='text-gray-400 mr-2'>404</span><span className='text-white/[0.9]'>Not Found</span></h2>
                <p className='text-2xl text-white'>This dimension doesn&apos;t exist...</p>
                <p className='text-white w-96 md:w-[40rem]'>We couldn&apos;t find a page at the URL you&apos;re on. You can try <Link href={'/login'} className='text-blue-500'>logging in</Link> or going back to the <Link href={'/'} className='text-blue-500'>homepage.</Link></p>
            </div>

        </div>
    );
}

export default NotFound;
