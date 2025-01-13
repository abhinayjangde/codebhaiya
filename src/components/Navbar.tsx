"use client";
import React, { useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes"

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const { data: session } = useSession()
  const { setTheme } = useTheme()
  const [mode, setMode] = useState("dark");

  // Toggle Navbar
  const toggleNavbar = () => {
    let menuid = document.getElementById("menuid")
    if (menuid?.classList.contains("hidden")) {
      menuid.classList.remove("hidden")
      menuid.classList.add("flex")
    } else {
      menuid?.classList.add("hidden")
      menuid?.classList.remove("flex")
    }
  };


  return (
    <>
      <header className="dark:bg-dark z-10 dark:text-white bg-white text-black font-semibold body-font sticky top-0 shadow-md">
        <div className="flex px-3 py-1 flex-col md:flex-row justify-between">
          <div title="The right way to learn coding." className="flex flex-col md:flex-row text-sm">
            <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-1 md:mb-0">
              <Image
                alt="logo"
                src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/logo.png"
                width={100}
                height={100}
                decoding="async"
                data-nimg={1}
                className="w-12 rounded-full"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <span className="block sm:hidden underline dark:decoration-white underline-offset-8 ml-3 text-xl tracking-tighter text-black dark:text-gray-200 dark:hover:text-white">
                CB
              </span>
              <span className="hidden sm:block underline dark:decoration-white underline-offset-8 ml-3 text-xl tracking-tighter text-black dark:text-gray-200 dark:hover:text-white">
                CODEBHAIYA
              </span>
            </Link>
            <nav id="menuid" className="hidden sm:visible sm:flex sm:flex-row sm:items-center items-end flex-col gap-2 transition-all duration-300 ease-in-out">
              <Link onClick={() => toggleNavbar()} href="/" className=" text-[16px] ml-4 mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300" >
                Home
              </Link>

              <Link onClick={() => toggleNavbar()} href="/blogs" className=" text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300" >
                Blogs
              </Link>
              <Link onClick={() => toggleNavbar()} href="/courses" className=" text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300" >
                Courses
              </Link>
              {/* <Link onClick={() => toggleNavbar()} href="/tutorials" className=" text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300" >
            Tutorials
          </Link> */}
              <Link
                onClick={() => toggleNavbar()}
                href="/contact"
                className="text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300"
              >
                Contact
              </Link>



              {/* Signup and Login Button  */}
              {!session && (
                <>
                  <Link
                    onClick={() => toggleNavbar()}
                    href="/signup"
                    className="block sm:hidden text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300"
                  >
                    Signup
                  </Link>
                  <Link
                    onClick={() => toggleNavbar()}
                    href="/login"
                    className="block sm:hidden text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300"
                  >
                    Login
                  </Link>
                </>
              )}

            </nav>
          </div>


          <div className={`flex justify-center ${showDropdown ? "" : "items-center"} absolute top-2 md:top-2 right-2 gap-2`}>
            {!session && (
              <>
                <Link
                  href="/signup"
                  className="sm:block hidden text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300"
                  >
                  Signup
                </Link>
                <Link
                  href="/login"
                  className="sm:block hidden text-[16px] mr-4 my-1 hover:text-gray-500 dark:text-gray-200  dark:hover:border-gray-500 dark:hover:text-gray-300"
                  >
                  Login
                </Link>
              </>
            )}

 
            {/* Toggle Theme  */}
            <div className="flex">
            <VscColorMode onClick={() => { if (mode === "dark") { setTheme("light"); setMode("light"); } else { setTheme("dark"); setMode("dark"); } }} className="text-3xl cursor-pointer" />
            </div>

            {/* Dropdown Sections  */}
            <div className="">
              {session && (
                <div className="flex flex-col ">
                  <button
                    onClick={() => { setShowDropdown(!showDropdown) }}
                    onBlur={() => { setTimeout(() => { setShowDropdown(false) }, 200) }}
                    className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0  dark:focus:ring-gray-700 dark:text-white"
                    type="button"
                  >

                    {
                      session && (
                        <Image
                          alt="avatar"
                          src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/avatar.png"
                          width={100}
                          height={100}
                          decoding="async"
                          data-nimg={1}
                          className="w-8 rounded-full mx-2"
                          loading="lazy"
                          style={{ color: "transparent" }}
                        />
                      )
                    }
                    {
                      !session && (
                        <Image
                          alt="avatar"
                          src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/logo.png"
                          width={100}
                          height={100}
                          decoding="async"
                          data-nimg={1}
                          className="w-8 rounded-full mx-2"
                          loading="lazy"
                          style={{ color: "transparent" }}
                        />
                      )
                    }
                    <span className="" >{(session?.user?.fullname) || (session?.user?.username)}</span>

                    <svg
                      className="w-2.5 h-2.5 ms-3"
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

                  {/* Dropdown menu */}
                  <div className={`mt-5 ${showDropdown ? "" : "hidden"} bg-white rounded-lg shadow w-44 dark:bg-gray-900 dark:divide-gray-600`}>
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                      <div className="font-medium">{session?.user?.fullname || session?.user?.username}</div>
                      <div className="truncate">{session?.user?.email}</div>
                    </div>
                    <ul className="text-sm border-t text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                      <li>
                        <Link href={`/u/@${session?.user?.username || session?.user?.email?.split("@")[0]}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          You{' '}
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Settings
                        </Link>
                      </li>

                      {session?.user?.role === "CREATOR" && <li>
                        <Link href="/creator/writeblog" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          {"Write a Blog"}
                        </Link>
                      </li>}

                    </ul>
                    <div className="border-t">
                      <Link onClick={() => { signOut() }} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>

              )}

            </div>

            {/* Toggle Navbar  */}
            <IoMdMenu onClick={toggleNavbar} className="w-10 h-10 cursor-pointer dark:text-gray-200 sm:hidden transition-all duration-300 ease-in-out" />

          </div>

        </div>
      </header>

    </>
  );
};

export default Navbar;
