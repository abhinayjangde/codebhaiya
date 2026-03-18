"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

const DevOpsCourse = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("DevOps-Course-In-Hindi");

  // Send alert for course
  const sendAlertForCourse = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = {
        email: email,
        courseName: course,
      };
      if (email.length <= 0 || email === "") {
        toast("Please enter your email.");
        setLoading(false);
      } else {
        const res = await fetch("/api/coursealert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast.success("Message sent successfully");
        setEmail("");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full dark:bg-background bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] pb-10">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white mask-[radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

        {/* Top Course Thumbnail */}
        <div className="pt-10 sm:pt-28 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-10 px-4 sm:px-6">
          <div className="flex flex-col justify-center items-start gap-4 w-full lg:w-160 dark:text-white">
            <p className="text-sm sm:text-xl text-white dark:bg-gray-800 rounded-full bg-gray-800 px-3 sm:px-4 py-2 w-fit uppercase">
              Master Infrastructure & Automation 🚀
            </p>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold uppercase">
              Mastering DevOps
            </h2>
            <p className="text-base sm:text-lg lg:text-xl px-1 bg-white dark:bg-background">
              {`Embark on a transformative journey into the world of DevOps. Whether you're a beginner or looking to enhance your skills, this course covers everything you need to become a proficient DevOps Engineer. Learn how to automate, deploy, and scale applications using modern tools and practices.`}
            </p>

            <div className="mt-6 sm:mt-10 w-full">
              <p className="my-4 text-lg sm:text-xl">
                Enter email to get alert when course is ready.
              </p>
              <form className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <input
                  className="bg-transparent w-full sm:w-80 lg:w-96 border-black dark:text-white dark:border-white px-3 py-2 border rounded-md"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email"
                />
                {loading ? (
                  <button
                    type="button"
                    className="dark:text-white text-black px-4 py-2 border dark:border-white border-black rounded-md uppercase transition duration-150 ease-in-out disabled:opacity-70 whitespace-nowrap"
                    disabled
                  >
                    <div
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                    <span className="ml-2">Loading...</span>
                  </button>
                ) : (
                  <button
                    onClick={(e) => sendAlertForCourse(e)}
                    className="bg-transparent dark:text-white dark:border-white border-black text-black px-4 py-2 border rounded-md whitespace-nowrap"
                  >
                    SUBMIT
                  </button>
                )}
              </form>
            </div>
          </div>

          <div className="w-full sm:w-auto p-4 flex justify-center">
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-lg dark:bg-black/50 bg-white/80 z-10">
              <Image
                className="object-cover w-full object-center h-48"
                src="https://i.ytimg.com/vi/LOAwc5XDxzg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBMSnsL3a3g3uKUPcPfsgVuHepULg"
                width={384}
                height={216}
                alt="DevOps Course Thumbnail"
              />
              <div className="px-4 sm:px-6 py-4">
                <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                  FREE COURSE
                </span>
                <div className="title-font flex text-lg font-medium uppercase text-black mb-3 dark:text-white">
                  DevOps Course
                </div>
                <p className="text-black text-sm sm:text-base dark:text-gray-400">
                  {`In this series, you'll learn about Linux Basics, Networking, Git & GitHub, Docker, Kubernetes, CI/CD, Terraform, AWS, Monitoring, and everything needed to be a job-ready DevOps Engineer.`}
                </p>
              </div>
              <div className="px-4 sm:px-6 pt-2 pb-4">
                <Link href={"/devops"}>
                  <span className="inline-block text-white bg-green-700 rounded-full px-3 py-2 text-sm font-semibold cursor-pointer hover:text-black hover:bg-yellow-300 transition-colors">
                    Coming Soon ...
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Know Your Curriculum */}
      <div className="w-full pb-10 dark:bg-background bg-white z-10 relative">
        <div className="flex items-center justify-center gap-4 py-6 sm:py-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl uppercase font-semibold inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>Curriculum</span>
          </h1>
        </div>
        <div className="px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="bg-slate-100 dark:bg-black/70 rounded-lg p-4 sm:p-6">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Introduction to DevOps</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2">
                      <li>- What is DevOps?</li>
                      <li>- Why DevOps?</li>
                      <li>- SDLC & Agile Methodology</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Linux & Networking</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2">
                      <li>- Linux File System</li>
                      <li>- Basic Commands & Package Management</li>
                      <li>- User Management & Permissions</li>
                      <li>- Networking Basics (IP, DNS, Ports, Firewalls)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Git & GitHub</AccordionTrigger>
                  <AccordionContent>Coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Containerization (Docker)</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2">
                      <li>- What is Docker & Containers?</li>
                      <li>- Docker Architecture</li>
                      <li>- Dockerfile & Image Creation</li>
                      <li>- Docker Compose</li>
                      <li>- Docker Volumes & Networking</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Container Orchestration (Kubernetes)
                  </AccordionTrigger>
                  <AccordionContent>Coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    CI/CD (GitHub Actions / Jenkins)
                  </AccordionTrigger>
                  <AccordionContent>Coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    Infrastructure as Code (Terraform)
                  </AccordionTrigger>
                  <AccordionContent>Coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>Cloud Computing (AWS)</AccordionTrigger>
                  <AccordionContent>Coming soon...</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>Monitoring & Logging</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2">
                      <li>- Prometheus</li>
                      <li>- Grafana</li>
                      <li>- ELK Stack</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>Projects</AccordionTrigger>
                  <AccordionContent>
                    <ul className="ml-2">
                      <li>- End-to-End CI/CD Pipeline for a Web App</li>
                      <li>- Automated Infrastructure Provisioning on AWS</li>
                      <li>- Microservices Deployment with Kubernetes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="w-full pb-10 dark:bg-background bg-white z-10 relative">
        <div className="flex items-center justify-center gap-4 py-6 sm:py-10 px-4">
          <h1 className="text-xl sm:text-2xl md:text-4xl uppercase font-semibold text-center inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>Frequently Asked Questions</span>
          </h1>
        </div>
        <div className="px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="bg-slate-100 dark:bg-black/70 rounded-lg p-4 sm:p-6">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    I don&apos;t know anything about DevOps, is this batch good
                    for me?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, this course will cover all important concepts from
                    basic till advanced. So, there is no need to know anything
                    about DevOps beforehand. A basic understanding of computers
                    is enough.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Do I need to be a programmer to learn DevOps?
                  </AccordionTrigger>
                  <AccordionContent>
                    While some scripting knowledge (like Python or Bash) is
                    helpful, you don&apos;t need to be a full-time software
                    developer. We will cover the necessary scripting skills
                    during the course.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How will I ask my doubts?</AccordionTrigger>
                  <AccordionContent>
                    There will be a dedicated community where you can resolve
                    your individual doubts and collaborate with peers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Is the batch in Hindi or English?
                  </AccordionTrigger>
                  <AccordionContent>
                    The batch is taught in Hinglish (a mix of Hindi & English).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevOpsCourse;
