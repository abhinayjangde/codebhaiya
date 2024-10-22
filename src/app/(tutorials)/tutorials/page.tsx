"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Tutorials = () => {

    useEffect(()=>{
        document.title = "Tutorials - The right way to learn coding"
    },[])
    return (
        <>
            <section className="text-gray-600 body-font md:h-[48rem] dark:bg-dark dark:text-slate-200">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="text-2xl md:text-4xl font-medium title-font mb-4 dark:text-slate-200 text-gray-900 tracking-widest">
                            OUR TUTORIALS
                        </h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Master Coding with Ease- Dive into Expert-Led Tutorials on GenAI, Python, JavaScript, and More!
                        </p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div onClick={()=> toast("Coming Soon!")} className="cursor-pointer p-4 lg:w-1/3 dark:hover:bg-slate-900 hover:bg-slate-100">
                            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                <Link href={"/tutorials/genai"} title="Click to read more" className="flex-shrink-0 rounded-lg w-24 h-24 object-cover object-center sm:mb-0 mb-4">
                                    <Image
                                        alt="python"
                                        src="https://codebhaiya.s3.ap-south-1.amazonaws.com/tutorials/genai.webp"
                                        width={256}
                                        height={256}
                                    />
                                </Link>
                                <div className="flex-grow sm:pl-8">
                                    <h2 className="title-font font-medium text-lg text-gray-900 dark:text-slate-200">
                                        Generative AI
                                    </h2>
                                    <h3 className="text-gray-500 dark:text-slate-300 mb-3">Written by Abhinay Jangde</h3>
                                    <p className="mb-4">
                                        Generative AI is AI that creates new content like images or text on its own using patterns it learns from existing data.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div onClick={()=> toast("Coming Soon!")} className="cursor-pointer p-4 lg:w-1/3 dark:hover:bg-slate-900 hover:bg-slate-100">
                            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                <Link href={"/tutorials/python"} title="Click to read more" className="flex-shrink-0 rounded-lg w-24 h-24 object-cover object-center sm:mb-0 mb-4">
                                    <Image
                                        alt="python"
                                        src="https://codebhaiya.s3.ap-south-1.amazonaws.com/tutorials/python.webp"
                                        width={256}
                                        height={256}
                                    />
                                </Link>
                                <div className="flex-grow sm:pl-8">
                                    <h2 className="title-font font-medium text-lg text-gray-900 dark:text-slate-200">
                                        Python
                                    </h2>
                                    <h3 className="text-gray-500 dark:text-slate-300 mb-3">Written by Abhinay Jangde</h3>
                                    <p className="mb-4">
                                        Python is a high-level, easy-to-read programming language used for web development, data analysis, and AI.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div onClick={()=> toast("Coming Soon!")} className="cursor-pointer p-4 lg:w-1/3 dark:hover:bg-slate-900 hover:bg-slate-100">
                            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                <Link href={"/tutorials/javascript"} title="Click to read more" className="flex-shrink-0 rounded-lg w-24 h-24 object-cover object-center sm:mb-0 mb-4">
                                    <Image
                                        alt="python"
                                        src="https://codebhaiya.s3.ap-south-1.amazonaws.com/tutorials/js.webp"
                                        width={256}
                                        height={256}
                                    />
                                </Link>
                                <div className="flex-grow sm:pl-8">
                                    <h2 className="title-font font-medium text-lg text-gray-900 dark:text-slate-200">
                                        JavaScript
                                    </h2>
                                    <h3 className="text-gray-500 dark:text-slate-300 mb-3">Written by Abhinay Jangde</h3>
                                    <p className="mb-4">
                                        JavaScript is a high-level programming language used to create interactive and dynamic web content.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Tutorials


