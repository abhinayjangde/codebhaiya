import Image from 'next/image'
import Link from 'next/link'
import { FaDiscord } from "react-icons/fa";
const WhoAmI: React.FC = () => {
  return (
    <div className='dark:bg-dark bg-white'>
      <div className="container mx-auto px-5 py-16 md:px-8 ">
        <div>
          <div className="my-4 md:my-10 flex flex-col md:gap-2 items-center justify-center text-black dark:text-white">
            <h4 className="sm:text-4xl text-2xl font-medium title-font uppercase">
              Who am I
            </h4>
            <h6 className="font-semibold text-sm md:text-lg text-center opacity-75">codebhaiya.com/abhinayjangde</h6>
          </div>
        

          <div className="mx-auto flex flex-col-reverse items-center justify-center gap-10 md:w-10/12 lg:flex-row">
            <div className="flex-1 md:p-5">
              <p className="text-3xl md:text-5xl font-semibold">Yes, I&apos;m a <span className="text-blue-700">Software Engineer.</span></p>
              <p className="my-4 md:text-lg">Hi👋, I&apos;m Abhinay - a passionate Full Stack Developer, educator, and content creator. I thrive on the dynamic intersection of coding, technology, and education.</p>
              <p className="my-4 md:text-lg">In my free time I love watching movies.</p>
              {/* TODO : process.env.DISCORD_SERVER! */}
              <Link href={"/"} target="_blank" className="flex gap-2 px-2 py-1 items-center border bg-gray-100 hover:bg-[#cdd1ff] dark:bg-[#5865F2]  dark:hover:bg-[#4a56da] w-fit rounded-md" >
                <FaDiscord className='text-3xl' />
                <span className="font-semibold">Join Discord</span>
              </Link>

            </div>
            <div className="flex flex-[0.7] items-center justify-center md:p-5">
              <div className="flex items-center justify-center">
                <Image
                  src="https://codebhaiya.s3.ap-south-1.amazonaws.com/images/contact.jpg"
                  alt="abhinay"
                  loading="lazy"
                  width={950}
                  height={950}
                  decoding="async"
                  data-nimg={1}
                  className="sm:w-[100%] w-[80%] rounded-full border border-gray-400 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhoAmI