"use client"
import React from "react"
import Link from "next/link"
import { SiHostinger } from "react-icons/si"
import { FaDigitalOcean } from "react-icons/fa"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import Image from "next/image"
import MyGears from "../my-gears/page"

const Support: React.FC = () => {
  const words = ["Better", "Affordable", "Faster", "Responsive"]
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(false)
  const sendFeedback = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        feedback: feedback,
      }
      if (feedback.length <= 0 || feedback === "") {
        toast("Please enter feedback message.")
        setLoading(false)
      } else {
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

  return (
    <div className="md:h-[48] w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1]  ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container px-5 py-4 md:py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-4 md:mb-20">
          <h1 className="text-3xl md:text-5xl font-medium title-font md:mb-4 dark:text-slate-200 text-gray-900 tracking-widest">
            SUPPORT US
          </h1>
          <p className="lg:w-2/3 mx-auto md:text-lg text-blue-600 leading-relaxed">
            Empower Knowledge, Fuel Dreams: Donate Today for Free Education and
            Tech Advancement!
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-10">
          <div className="flex flex-col justify-center items-start gap-4 px-4 sm:px-0 sm:w-[40rem] dark:text-white">
            <p className="text-md sm:text-xl text-white dark:bg-black/[0.7] rounded-full bg-gray-800 px-4 py-2 w-fit uppercase">
              Support Us 😁
            </p>
            <h2 className="text-3xl sm:text-5xl dark:text-slate-200 font-semibold uppercase">
              Buy Me a Coffee
            </h2>
            <p className="text-lg sm:text-xl px-1 bg-white border border-black/[0.1] dark:bg-dark">
              If you&apos;ve been enjoying the educational content on my YouTube
              channel and want to show your appreciation, here&apos;s a fun and
              easy way to do it! Introducing the &quot;Buy Me a Coffee&quot;
              course—designed as a simple gesture of support for my work, priced
              at just Rs. XX.
            </p>
            <p className="text-lg sm:text-xl px-1 bg-white border border-black/[0.1] dark:bg-dark">
              By purchasing this course, you&apos;re not only helping me
              continue creating high-quality tutorials and educational videos,
              but you&apos;re also buying me a much-needed coffee (or tea!).
              Plus, this includes the tea for the government at 18%!
            </p>

            <div className="mt-4 flex flex-col justify-start items-start">
              <p className="my-4 text-xl">
                Please send a feedback that how we make coding more easy.
              </p>
              <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <input
                  className="dark:bg-dark bg-white/[0.8] w-full sm:w-96 ring-2 ring-blue-500 ring-inset dark:text-white px-[0.60rem] py-[0.35rem] rounded-md"
                  type="text"
                  name="feedback"
                  onChange={(e) => setFeedback(e.target.value)}
                  value={feedback}
                  placeholder="Feedback"
                />

                {loading ? (
                  <button
                    type="button"
                    className="bg-black dark:text-white text-black px-2 py-1 border dark:border-white border-black rounded-md uppercase transition duration-150 ease-in-out disabled:opacity-70"
                    disabled
                  >
                    <div
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                    <span className="ml-2">Loading...</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => sendFeedback(e)}
                    className="bg-transparent dark:text-white text-black px-[0.60rem] py-[0.35rem] rounded-md ring-2 ring-blue-500 ring-inset"
                  >
                    SUBMIT
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="p-4 w-full sm:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
              <Image
                className="object-contain w-full object-center"
                src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/me.jpg"
                width={384}
                height={216}
                alt="Image"
              />
              <div className="px-6 py-4">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  PAID COURSE
                </span>
                <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                  Buy Me a Coffee
                </div>
                <p className="text-black text-base dark:text-gray-400">
                  If you&apos;ve been enjoying the educational content on my
                  YouTube channel and want to show your appreciation,
                  here&apos;s a fun and easy way to do it! Introducing the
                  &quot;Buy Me a Coffee&quot; course—designed as a simple
                  gesture of support for my work, priced at just Rs. XX.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={"https://razorpay.me/@codebhaiya"} target="blank">
                  <span className="inline-block text-white bg-green-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:text-black hover:bg-yellow-300">
                    PAY ₹ XX.00{" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-16">
          <h3 className="text-md sm:text-xl text-white dark:bg-black rounded-full bg-gray-800 px-4  py-2 w-fit uppercase">
            Referral Links
          </h3>
        </div>

        <div className="flex justify-center mt-4 items-center">
          <table className="w-[50%] bg-white dark:text-white dark:bg-slate-800 border border-gray-500 my-6 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 dark:bg-gray-900">
                  Platform
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 dark:bg-gray-900">
                  Links
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-gray-50 dark:even:bg-gray-900">
                <td className="py-2 px-4 text-purple-600 flex justify-center items-center gap-2">
                  <SiHostinger /> <p>Hostinger</p>
                </td>
                <td className="py-2 px-4">
                  {" "}
                  <Link
                    href={"https://hostinger.in?REFERRALCODE=1ABHINAY89"}
                    target="_blank"
                    className="cursor-pointer flex justify-center hover:underline"
                  >
                    Get 20% Discount on All Products
                  </Link>
                </td>
              </tr>
              <tr className="even:bg-gray-50 dark:even:bg-gray-900">
                <td className="py-2 px-4 text-blue-600 flex justify-center items-center gap-2">
                  <FaDigitalOcean /> <p>Digital Ocean</p>
                </td>
                <td className="py-2 px-4">
                  <Link
                    href={"https://m.do.co/c/88f08a6b2751"}
                    target="_blank"
                    className="cursor-pointer flex justify-center hover:underline"
                  >
                    Get 200$ Free Credit for 60 Days
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Support
