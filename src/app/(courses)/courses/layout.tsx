import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Programming Courses",
  description:
    "Explore free programming courses from CodeBhaiya, including Python, web development, and DevOps lessons for beginners.",
  alternates: { canonical: "/courses" },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
