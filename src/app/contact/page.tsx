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
import { BackgroundLines } from "@/components/ui/background-lines";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);
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
    <BackgroundLines className="min-h-screen pt-10 md:pt-24">
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
              alt="contact"
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
    </BackgroundLines>
  );
};

export default Contact;
