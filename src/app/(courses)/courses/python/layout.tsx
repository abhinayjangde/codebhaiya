import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Python Course for Beginners",
  description:
    "Learn Python programming from the basics with a free beginner friendly video course, hands-on examples, and practical lessons.",
  alternates: { canonical: "/courses/python" },
};

export default function PythonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
