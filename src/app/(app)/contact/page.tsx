"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaGithub } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaYoutube } from "react-icons/fa"
import { FaSquareInstagram } from "react-icons/fa6"
import { BsDiscord } from "react-icons/bs"
import { FaLinkedin } from "react-icons/fa"
import { RainbowButton } from "@/components/ui/rainbow-button"
import contactImage from "@/../public/images/contact.jpg"

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false)
  return (
    <div>
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

      {/* Feel free to contact me! */}
      <div className="sm:h-[60rem] h-[30rem] w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1]  ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        <div className="min-h-screen pt-10 md:pt-24">
          <div className="sm:mt-20 max-w-screen-xl px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg dark:bg-dark/[0.9] dark:text-white">
            <div className="flex flex-col justify-center items-center">
              <div>
                <div className="flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
                  <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase">
                    feel free to contact us
                  </h2>
                  <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">
                    https://abhinayjangde.dev
                  </h6>
                </div>
                <Image
                  alt="contact"
                  width={160}
                  height={100}
                  className="rounded-[50%] my-5 mx-auto py-2"
                  src={contactImage}
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
                <FaSquareXTwitter className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.instagram.com/abhinayjangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaSquareInstagram className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.github.com/abhinayjangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.youtube.com/@abhinayjangde"
                target="_blank"
                rel="noreferrer"
              >
                <FaYoutube className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://www.linkedin.com/in/abhinay-jangde-a195011b9/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
              <Link
                className="cursor-pointer mx-3 md:mx-6"
                href="https://discord.gg/CxPBRSZut7"
                target="_blank"
                rel="noreferrer"
              >
                <BsDiscord className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us  */}
      <section className="sm:h-[50rem] text-gray-600 dark:text-white dark:bg-dark body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
            <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase">
              Contact Us
            </h2>
            <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">
              feel free to contact us :)
            </h6>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-dark focus:border-indigo-500 focus:bg-white focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Email
                  </label>
                  <input
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
                    id="message"
                    name="message"
                    className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 dark:focus:bg-dark focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none dark:text-white text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="p-2 w-full text-center">
                {loading ? (
                  <RainbowButton>LOADING...</RainbowButton>
                ) : (
                  <RainbowButton className="dark:text-white border border-white px-2">
                    SUBMIT
                  </RainbowButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
