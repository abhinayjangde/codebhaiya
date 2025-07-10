import Image from "next/image"
import Link from "next/link"

const Courses:React.FC = () => {
  const courses = [
    {
      title: "Deployment, Hosting & DevOps",
      description: "Deployment is transferring software to a live environment; hosting provides the infrastructure to run applications; and DevOps combines development and operations practices to enhance deployment ...",
      imageUrl: "https://i.ytimg.com/vi/LOAwc5XDxzg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBMSnsL3a3g3uKUPcPfsgVuHepULg",
      link: "/devops",
      buttonText: "Start Watching",
      buttonColor: "bg-blue-700",
    },
    {
      title: "Python Course for Beginners",
      description: "Python stands out as one of the most sought-after programming languages in today's job market. Let's embark on this exciting journey together as we unravel the fascinating world of Python programming!",
      imageUrl: "https://i.ytimg.com/vi/9ebZqJOAtzk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBy-hFiXOYa78FOnMbdEdxk2_z9FA",
      link: "/python",
      buttonText: "Start Watching",
      buttonColor: "bg-blue-700",
    },
    {
      title: "Matrix Web Dev Course",
      description: "This is one of my favorite courses. In this series, you'll learn about HTML, CSS, JavaScript, and everything needed to be a job-ready web developer. Just hop on, man.",
      imageUrl: "https://codebhaiya.s3.ap-south-1.amazonaws.com/courses/matrix.jpg",
      link: "/matrix",
      buttonText: "Coming Soon ...",
      buttonColor: "bg-green-700",
    },
  ]
  return (
    <div className="h-full md:h-full w-full dark:bg-dark bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] flex items-center justify-center py-10">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_100%,black)]"></div>

      <div className="container mx-auto md:my-14 my-10">
        <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
          <h2 className="sm:text-4xl text-xl font-medium title-font uppercase">
            Recommended Courses
          </h2>
          <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">explore a selection of courses designed to help you enhance your skills.</h6>
        </div>
        <div className="flex flex-wrap md:justify-center justify-between">
          {
            courses.map((course, index) => (
              <div key={index} className="md:p-4 md:w-1/3 flex justify-center my-2">
                <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg dark:bg-black/[0.5] bg-white/[0.8]">
                  <Image
                    className="object-contain w-full object-center"
                    src={course.imageUrl}
                    width={384}
                    height={216}
                    alt="Image"
                  />
                  <div className="px-6 md:my-11 lg:my-0 md:h-72 lg:h-64 lg:py-4 xl:h-52">
                    <span className="tracking-widest text-xs title-font font-medium mb-1 dark:text-gray-400">
                      FREE COURSE
                    </span>
                    <div className="title-font flex text-lg font-medium text-black mb-3 dark:text-white">
                      {course.title}
                    </div>
                    <p className="text-black text-base dark:text-gray-400">
                      {course.description}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <Link href={course.link} target="">
                      <span className={`inline-block text-white ${course.buttonColor} rounded-full px-3 py-2 text-sm font-semibold mr-2 my-2 cursor-pointer hover:bg-blue-600`}>
                        {course.buttonText}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
         
        </div>
      </div>
    </div>
  )
}

export default Courses
