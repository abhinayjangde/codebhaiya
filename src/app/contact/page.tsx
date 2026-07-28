"use client";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsDiscord } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isDisabled =
    !formData.name.trim() || !formData.email.trim() || !formData.message.trim();

  const handleSubmit = async () => {
    if (isDisabled) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      let response;
      try {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      } catch (networkError) {
        // This catches offline or DNS issues before a response is even received
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      }

      // Safely parse JSON if available, otherwise data is null
      let data = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error("Failed to parse JSON response:", jsonError);
        }
      }

      if (!response.ok) {
        // If the error is a structured validation error from Zod API
        if (data?.error && typeof data.error === "object") {
          // Extract the first validation message from the object
          const firstErrorMsg = Object.values<
            { _errors?: string[] } | string[]
          >(data.error as Record<string, any>)
            .flat()
            .find((msg) => typeof msg === "string");
          throw new Error(
            firstErrorMsg || "Validation failed. Please check your inputs."
          );
        }

        // If we got a 500 without JSON, or a generic string error
        throw new Error(
          (typeof data?.error === "string" ? data.error : undefined) ||
          `Server error (${response.status}). Please try again later.`
        );
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    {
      icon: FaSquareXTwitter,
      href: "https://www.twitter.com/AbhinayJangde",
    },
    {
      icon: FaSquareInstagram,
      href: "https://www.instagram.com/abhinayjangde",
    },
    { icon: FaGithub, href: "https://www.github.com/abhinayjangde" },
    { icon: FaYoutube, href: "https://www.youtube.com/@abhinayjangde" },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/abhinay-jangde-a195011b9/",
    },
    { icon: BsDiscord, href: "https://discord.gg/CxPBRSZut7" },
  ];

  return (
    <>
      <div className="min-h-screen pt-10 md:pt-24">
        <div className="sm:mt-20 max-w-7xl px-4 md:px-8 lg:px-12 xl:px-26 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg dark:bg-background dark:text-white">
          <div className="flex flex-col justify-center items-center">
            <div>
              <div className="flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
                <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase">
                  feel free to contact us
                </h2>
                <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">
                  https://abhinayjangde.dev
                </h6>
              </div>
              <Image
                alt="Abhinay Jangde - Contact"
                width={160}
                height={100}
                className="rounded-[50%] my-5 mx-auto py-2"
                src={"https://avatars.githubusercontent.com/u/64852930?v=4"}
              />
            </div>
          </div>
          {/* Social Media Icons  */}
          <div className="flex justify-center">
            {socials.map(({ icon: Icon, href }, index) => (
              <Link
                key={index}
                className="cursor-pointer mx-3 md:mx-6"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="text-3xl hover:animate-shake md:text-4xl" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* contact form section */}
      <section className="sm:h-200 text-gray-600 bg-gray-100 dark:text-white dark:bg-background body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
            <h2 className="sm:text-4xl text-2xl font-medium title-font uppercase">
              Contact Us
            </h2>
            <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">
              feel free to contact us :)
            </h6>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm dark:text-white text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none dark:text-white text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full text-center">
                {loading ? (
                  <button
                    disabled
                    className="inline-flex items-center text-white bg-gray-400 dark:bg-gray-700 rounded-full px-4 py-2 text-sm font-semibold mr-2 my-2 cursor-not-allowed opacity-75"
                  >
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    SENDING...
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className={`inline-flex items-center text-white rounded-full px-4 py-2 text-sm font-semibold mr-2 my-2 transition-colors ${isDisabled
                      ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-50"
                      : "bg-gray-600 dark:bg-black cursor-pointer hover:bg-black dark:hover:bg-gray-800"
                      }`}
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <p className="bg-blue-400/30 p-2" >email us - codebhaiya@gmail.com</p>
      </div>
    </>
  );
};

export default Contact;
