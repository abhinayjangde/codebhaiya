"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import "prismjs/components/prism-bash.js"

const Python = () => {

  useEffect(() => {
    Prism.highlightAll()
  }, []);

  // Send Feedback
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const sendFeedback = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        feedback: feedback
      }
      if (feedback.length <= 0 || feedback === "") {
        toast("Please enter feedback message.")
        setLoading(false)
      }
      else {
        const res = await axios.post("/api/feedback", data)
        toast("Feedback send successfully")
        setFeedback("")
        setLoading(false)
      }
    } catch (error: any) {
      toast("Please enter your feedback.")
      setLoading(false)
    }
  }

  // Send Course Review 
  const [reviewData, setReviewData] = useState({ name: "", email: "", message: "", courseName: "Python-Course-In-Hindi" })
  const sendCourseReview = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        name: reviewData.name,
        email: reviewData.email,
        message: reviewData.message,
        courseName: reviewData.courseName
      }
      if (reviewData.name.length <= 0 || reviewData.email.length <= 0 || reviewData.message.length <= 0) {
        toast("All field are required.")
        setLoading(false)
      }
      else {
        const res = await axios.post("/api/coursereview", data)
        toast("Review message send successfully")
        setReviewData({ name: "", email: "", message: "", courseName: "Python-Course-In-Hindi" })
        setLoading(false)
      }
    } catch (error: any) {
      toast(error.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    document.title = 'Python Course - The right way to learn coding'
  }, [])


  return (
    <>

      <div className="h-[75rem] sm:h-[60rem] w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        {/* Top Course Thambnail  */}
        <div className='sm:pt-28 pt-10 flex sm:flex-row flex-col items-center justify-center gap-10'>
          <div className='flex flex-col justify-center items-start gap-4 px-10 sm:px-0 sm:w-[40rem] dark:text-white'>
            <p className='text-md sm:text-xl text-white dark:bg-ray-800 rounded-full bg-gray-800 px-4  py-2 w-fit uppercase'>Unlock the Power of Python 🚀</p>
            <h2 className='text-3xl sm:text-5xl font-semibold uppercase'>Dive Deep into Python</h2>
            <p className='text-lg sm:text-xl px-1 bg-white border border-black/[0.1] dark:bg-dark '>
              Join our immersive Python course led by industry maestro Abhinay Jangde, designed to unleash your coding potential and elevate your skills to new heights. Whether you&apos;re a novice or seeking to refine your expertise, this comprehensive course equips you with the knowledge and practical experience needed to excel in Python programming. With a perfect blend of theory and hands-on projects, embark on a transformative journey to become a Python pro. Start coding your dreams into reality today! </p>
            <div className="mt-10">
              <p className='my-4 text-xl'>Please send a feedback to the course.</p>
              <form className='flex justify-center items-center gap-4'>
                <input className='dark:bg-dark bg-white/[0.8] w-80 sm:w-96 border-black dark:text-white dark:border-white px-2 py-1 border rounded-md' type="text" name='feedback' onChange={(e) => setFeedback(e.target.value)} value={feedback} placeholder='Feedback' />

                {
                  loading ? (
                    <button
                      type="button"
                      className="'bg-black dark:text-white text-black  px-2 py-1 border dark:border-white border-black rounded-md uppercase transition duration-150 ease-in-out disabled:opacity-70"
                      disabled>
                      <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"></div>
                      <span className="ml-2">Loading...</span>
                    </button>
                  ) : (
                    <button onClick={(e) => sendFeedback(e)} className='bg-transparent dark:text-white dark:border-white border-black  text-black px-2 py-1 border rounded-md'>SUBMIT</button>
                  )
                }
              </form>
            </div>
          </div>

          <div className="  p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
              <Image
                className="object-contain w-full object-center"
                src="https://codebhaiya.s3.ap-south-1.amazonaws.com/courses/python.jpg"
                width={384}
                height={216}
                alt="Image"
              />
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  FREE COURSE
                </span>
                <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                  Python Course for Beginners
                </div>
                <p className="text-black text-base dark:text-gray-400">
                  {`Python stands out as one of the most sought-after programming languages in today's job market. Let's embark on this exciting journey together as we unravel the fascinating world of Python programming!n, man.`}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={'https://www.youtube.com/playlist?list=PLektAlvzRpxGbkecHfD6UZRecAdGPOGTa'} target='blank'>
                  <span className="inline-block text-white bg-green-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-yellow-500">
                    {" "}
                    Start Watching {" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content  */}
      {/* <div className="px-36 py-10 dark:bg-dark bg-gray-200 dark:border-gray-800">
        <div className="flex flex-col text-center w-full mb-12 dark:text-white text-gray-900">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2">
            ARTICLES & RESOURCES
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Complete Python Course for Beginners
          </p>
        </div>
        <CourseArticles/>      
      </div> */}



      {/* Course Review */}
      <section className="text-gray-600 dark:text-white dark:bg-dark body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 dark:text-white text-gray-900">
              COURSE REVIEW
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Unlock Insights, Empower Decisions: Discover Honest Reviews to Navigate Your Learning Journey.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm dark:text-white text-gray-600">
                    Name
                  </label>
                  <input
                    value={reviewData.name}
                    onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm dark:text-white text-gray-600">
                    Email
                  </label>
                  <input
                    value={reviewData.email}
                    onChange={(e) => setReviewData({ ...reviewData, email: e.target.value })}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    value={reviewData.message}
                    onChange={(e) => setReviewData({ ...reviewData, message: e.target.value })}
                    id="message"
                    name="message"
                    className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 dark:focus:bg-gray-900 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none dark:text-white text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                {
                  loading ? (
                    <button disabled className="flex mx-auto uppercase transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[0.45rem]"
                        role="status"></div>
                      <span className="ml-3 text-lg">Loading...</span>
                    </button>

                  ) : (

                    <button onClick={(e) => sendCourseReview(e)} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      Submit
                    </button>
                  )
                }
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  )

}

export default Python


