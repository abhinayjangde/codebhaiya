"use client"
import React, { useState, useEffect, use } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const ForgotPassword = () => {
  
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isResetCodeSent, setIsResetCodeSent] = useState(false)
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetCode, setResetCode] = useState("")

  useEffect(() => {
    document.title = "Forgot Password - The right way to learn coding"
  }, [])
  // Send OTP
  const sendResetOTP = async (e: any) => {
    e.preventDefault()
    try {
      if (email === "") {
        return toast("Email is required")
      }
      setLoading(true)
      const response = await axios.post('/api/forgot-password', { email: email })
      const data = response.data
      if (data.success) {
        toast(data.message)
        setIsResetCodeSent(true)
      } else {
        toast(data.message)
      }

    } catch (error: any) {
      if (error.response.data.message) {
        toast(error.response.data.message)
      }
    } finally {
      setLoading(false)
    }
  } 
  // Reset password
  const resetPassword = async (e: any) => {
    e.preventDefault()
    try {
      if (resetCode === "") {
        return toast("Reset code is required")
      }
      if (newPassword === "") {
        return toast("New password is required")
      }
      if (confirmPassword === "") {
        return toast("Confirm password is required")
      }
      if (newPassword !== confirmPassword) {
        return toast("Passwords do not match")
      }
      
      setLoading(true)
      const response = await axios.put('/api/forgot-password', { email: email, resetCode: resetCode, newPassword: newPassword })
      const data = response.data
      if (data.success) {
        toast(data.message)
        setEmail("")
        setIsResetCodeSent(false)
        setResetCode("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        toast(data.message)
      }
      router.push('/login')

    } catch (error: any) {
      if (error.response.data.message) {
        toast(error.response.data.message)
        router.push('/forgot-password')
      }
    } finally {
      setLoading(false)
      
    }
  }
  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
        <div className="max-w-screen-lg md:h-[53rem] h-[40rem] mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white text-gray-900 uppercase">
              Reset Password
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Connect with Us: Your Gateway to Support, Solutions, and Success!
            </p>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">

              <div className="flex flex-col w-full">
                {!isResetCodeSent && (<div className="mb-4">
                  <label htmlFor="email" className="dark:text-white leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>)}

                {isResetCodeSent && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="resetOtp" className="dark:text-white leading-7 text-sm text-gray-600">
                        Enter OTP
                      </label>
                      <input
                        type="resetOtp"
                        id="text"
                        name="resetOtp"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value)}
                        className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="dark:text-white leading-7 text-sm text-gray-600">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="dark:text-white leading-7 text-sm text-gray-600">
                        Re-enter Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </>

                )}

                <div className="p-2 w-full">
                  {
                    loading ? (
                      <button
                        type="button"
                        className="flex mx-auto uppercase transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none  rounded text-lg"
                        disabled>
                        <div
                          className="inline-block mt-2 h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status"></div>
                        <span className="ml-2">Loading...</span>
                      </button>
                    ) : (
                      <button onClick={(e) => {isResetCodeSent ? (resetPassword(e)) : sendResetOTP(e)}} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none rounded">
                        {isResetCodeSent ? "Reset Password" : "Send OTP"}
                      </button>
                    )
                  }
                </div>



              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword