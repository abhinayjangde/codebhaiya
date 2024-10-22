"use client"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { useSession } from "next-auth/react"

const WriteBlog = () => {

  const { data: session } = useSession()
  const [blogForm, setBlogForm] = useState(
    {
      title: "",
      metades: "",
      content: "",
      tags: "",
      category: "",
      video: "null",
      image: "https://codebhaiya.s3.ap-south-1.amazonaws.com/blogs/default.jpg",
      author: session?.user?.fullname,
      userId: session?.user?._id
    }
  )

  useEffect(() => {
    document.title = "Write Blog - The right way to learn coding"
  }, [blogForm])

  const [loading, setLoading] = useState(false)
  const writeBlog = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      if (blogForm.title.length <= 0 || blogForm.content.length <= 0 || blogForm.metades.length <= 0) {
        toast("Please fill all the fileds.")
        setLoading(false)
      }
      else {
        const res = await axios.post("/api/blogs", blogForm)
        if (res.status == 201) {
          toast("Blog added successfully")
        }
        else {
          toast("Blog not added successfully")
        }
        setLoading(false)
      }
    } catch (error: any) {
      toast(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='dark:bg-dark py-5 bg-gray-50 p-4'>
      <ToastContainer position="bottom-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      <div className="max-w-screen-lg mx-auto bg-white dark:text-white dark:bg-black/[0.3]  rounded-lg shadow-md p-6 lg:p-10">
        <h1 className="text-center text-2xl md:text-3xl justify-center lg:text-4xl font-semibold text-gray-800 dark:text-white/[0.8] mb-2 flex border-b pb-2 uppercase">Write a Blog</h1>
        <form>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="title" className="text-sm dark:text-white text-gray-900">Title</label>
            <input
              value={blogForm.title}
              onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
              type="text"
              id="title"
              name="title"
              className="w-full dark:bg-dark text-black rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="metades" className="text-sm dark:text-white text-gray-900">Description</label>
            <textarea
              value={blogForm.metades}
              onChange={(e) => setBlogForm({ ...blogForm, metades: e.target.value })}
              id="metades"
              name="metades"
              className="w-full h-20 text-black dark:bg-dark rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="content" className="text-sm dark:text-white text-gray-900">Content (JSX)</label>
            <textarea
              value={blogForm.content}
              onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
              id="content"
              name="content"
              className="w-full h-80 text-black dark:bg-dark rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="image" className="text-sm dark:text-white text-gray-900">Image URL</label>
            <input
              value={blogForm.image}
              onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
              type="text"
              id="image"
              name="image"
              className="w-full text-black dark:bg-dark rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="tags" className="text-sm dark:text-white text-gray-900">Tags (Seperated by Space)</label>
            <input
              value={blogForm.tags}
              onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
              type="text"
              id="tags"
              name="tags"
              className="w-full text-black dark:bg-dark rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="category" className="text-sm dark:text-white text-gray-900">Category</label>
            <input
              value={blogForm.category}
              onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
              type="text"
              id="category"
              name="category"
              className="w-full text-black dark:bg-dark rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="flex flex-wrap gap-2 my-2">
            <label htmlFor="video" className="text-sm dark:text-white text-gray-900">Video URL</label>
            <input
              value={blogForm.video}
              onChange={(e) => setBlogForm({ ...blogForm, video: e.target.value })}
              type="text"
              id="video"
              name="video"
              className="w-full bg-white dark:bg-dark text-black rounded text-base outline-none dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
          </div>
          <div className="mt-10 flex justify-center items-center">
            {
              loading ? (
                <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Loading...
                </button>

              ) : (

                <button onClick={(e) => writeBlog(e)} type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-900 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Publish
                </button>
              )
            }
          </div>
        </form>

      </div>
    </div>









  )
}

export default WriteBlog