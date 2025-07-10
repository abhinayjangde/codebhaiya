"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const Devops = () => {

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
  const [reviewData, setReviewData] = useState({ name: "", email: "", message: "", courseName: "Deployment-Hosting-DevOps-Course-In-Hindi" })
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
        setReviewData({ name: "", email: "", message: "", courseName: "Deployment-Hosting-DevOps-Course-In-Hindi" })
        setLoading(false)
      }
    } catch (error: any) {
      toast(error.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    document.title = 'Deployment, Hosting & DevOps - The right way to learn coding'
  }, [])
  return (
    <>

      <div className="h-[75rem] sm:h-[60rem] w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        {/* Top Course Thambnail  */}
        <div className='sm:pt-28 pt-10 flex sm:flex-row flex-col items-center justify-center gap-10'>
          <div className='flex flex-col justify-center items-start gap-4 px-10 sm:px-0 sm:w-[40rem] dark:text-white'>
            <p className='text-md sm:text-xl text-white dark:bg-ray-800 rounded-full bg-gray-800 px-4  py-2 w-fit uppercase'>Unlock the Power of DevOps 🚀</p>
            <h2 className='text-3xl sm:text-5xl font-semibold uppercase'>Deployment, Hosting & DevOps</h2>
            <p className='text-lg sm:text-xl px-1 bg-white border border-black/[0.1] dark:bg-dark '>
            In the &quot;Deployment, Hosting & DevOps&quot; course on YouTube, you&apos;ll learn essential skills for deploying and hosting applications efficiently while mastering DevOps principles. Topics include server setup, continuous integration and delivery (CI/CD), containerization with Docker, and orchestration with Kubernetes. Whether you&apos;re a beginner or experienced developer, this course provides practical knowledge and hands-on experience to streamline your workflow, ensure smooth deployments, and maintain scalable applications. Join us to elevate your deployment and DevOps skills!</p>
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
                src="https://i.ytimg.com/vi/LOAwc5XDxzg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBMSnsL3a3g3uKUPcPfsgVuHepULg"
                width={384}
                height={216}
                alt="Image"
              />
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  FREE COURSE
                </span>
                <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                Deployment, Hosting & DevOp
                </div>
                <p className="text-black text-base dark:text-gray-400">
                  {`Deployment is transferring software to a live environment; hosting provides the infrastructure to run applications; and DevOps combines development and operations practices to enhance deployment...`}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={'https://www.youtube.com/playlist?list=PLektAlvzRpxEUCj8lOJ5yczLHOJcy6EUH'} target='blank'>
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

      {/* Another Section  */}
      {/* <div className='dark:bg-dark'>
        <div className="h-[50rem] sm:h-[40rem] lg:h-[40rem] w-full dark:bg-blue-200/[0.1] bg-yellow-200 ">
          <div className='flex sm:flex-col md:flex-col lg:flex-col xl:flex-row  px-4 sm:px-4 md:px-4 lg:px-44 flex-col justify-center items-center gap-10'>
            <div className='flex justify-center flex-col mt-4 lg:mt-8 xl:mt-32'>
              <h2 className='dark:text-white text-black text-3xl sm:text-4xl md:text-4xl lg:text-6xl my-4'>PYTHON</h2>
              <h4 className='dark:text-white text-black text-lg md:text-2xl '>Python, renowned for its simplicity and versatility, is a high-level programming language favored for its readability and ease of learning. Widely used in web development, data analysis, artificial intelligence, and more, Python&apos;s extensive libraries make it a powerhouse for diverse applications. Its straightforward syntax and strong community support make Python an ideal choice for both beginners and experienced developers alike.</h4>
            </div>
            <div className='mt-4 lg:mt-8 xl:mt-32 container relative leading-relaxed '>
              <CodeBlock code={pythoncode} language='python' />
              <CopyToClipboard text={pythoncode} onCopy={handleCopy}>
                <button className="absolute top-0 right-0 dark:text-white text-white bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 p-1">
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div> */}

      {/* Course Review Form  */}
      <section className="text-gray-600 dark:text-white dark:bg-dark body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white text-gray-900">
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
                      Submit Feedback
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

export default Devops


