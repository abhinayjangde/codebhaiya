import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found - CodeBhaiya",
};

const NotFound: React.FC = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{
        backgroundImage: "url('/images/404.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-col justify-center gap-3 items-start border border-gray-800 backdrop-blur-md bg-blue-400/70 px-5 py-5 sm:px-9 sm:py-6 rounded-md w-full max-w-md sm:max-w-lg"
        style={{
          backgroundImage: "url('/images/404.png')",
          backgroundSize: "initial",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl sm:text-4xl font-bold">
          <span className="text-gray-400 mr-2">404</span>
          <span className="text-white/90">Not Found</span>
        </h2>
        <p className="text-lg sm:text-2xl text-white">
          This dimension doesn&apos;t exist...
        </p>
        <p className="text-sm sm:text-base text-white">
          We couldn&apos;t find a page at the URL you&apos;re on. You can try{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-400 underline"
          >
            logging in
          </Link>{" "}
          or going back to the{" "}
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-400 underline"
          >
            homepage.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
