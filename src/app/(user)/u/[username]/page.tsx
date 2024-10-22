'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Me = () => {

  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const { data: session } = useSession()
  const [user, setUser] = React.useState<any>([])
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`/api/u/${session?.user.email}`)
      setUser(res.data.data)
    } catch (error: any) {
    }
  }
  useEffect(() => {
    document.title = 'My Profile - The right way to learn coding'
    if (!session) {
      router.push('/login')
      return
    }
    fetchUserDetails()
  }, [session, router])

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const updateProfile = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.put(`/api/u/${session?.user.email}`, {
        fullname: user.fullname,
        username: user.username,
        avatar: user.avatar,
        phone: user.phone,
        dob: user.dob
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
    }
  }

  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
        <div className="max-w-screen-lg min-h-screen mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">

          <h1 className="sm:text-3xl border-b pb-2 text-2xl font-medium title-font text-center dark:text-white text-gray-900">
            MY PROFILE
          </h1>

          <div className="lg:w-1/2 md:w-2/3 mx-auto mt-10">
            <form className="flex flex-col -m-2" encType='multipart/form-data'>
              <div className="">
                <label htmlFor="fullname" className="leading-7 text-sm dark:text-white text-gray-600">
                  Full Name
                </label>
                <input
                  value={user.fullname ? user.fullname : ''}
                  onChange={handleChange}
                  type="text"
                  id="fullname"
                  name="fullname"
                  className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none dark:text-white text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="">
                <label htmlFor="username" className="leading-7 text-sm dark:text-white text-gray-600">
                  Username
                </label>
                <input
                  value={user.username ? user.username : ''}
                  onChange={handleChange}
                  disabled
                  type="text"
                  id="username"
                  name="username"
                  className="w-full bg-transparent dark:disabled:text-gray-400 disabled:text-gray-400 bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none dark:text-white text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="">
                <label htmlFor="email" className="leading-7 text-sm dark:text-white text-gray-600">
                  Email
                </label>
                <input
                  value={user.email ? user.email : ''}
                  disabled
                  type="email"
                  id="email"
                  name="email"
                  className="w-full dark:disabled:text-gray-400 disabled:text-gray-400 bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="">
                <label htmlFor="dob" className="leading-7 text-sm dark:text-white text-gray-600">
                  Date of Birth
                </label>
                <input
                  value={user.dob ? user.dob : ''}
                  onChange={handleChange}
                  type="text"
                  id="dob"
                  name="dob"
                  placeholder='DD/MM/YYYY'
                  className="w-full dark:text-white bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="">
                <label htmlFor="avatar" className="leading-7 text-sm dark:text-white text-gray-600">
                  Avatar
                </label>
                <input
                  value={user.avatar ? user.avatar : ''}
                  onChange={handleChange}
                  type="text"
                  id="avatar"
                  name="avatar"
                  className="w-full dark:text-white bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
          

              <div className="">
                <label htmlFor="phone" className="leading-7 text-sm dark:text-white text-gray-600">
                  Phone
                </label>
                <div className='flex flex-row gap-1'>
                  <input
                    value={user.phone ? user.phone : ''}
                    onChange={handleChange}
                    type="text"
                    id="phone"
                    name="phone"
                    className="w-full dark:text-white dark:disabled:text-gray-400 disabled:text-gray-400 bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>



              <div className="p-2 mt-4 w-full">
                {
                  loading ? (
                    <button disabled className="flex mx-auto transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none rounded">
                      <div
                        className="mt-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"></div>
                      <span className="ml-3">Loading...</span>
                    </button>

                  ) : (

                    <button onClick={(e) => updateProfile(e)} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none rounded">
                      Update
                    </button>
                  )
                }
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Me