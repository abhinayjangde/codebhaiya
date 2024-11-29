import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Courses - The right way to learn coding",
  description: "Explore a selection of courses designed to help you enhance your skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
