"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import blogImageTemplate from "@/../public/images/blog.jpeg"

const Blogs = () => {
  const [blogposts, setBlogPosts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPosts, setFilteredPosts] = useState([])

  const getBlogs = async () => {
    try {
      const res = await fetch("/api/blogs")
      const data = await res.json()
      setBlogPosts(data.data)
      setFilteredPosts(data.data) // Initialize filteredPosts with all blog posts
    } catch (error) {
      console.error("Failed to fetch blogs", error)
    }
  }

  useEffect(() => {
    require("flowbite")
    document.title = "Blogs - The right way to learn coding"
    getBlogs()
  }, [])



  useEffect(() => {
    const filtered = blogposts.filter((blog: any) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.metades.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [searchQuery, blogposts])

  const [category, setCategory] = useState("All")

  return (
    <div className="sm:h-full w-full min-h-screen dark:bg-dark bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] flex flex-col justify-center items-center ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

      {filteredPosts ? (
        <>
          <div className="flex flex-col text-center w-full mt-2">
                <AnimatedShinyText className="text-2xl md:text-4xl font-semibold tracking-widest uppercase inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>Latest Articles</span>
                </AnimatedShinyText>
          </div>

          <form className="max-w-lg mx-auto mt-2">
            <div className="flex">
              <button
                disabled
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                {category}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => setCategory("All Categories")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      All Categories
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setCategory("WebDev")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      WebDev
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setCategory("AppDev")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      AppDev
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setCategory("GenAI")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      GenAI
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setCategory("Tech")}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Tech
                    </button>
                  </li>
                </ul>
              </div>

              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-[17rem] md:w-[25rem] z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Dev, Tech ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium w-[3rem] h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-6 h-6 pl-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
            {/* <div className="flex justify-between mx-4 mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPosts.length} Total Posts
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPosts.length} Results
              </p>
            </div> */}
            {/* <div className="flex justify-center gap-2 mt-2 text-xl text-blue-600 dark:text-blue-500">
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>webdev
              </p>
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>cybersecurity
              </p>
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>appdev
              </p>
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>devops
              </p>
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>news
              </p>
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>genai
              </p>
              <p className="cursor-pointer hover:text-red-600">
                <span className="text-blue-800">#</span>tips
              </p>
            </div> */}

          </form>

          <div className="md:container md:w-[90rem] sm:p-4">
            {filteredPosts &&
              filteredPosts.map((blog: any) => (
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
        </>
      ) : (
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-10 h-10 me-3 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      )}
    </div>
  )
}

export default Blogs
