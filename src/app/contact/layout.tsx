import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CodeBhaiya",
  description:
    "Get in touch with CodeBhaiya about coding courses, tutorials, collaborations, or support.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
