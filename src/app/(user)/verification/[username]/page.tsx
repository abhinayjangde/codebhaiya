"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Verification = ({ params }: any) => {
  const username = params.username.replace(/%20/g, " ")
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  // verify code
  const verifyCode = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (code === "") {
      toast("Please enter verification code");
      setLoading(false);
      return;
    }
    try {
      const data = await axios.post("/api/verify-code", { username, code })
      toast("Email verified successfully");
      setCode("")
      setTimeout(() => {
        router.push("/login");
        // router.push("/dashboard");
      }, 3000);
    } catch (error: any) {
      toast(error.message);
    }finally{
      setLoading(false);
    }

  }
  useEffect(() => {
    document.title = 'Verify Account - Connect with Us: Your Gateway to Support, Solutions, and Success!'
  }, [])

  return (
    <>
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

        <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
          <div className="max-w-screen-lg min-h-[45rem] mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">

          <h1 className="text-center text-2xl md:text-3xl justify-center lg:text-3xl font-semibold text-gray-800 dark:text-white mb-1 flex">VERIFY YOUR EMAIL</h1>
          <p className='text-center leading-relaxed text-base'>Connect with Us: Your Gateway to Support, Solutions, and Success!</p>

          <div className="lg:w-1/2 md:w-2/3 mx-auto mt-20">
            <div className="flex flex-wrap -m-2 justify-center items-center">

              <label htmlFor="code" className="leading-7 mb-4 mt-10 text-center  text-xl dark:text-white text-gray-600">
                Enter Verification Code
              </label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                id="code"
                name="code"
                className="w-full bg-transparent bg-opacity-50 dark:text-white rounded border border-gray-300 dark:focus:bg-gray-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />

              <div className="p-2 w-full">
                {
                  loading ? (
                    <button disabled className="flex mx-auto uppercase transition duration-150 ease-in-out disabled:opacity-70 text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      <div
                        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mt-[0.45rem]"
                        role="status"></div>
                      <span className="ml-3 text-lg">Loading...</span>
                    </button>

                  ) : (

                    <button onClick={(e) => verifyCode(e)} className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-8 focus:outline-none  rounded text-lg">
                      Verify
                    </button>
                  )
                }
              </div>

            </div>
          </div>
          
          </div>
        </div>
      </div>
    </>
  )
}

export default Verification