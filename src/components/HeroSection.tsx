"use client"
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";

const HeroSection: React.FC = () => {
  return (
    <>
      <div>
        <LampContainer>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-slate-300 to-slate-50 bg-clip-text text-center font-medium tracking-tight text-transparent"
          >
            <h2 className='text-4xl md:text-5xl'>CODEBHAIYA</h2>
            <p className='text-xl text-gray-300'>
              the right way to learn coding
            </p>
          

          </motion.div>
        </LampContainer>
      </div>

    </>
  )
}

export default HeroSection