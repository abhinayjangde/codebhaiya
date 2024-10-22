import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center border dark:border-none h-[8rem] dark:bg-dark dark:text-white w-full sm:px-10 pb-10 pt-10 md:pb-4">
      <div className="flex flex-wrap justify-center items-center md:flex-row gap-2">

        <Link href="/terms" className="hover:text-blue-600">Terms of Services |</Link>
        <Link href="/privacy" className="hover:text-blue-600">Privacy Policy |</Link>
        <Link href="/refund" className="hover:text-blue-600">Refund Policy |</Link>
        <Link href="/support" className="hover:text-blue-600">Support Us</Link>

      </div>

      <p>&copy; 2024 <span className="dark:text-white text-black">CodeBhaiya™</span> | All Rights Reserved. </p>
      <div className="flex gap-2 justify-center items-center">
        <p className="">Happy Coding</p>
        <p className="pt-1">🥳</p>
        <p className="text-blue-500 tracking-normal">#RightWayToLearnCoding</p>

      </div>
    </footer>
  )
}

export default Footer