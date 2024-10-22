"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ApiResponse } from "@/types/ApiResponse";
import Spinner from "@/components/Spinner";

const SignUp = () => {
  const { data: session } = useSession()
  const router = useRouter();

  if (session) {
    router.push(`/u/@${session.user?.username || session.user.email?.split('@')[0]}`)
  }
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  function isValidEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  // Sign Up
  const signUp = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(!isValidEmail(formData.email)) {
        toast("Please provide email in valid formate")
        setLoading(false);
        return;
      }
      const res = await axios.post("/api/signup", formData);
      toast("User registered successfully. Please verify your email.");
      setFormData({ username: "", email: "", password: "" });
      setTimeout(() => {
        router.push(`/verification/${formData.username}`);
      }, 3000);
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      if (error.response.data.success === false) {
        return toast(error.response.data.message);
      }
      toast(error.message);

    }
  };

  useEffect(() => {
    document.title = "Singup - The right way to learn coding.";
    if (
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);


  // Checking Username
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (formData.username) {
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response = await axios.get(`/api/check-unique-username?username=${formData.username}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message || "Error checking username")
        }
        finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [formData.username])


  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark"/>
      <div className='dark:bg-dark py-5 bg-gray-50 md:p-4'>
        <div className="max-w-screen-lg md:h-[53rem] h-[40rem] mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">



          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 dark:text-white text-gray-900">
              SIGNUP
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Connect with Us: Your Gateway to Support, Solutions, and Success!
            </p>
          </div>

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">

              <div className="flex flex-col w-full">
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <div className="flex mt-2 items-center">

                    {isCheckingUsername && (<Spinner />)}
                    <p className={`text-sm ${usernameMessage === "Username is available" ? 'text-green-500' : 'text-red-500'}`}>{usernameMessage}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="dark:text-white leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })}
                    className="w-full dark:bg-transparent dark:text-white bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="dark:text-white leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value.trim() })
                    }
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
                        <span className="ml-2 ">Loading...</span>
                      </button>
                    ) : (

                      <button
                        onClick={(e) => signUp(e)}
                        disabled={buttonDisabled}
                        className="flex mx-auto text-black dark:text-white border dark:border-white border-black py-2 px-4 focus:outline-none rounded"
                      >
                          Signup
                      </button>
                    )
                  }
                </div>
                <Link href={"/login"} className="text-lg text-center dark:text-white text-black mt-3">
                  Hava an account, <span className="text-blue-600">Login</span>
                </Link>
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
      </div>
    </div>
  );
};

export default SignUp;
