"use client"
import React, { use, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [loading, setLoading] = React.useState(false)
  const [disableButton, setDisableButton] = React.useState(true)
  const { data: session } = useSession()
  const [agree, setAgree] = React.useState(false)
  const router = useRouter()
  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])

  // Delete Account 
  const deleteAccount = async (e: any) => {
    e.preventDefault()
    if (!agree) {
      toast('Please check the box to delete your account.')
      return
    }
    try {
      setLoading(true)
      setDisableButton(false)
      const res = await axios.delete(`/api/u/${session?.user.email}`)
      if (res.data.success) {
        signOut()
      }
      else {
        toast(res.data.error)
      }
    } catch (error: any) {
      toast(error.response.data.message)
    } finally {
      setLoading(false)
      setDisableButton(true)
    }
  }

  const handleCheckbox = (e: any) => {
    setAgree(e.target.checked)
  }

  // Change Password
  const [changePasswordData, setChangePasswordData] = React.useState<any>({
    email: session?.user.email,
    currentPassword: '',
    newPassword: '',
    retypeNewPassword: ''
  })
  const changePassword = async (e: any) => {
    e.preventDefault()
    if (changePasswordData.newPassword !== changePasswordData.retypeNewPassword) {
      return toast('New password and retype new password does not match.')
    }
    if(changePasswordData.currentPassword === changePasswordData.newPassword){
      return toast('Old password and new password should not be same.')
    }
    
    try {
      setLoading(true)
      setDisableButton(false)
      const res = await axios.post(`/api/change-password`, {
        email: session?.user.email,
        oldPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword
      })
      if (res.data.success) {
        toast(res.data.message)
      }
      else {
        toast(res.data.error)
      }
    } catch (error: any) {
      toast(error.response.data.message)
    } finally {
      setLoading(false)
      setDisableButton(true)
    }
  }
  useEffect(() => {
    document.title = 'Settings - The right way to learn coding'
  }, [])
  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>

      <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
        <div className="max-w-screen-lg min-h-screen mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">
          <h1 className="sm:text-3xl border-b text-2xl font-medium text-center pb-2 title-font dark:text-white text-gray-900 uppercase">Settings</h1>

          {/* Change Password  */}
          <div className="lg:w-1/2 md:w-2/3 mx-auto mt-10">
            <h1 className="sm:text-xl text-xl my-4 title-font text-center dark:text-white border-b text-gray-900 pb-2 uppercase">Change Password </h1>
            <div className="flex flex-col -m-2">

              <div className="">
                <label htmlFor="currentPassword" className="leading-7 text-sm dark:text-white text-gray-600">
                  Current Password
                </label>
                <input
                  value={changePasswordData.currentPassword}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, currentPassword: e.target.value })}
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none dark:text-white text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="">
                <label htmlFor="newPassword" className="leading-7 text-sm dark:text-white text-gray-600">
                  New Password
                </label>
                <input
                  value={changePasswordData.newPassword}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, newPassword: e.target.value })}
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none dark:text-white text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="">
                <label htmlFor="retypeNewPassword" className="leading-7 text-sm dark:text-white text-gray-600">
                  Retype new Password
                </label>
                <input
                  value={changePasswordData.retypeNewPassword}
                  onChange={(e) => setChangePasswordData({ ...changePasswordData, retypeNewPassword: e.target.value })}
                  type="password"
                  id="retypeNewPassword"
                  name="retypeNewPassword"
                  className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none dark:text-white text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="p-2 mt-4 w-full">
                {
                  loading ? (
                    <button disabled className="flex mx-auto uppercase transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[0.45rem]"
                        role="status"></div>
                      <span className="ml-3 text-lg">Loading...</span>
                    </button>

                  ) : (

                    <button onClick={(e) => changePassword(e)} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      Change Password
                    </button>
                  )
                }
              </div>

            </div>
          </div>

          {/* Deleter Account  */}
          <div className="lg:w-1/2 md:w-2/3 mx-auto mt-10">
          <h1 className="sm:text-xl text-xl my-4 title-font text-center dark:text-white border-b text-gray-900 pb-2 uppercase">Delete Your Account </h1>
            <div className="flex flex-col -m-2 justify-center items-center gap-4">
              <div className="flex flex-row gap-2">

              <input
                type="checkbox"
                id="agree"
                name="agree"
                onChange={(e) => handleCheckbox(e)}
                className="w-fit text-xl bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 outline-none dark:text-white text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              <p className='text-xl'>I agree to delete my profile.</p>
                </div>
              <div className="p-2 w-fit">
                {
                  loading ? (
                    <button disabled className="flex mx-auto uppercase transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[0.45rem]"
                        role="status"></div>
                      <span className="ml-3 text-lg">Loading...</span>
                    </button>

                  ) : (
                    <button onClick={(e) => deleteAccount(e)} className={`${agree ? 'dark:bg-red-500 bg-red-500' : "" } flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg`} disabled={!disableButton}>
                      Delete
                    </button>
                  )
                }
              </div>

            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Settings