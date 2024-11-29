import Link from 'next/link'
const Footer: React.FC = () => {
  return (
    <footer className="px-2 py-2 dark:border-none h-fit dark:bg-dark dark:text-white w-full">

      <div className="flex justify-between">
        <div>
        <div className="flex flex-col">
          <p> &copy; 2024 <span className="dark:text-white text-black ">CodeBhaiya™</span> | All rights reserved. </p>
        </div>
        <div className="flex flex-wrap md:flex-row gap-2 pb-1">
          <Link href="/terms" className=" hover:text-blue-600 underline">Terms of Services</Link>
          <Link href="/privacy" className=" hover:text-blue-600 underline">Privacy Policy</Link>
          <Link href="/refund" className=" hover:text-blue-600 underline">Refund Policy</Link>
          {/* <Link href="/support" className=" hover:text-blue-600 underline">Support Us</Link> */}

        </div>
        </div>
        <div className="hidden md:flex md:items-center">
          <p className="">Happy Coding :)</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer