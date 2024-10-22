"use client"
import React, { use, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LogIn = () => {

  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.push(`/u/@${session.user?.username || session.user.email?.split('@')[0]}`)
  }
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  function isValidEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  // Login 
  const logIn = async (e: React.MouseEvent) => {
    setLoading(true)
    if (!isValidEmail(formData.email)) {
      toast("Please enter a email address in valid format.");
      setLoading(false)
      return;
    }
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password
    })
    if (result?.error) {
      toast("Please user valid credentials.");
    }
    if (result?.url) {
      router.replace('/dashboard');
    }
    setLoading(false)
  }

  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [formData])

  useEffect(() => {
    document.title = 'Login - The right way to learn coding'
  }, [])
  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
        <div className="max-w-screen-lg md:h-[53rem] h-[40rem] mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">

          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white text-gray-900">
              LOGIN
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Connect with Us: Your Gateway to Support, Solutions, and Success!
            </p>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">

              <div className="flex flex-col w-full">
                <div className="mb-4">
                  <label htmlFor="email" className="dark:text-white leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value.trim() })}
                    className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="dark:text-white leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value.trim() })}
                    className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="p-2 w-full">
                  {
                    loading ? (
                      <button
                        type="button"
                        className="flex mx-auto transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none rounded"
                        disabled>
                        <div
                          className="mt-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"></div>
                        <span className="ml-2">Loading...</span>
                      </button>
                    ) : (

                      <button disabled={buttonDisabled} onClick={(e) => logIn(e)} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none rounded">
                        {buttonDisabled ? "Login" : "Login"}
                      </button>
                    )
                  }
                </div>
                <div>

                  <div className="text-md text-center dark:text-white text-black mt-3">
                    <span>Don&apos;t have an account?</span>
                    <Link href={'/signup'} className='text-blue-500 mx-2'>Signup</Link>
                    {"|"}
                    <Link href={'/forgot-password'} className='text-blue-500 mx-2'>Forgot Password?</Link>
                  </div>
                </div>

                {/* OAuth Login */}
                <div className='flex flex-col items-center gap-2 justify-center border-t-2 border-gray-700 dark:border-t-2 dark:border-gray-500 mt-4 py-4'>
                  <button className='dark:text-white bg-transparent flex justify-center items-center gap-4 rounded-full px-2 border border-black dark:border-white' onClick={() => signIn("github")} >
                    <FaGithub className='text-2xl' />
                    <span className='text-xl'>Github</span>
                  </button>
                  <button className='dark:text-white bg-transparent flex justify-center items-center gap-3 rounded-full px-2 border border-black dark:border-white' onClick={() => signIn("google")} >
                    <FcGoogle className='text-2xl' />
                    <span className='text-xl'>Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div >
    </div >
  )
}

export default LogIn