"use client"
import React, { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import gitgithub from "@/../public/courses/gitandgithub.jpg"

const Courses = () => {
  useEffect(() => {
    document.title = "Courses - The right way to learn coding"
  }, [])

  return (
    <div className="h-full md:h-full w-full dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1] flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

      <div className="container mx-auto lg:my-2">
        <h2 className="sm:text-4xl text-2xl uppercase font-medium title-font text-gray-900 my-7 md:my-10 text-center dark:text-white">
          Recommended Courses
        </h2>
        <div className="flex flex-wrap md:justify-center justify-between">
          <div className="md:p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
              <Image
                className="object-contain w-full object-center"
                src="https://codebhaiya.s3.ap-south-1.amazonaws.com/courses/deployment.jpg"
                width={384}
                height={216}
                alt="Image"
              />
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  FREE COURSE
                </span>
                <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                  Deployment, Hosting & DevOps
                </div>
                <p className="text-black text-base dark:text-gray-400">
                  Deployment is transferring software to a live environment;
                  hosting provides the infrastructure to run applications; and
                  DevOps combines development and operations practices to
                  enhance deployment ...
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={"/devops"}>
                  <span className="inline-block text-white bg-blue-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-blue-600">
                    {" "}
                    Start Watching{" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Python Course  */}
          <div className="py-4 md:p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
              <Image
                className="object-contain w-full object-center"
                src="https://i.ytimg.com/vi/9ebZqJOAtzk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBy-hFiXOYa78FOnMbdEdxk2_z9FA"
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
                  Python stands out as one of the most sought-after programming
                  languages in {`today's job market. Let's`} embark on this
                  exciting journey together as we unravel the fascinating world
                  of Python programming!
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={"/python"} target="">
                  <span className="inline-block text-white bg-blue-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-blue-600">
                    {" "}
                    Start Watching{" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="py-4 md:p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
              <Image
                className="object-contain w-full object-center"
                src={gitgithub}
                width={384}
                height={216}
                alt="Git&GitHub"
              />
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  FREE COURSE
                </span>
                <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                  Git & GitHub Course
                </div>
                <p className="text-black text-base dark:text-gray-400">
                  Learn the core concepts of version control, explore essential
                  commands, and branching, merging, and collaboration. This
                  course also covers behind-the-scenes mechanisms like
                  Git&apos;s object model and internal data storage.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={"/courses"} target="">
                  <span className="inline-block text-white bg-green-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-red-600">
                    {" "}
                    Coming Soon ...{" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="py-4 md:p-4 md:w-1/3 flex justify-center">
            <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
              <Image
                className="object-contain w-full object-center"
                src="https://codebhaiya.s3.ap-south-1.amazonaws.com/courses/matrix.jpg"
                width={384}
                height={216}
                alt="Image"
              />
              <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  FREE COURSE
                </span>
                <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                  Matrix Web Dev Course
                </div>
                <p className="text-black text-base dark:text-gray-400">
                  This is one of my favorite courses. In this series, you
                  {`&apose`}ll learn about HTML, CSS, JavaScript, and everything
                  needed to be a job-ready web developer. Just hop on, man.
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <Link href={"/matrix"} target="">
                  <span className="inline-block text-white bg-green-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-red-600">
                    {" "}
                    Coming Soon ...{" "}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
