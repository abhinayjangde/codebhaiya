import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Buy Me a Coffee - Codebhaiya",
    description: "Support Us - The right way to learn coding",
  };
  
const layout = ({ children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
        {children}
    </>
  )
}

export default layout