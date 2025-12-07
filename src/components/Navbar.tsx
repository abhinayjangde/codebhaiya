"use client";
import React, { useState } from "react";
import { VscColorMode } from "react-icons/vsc";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes"

const Navbar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = authClient.useSession()
  const { setTheme } = useTheme()
  const [mode, setMode] = useState("dark");

  // Toggle Navbar
  const toggleNavbar = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  };

  const closeNavbar = () => {
    setMobileMenuOpen(false)
  };


  return (
    <>
      <header className="dark:bg-background z-50 dark:text-white bg-white text-black font-semibold body-font sticky top-0 shadow-md">
        <div className="flex px-3 py-1 items-center justify-between">
          {/* Logo and Brand */}
          <div title="The right way to learn coding." className="flex items-center text-sm">
            <Link href={"/"} className="flex title-font font-medium items-center text-gray-900">
              <Image
                alt="logo"
                src="https://avatars.githubusercontent.com/u/166032907?v=4"
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex sm:flex-row sm:items-center gap-2">
            <Link href="/" className="text-[16px] mx-2 my-1 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300">
              Home
            </Link>
            <Link href="/blogs" className="text-[16px] mx-2 my-1 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300">
              Blogs
            </Link>
            <Link href="/courses" className="text-[16px] mx-2 my-1 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300">
              Courses
            </Link>
            <Link href="/contact" className="text-[16px] mx-2 my-1 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300">
              Contact
            </Link>
          </nav>

          {/* Right Section - Auth & Theme */}
          <div className="flex items-center gap-2">
            {/* Desktop Auth Links */}
            {!session && (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/register"
                  className="text-[16px] mx-2 my-1 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="text-[16px] mx-2 my-1 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Toggle Theme */}
            <div className="flex items-center">
              <VscColorMode onClick={() => { if (mode === "dark") { setTheme("light"); setMode("light"); } else { setTheme("dark"); setMode("dark"); } }} className="text-3xl cursor-pointer" />
            </div>

            {/* User Dropdown */}
            {session && (
              <div className="relative">
                <button
                  onClick={() => { setShowDropdown(!showDropdown) }}
                  onBlur={() => { setTimeout(() => { setShowDropdown(false) }, 200) }}
                  className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 dark:text-white"
                  type="button"
                >
                  <Image
                    alt="avatar"
                    src={session?.user?.image || "https://avatars.githubusercontent.com/u/64852930?v=4"}
                    width={100}
                    height={100}
                    decoding="async"
                    data-nimg={1}
                    className="w-8 rounded-full mx-2 object-cover"
                    loading="lazy"
                    style={{ color: "transparent" }}
                  />
                  <span className="hidden md:block">{session?.user?.name}</span>
                  <svg
                    className="w-2.5 h-2.5 ms-2"
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
                <div className={`absolute -right-2 top-full mt-4 z-50 ${showDropdown ? "" : "hidden"} bg-white rounded-lg shadow-lg w-44 dark:bg-background dark:divide-gray-600`}>
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{session?.user?.name}</div>
                    <div className="truncate">{session?.user?.email}</div>
                  </div>
                  <ul className="text-sm border-t text-gray-700 dark:text-gray-200">
                    <li>
                      <Link href={`/creator/${session?.user?.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">
                        You
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-black dark:hover:text-white">
                        Settings
                      </Link>
                    </li>
                  </ul>
                  <div className="border-t">
                    <button onClick={() => { authClient.signOut() }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-black dark:text-gray-200 dark:hover:text-white">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={toggleNavbar} className="sm:hidden p-1">
              {mobileMenuOpen ? (
                <IoMdClose className="w-8 h-8 cursor-pointer dark:text-gray-200 transition-all duration-300 ease-in-out" />
              ) : (
                <IoMdMenu className="w-8 h-8 cursor-pointer dark:text-gray-200 transition-all duration-300 ease-in-out" />
              )}
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Navigation Menu - Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 top-14 z-40 bg-white dark:bg-background">
          <nav className="flex flex-col px-4 py-4 gap-1">
            <Link onClick={closeNavbar} href="/" className="text-[16px] py-3 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300 border-b dark:border-gray-700">
              Home
            </Link>
            <Link onClick={closeNavbar} href="/blogs" className="text-[16px] py-3 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300 border-b dark:border-gray-700">
              Blogs
            </Link>
            <Link onClick={closeNavbar} href="/courses" className="text-[16px] py-3 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300 border-b dark:border-gray-700">
              Courses
            </Link>
            <Link onClick={closeNavbar} href="/contact" className="text-[16px] py-3 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300 border-b dark:border-gray-700">
              Contact
            </Link>
            {!session && (
              <>
                <Link onClick={closeNavbar} href="/register" className="text-[16px] py-3 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300 border-b dark:border-gray-700">
                  Register
                </Link>
                <Link onClick={closeNavbar} href="/login" className="text-[16px] py-3 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-300 border-b dark:border-gray-700">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
