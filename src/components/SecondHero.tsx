"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { IoIosArrowRoundForward } from "react-icons/io"
import blogImageTemplate from "@/../public/images/blog.jpeg"

const SecondHero: React.FC = () => {
  useEffect(() => {
    document.title = "Blogs - The right way to learn coding"
  }, [])

  const [blogposts, setBlogPosts] = useState([])
  const getBlogs = async () => {
    try {
      const res = await fetch("/api/blogs/limit/3")
      const data = await res.json()
      setBlogPosts(data.data)
    } catch (error) {}
  }

  useEffect(() => {
    getBlogs()
  }, [])
  return (
    <div className="sm:h-full w-full min-h-[15rem] dark:bg-dark border dark:border-none flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>
      <div className="flex flex-col justify-center items-center pb-10">
        <div className="my-4 md:my-10">
          <Link
            href={"/blogs"}
            className="dark:bg-gray-800 bg-white px-1 py-1 border border-blue-600 rounded-full flex flex-row justify-between items-center mt-2"
          >
            <p className="text-xl md:text-xl dark:text-white text-white bg-blue-600 dark:bg-blue-600 py-1 px-2 rounded-full mr-2">
              New Blog Posts
            </p>
            <p className="hidden md:block text-xl md:text-xl text-blue-500">
              Diving Into The Coding
            </p>
            <IoIosArrowRoundForward className="text-blue-500 dark:text-blue-500 text-xl mt-[0.3rem]" />
          </Link>
        </div>

        <div className="md:container md:w-[90rem] sm:p-4">
          {blogposts &&
            blogposts.map((blog: any) => (
              <div
                key={blog.slug}
                className="my-2 md:my-4 md:dark:bg-gray-950 md:bg-gray-50 dark:border-gray-800 md:border md:rounded-md md:pl-4"
              >
                <div className="py-2 md:py-4 flex flex-wrap justify-center items-center md:justify-center md:items-center md:flex-nowrap gap-2">
                  <Image
                    className="object-contain w-80 sm:w-full object-center md:rounded-l-lg md:w-60"
                    src={blog.image || blogImageTemplate}
                    alt="Image"
                    width={1280}
                    height={720}
                  />
                  <Link
                    href={`blog/${blog.slug}`}
                    className="md:flex-grow mx-3 md:px-3"
                  >
                    <div className="flex flex-row mr-4 text-sm">
                      <span className="hidden md:block dark:text-gray-300 text-black underline ">
                        {blog.author} |{" "}
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="sm:text-2xl mx-4 md:mx-auto font-semibold text-xl dark:text-white text-black title-font mb-2">
                      {blog.title}
                    </h2>
                    <p className="hidden md:block leading-relaxed dark:text-gray-300 text-black">
                      {blog.metades}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SecondHero
