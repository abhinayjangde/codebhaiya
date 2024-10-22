import Image from 'next/image'

const WhoAmI: React.FC = () => {
  return (
    <div id='whoami' className='dark:bg-dark bg-white  dark:bg-grid-white/[0.1] bg-grid-black/[0.1]'>
      <div className="container mx-auto px-5 py-16 md:px-8 ">
        <div>
          <p className="z-50 mb-5 text-center uppercase tracking-wider text-2xl sm:text-4xl font-semibold dark:text-white text-gray-800">
            WHOAMI
          </p>
          
          <div className="mx-auto flex flex-col-reverse items-center justify-center gap-10 md:w-10/12 lg:flex-row">
            <div className="flex-1 md:p-5">
              <p className="mb-4 text-center leading-[1.5] text-black dark:text-gray-300 md:text-left md:text-xl">
                Hi👋, I&apos;m Abhinay - a <span className='text-blue-700'>passionate Full Stack Developer</span>, educator, and content creator based in Chhattisgarh, India. With a background in Computer Science Engineering, I thrive on the dynamic intersection of coding, technology, and education.
              </p>
              <p className="mb-4 text-center leading-[1.5] text-black dark:text-gray-300 md:text-left md:text-xl">
                💻As a Full Stack Developer, I specialize in a diverse range of technologies, including JavaScript, HTML, CSS, and frameworks like Express.js and React.js. My expertise extends to backend technologies like Node.js, as well as database management systems such as MongoDB, MySQL, and PostgreSQL. Whether it&apos;s crafting responsive web interfaces or architecting robust backend systems, I love diving deep into every layer of the development stack.
              </p>
              <p className="mb-4 text-center leading-[1.5] text-black dark:text-gray-300 md:text-left md:text-xl">
                🎓Beyond coding, I&apos;m deeply passionate about sharing knowledge and empowering others to embark on their coding journey.Through my YouTube channel, &quot;Abhinay Jangde,&quot; I offer tutorials, walkthroughs, and courses on a wide array of topics, from beginner-friendly introductions to advanced techniques in programming and web development.
              </p>
              <p className="mb-4 text-center leading-[1.5] text-red-700 dark:text-green-700 md:text-left md:text-xl">
                🚀Let&apos;s code, learn, and grow together!
              </p>
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