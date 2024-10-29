"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaGithub } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsDiscord } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import axios from "axios"

const Contact = () => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const sendMessage = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = {
        name: name,
        email: email,
        message: message,
      }
      if (name.length <= 0 || email.length <= 0 || message.length <= 0) {
        toast("Please fill all the fileds.")
        setLoading(false)
      }
      else {
        const res = await axios.post("/api/contact", data)
        toast("Message send successfully")
        setName("")
        setEmail("")
        setMessage("")
        setLoading(false)
      }
    } catch (error: any) {
      toast(error.message)
    }
  }
  useEffect(() => {
    document.title = "Contact Us - The right way to learn coding"
  }, [])
  
  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>

      {/* Feel free to contact me! */}
      <div className="sm:h-[60rem] h-[30rem] w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1]  ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        <div className="min-h-screen pt-10 md:pt-24">
          <div className="sm:mt-20 max-w-screen-xl px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg dark:bg-dark/[0.9] dark:text-white">
            <div className="flex flex-col justify-center items-center">
              <div>
                <h2 className=" text-center text-xl sm:text-3xl font-semibold leading-tight uppercase">
                  Feel free to contact us!
                </h2>
                <Image
                  alt="contact"
                  width={160}
                  height={100}
                  className="rounded-[50%] my-5 mx-auto py-2"
                  src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/contact.jpg"
                />
              </div>
            </div>
            {/* Social Media Icons  */}
            <div className="flex justify-center">
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.twitter.com/AbhinayJangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaSquareXTwitter className="text-3xl md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.instagram.com/abhinayjangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaSquareInstagram className="text-3xl md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.github.com/abhinayjangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="text-3xl md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.youtube.com/@abhinayjangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="text-3xl md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.linkedin.com/in/abhinay-jangde-a195011b9/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-3xl md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://discord.gg/CxPBRSZut7"
                target="_blank"
                rel="noreferrer"
              >
                <BsDiscord className="text-3xl md:text-4xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us  */}
      <section className="sm:h-[50rem] text-gray-600 dark:text-white dark:bg-dark body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white text-gray-900">
              CONTACT US
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Connect with Us: Your Gateway to Support, Solutions, and Success!
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-dark focus:border-indigo-500 focus:bg-white focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm dark:text-white text-gray-600">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-dark focus:border-indigo-500 focus:bg-white focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    name="message"
                    className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 dark:focus:bg-dark focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none dark:text-white text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
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

                    <button onClick={(e) => sendMessage(e)} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      Submit
                    </button>
                  )
                }
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
