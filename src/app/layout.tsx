import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import "@/styles/code-highlight.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codebhaiya.com"),
  title: {
    default: "Learn Coding with Free Courses and Tutorials | CodeBhaiya",
    template: "%s | CodeBhaiya",
  },
  description:
    "Learn programming with free coding courses, practical tutorials, and developer guides from CodeBhaiya. Start with Python, web development, and DevOps.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Learn Coding with Free Courses and Tutorials | CodeBhaiya",
    description:
      "Learn programming with free coding courses, practical tutorials, and developer guides from CodeBhaiya. Start with Python, web development, and DevOps.",
    url: "https://www.codebhaiya.com",
    siteName: "CodeBhaiya",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "CodeBhaiya Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Coding with Free Courses and Tutorials | CodeBhaiya",
    description:
      "Learn programming with free coding courses, practical tutorials, and developer guides from CodeBhaiya. Start with Python, web development, and DevOps.",
    images: ["/images/logo.png"],
    creator: "@AbhinayJangde",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
