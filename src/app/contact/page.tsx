"use client";
import { useState } from "react";
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
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Failed to send message",
      });
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
      <section className="sm:h-200 text-gray-600 dark:text-white dark:bg-dark body-font relative">
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
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-dark focus:border-indigo-500 focus:bg-white focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    className="w-full bg-transparent bg-opacity-50 rounded border border-gray-300 dark:focus:bg-dark focus:border-indigo-500 focus:bg-white focus:ring-2 dark:text-white focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    className="w-full bg-transparent rounded border border-gray-300 focus:border-indigo-500 dark:focus:bg-dark focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none dark:text-white text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full text-center">
                {status.message && (
                  <div
                    className={`mb-4 p-2 rounded ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                {loading ? (
                  <h2>LOADING...</h2>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="dark:text-white border border-white px-2 py-1 hover:bg-white hover:text-black transition-colors"
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
