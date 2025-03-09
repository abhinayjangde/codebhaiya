"use client";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import "prismjs/components/prism-bash.js";
import { AiOutlineRead, AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { MdPictureAsPdf } from "react-icons/md";
import { FaYoutube } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Blog {
  title: string;
  createdBy: {
    avatar: string;
  };
  author: string;
  date: string;
  readingTime: string;
  content: string;
  video: string;
}

const BlogSlug = ({ params }: { params: { slug: string } }) => {

  const { slug } = params;
  const [blog, setBlog] = useState<Blog | null>(null); 
  const [buttonColor, setButtonColor] = useState('text-white');
  
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get(`/api/blogs/${slug}`);
        const data = await res.data.data;
        setBlog(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load the blog!");
      }
    };
    getBlogs();
  }, [slug]);

  useEffect(() => {
    if (blog?.title) {
      document.title = `${blog.title} - The right way to learn coding`;
      Prism.highlightAll();
    }
  }, [blog]);

  if (!blog) {
    return <p>Loading...</p>; 
  }


  return (
    <>
      <div className='dark:bg-dark py-5 bg-gray-50 md:p-4 lg:p-12'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="max-w-screen-lg mx-auto bg-white dark:bg-black/[0.3] rounded-lg shadow-md p-6 lg:p-10 z-0 relative">
          <h1 className="text-center text-xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white mb-1 flex">
            {blog.title}
          </h1>

          <div className="flex pt-5 items-center mb-6 flex-col md:flex-row md:justify-start border-b pb-2">
            <div className="image flex justify-center items-center">
              <div className="h-8 w-8 mb-1 overflow-hidden rounded-full">
                <Link href="https://codebhaiya.com/#whoami" className="block w-full h-full">
                  <Image
                    alt="abhinayjangde"
                    src={"https://avatars.githubusercontent.com/u/64852930?v=4"}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <Link
                href="http://localhost:3000/#whoami"
                className="text-sm text-slate-900 dark:text-white transition ease-in-out duration-150 mx-2"
              >
                {blog.author}
              </Link>
            </div>
            <div className="rest flex mt-3 md:mt-0">
              <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">·</span>
              <span className="text-sm dark:text-gray-400 text-gray-500 mx-2">
                {new Date(blog.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="mx-1 hidden font-bold dark:text-gray-400 text-slate-500 md:block">·</span>
              <span className="text-sm dark:text-gray-400 text-gray-500 flex mx-2">
                <AiOutlineRead className='w-[1.3rem] h-[1.3rem] mr-2' />
                {blog.readingTime}
              </span>
            </div>
          </div>

          <div className="leading-relaxed text-dark dark:text-gray-100" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="hidden md:block absolute top-0 -right-14 px-2 mx-2 bg-white text-black dark:text-white dark:bg-gray-900 rounded-lg shadow-md">
            <AiOutlineLike onClick={() => toast("This functionality is coming soon!")} title='I like this' className="text-2xl my-4 cursor-pointer" />
            <PiShareFat onClick={() => toast("This functionality is coming soon!")} title='Share' className='text-2xl my-4 cursor-pointer' />
            <MdPictureAsPdf onClick={() => toast("This functionality is coming soon!")} title='Download PDF' className='text-2xl my-4 cursor-pointer' />
            {
              blog.video !== "null" &&
              <Link href={blog.video} target='_blank'>
                <FaYoutube title='Watch Video' className='text-2xl my-4 cursor-pointer' />
              </Link>
            }
          </div>
        </div>

        <div className="dark:bg-dark py-5 bg-gray-50 md:p-4">
          <div className="max-w-screen-lg mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 lg:p-10">
          <p>Thank you for reading our blog!</p>
          <p>We have a <a className='underline' href="https://discord.com/invite/CxPBRSZut7" target='_blank' >Discord community</a> where you can ask questions and get help from the community.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogSlug;
