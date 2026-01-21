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
    default: "CodeBhaiya - The right way to learn coding",
    template: "%s | CodeBhaiya",
  },
  description:
    "CodeBhaiya is the right way to learn coding. We provide comprehensive courses, tutorials, and mentorship to help you master programming and build your career.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "CodeBhaiya - The right way to learn coding",
    description:
      "CodeBhaiya is the right way to learn coding. We provide comprehensive courses, tutorials, and mentorship to help you master programming and build your career.",
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBhaiya - The right way to learn coding",
    description:
      "CodeBhaiya is the right way to learn coding. We provide comprehensive courses, tutorials, and mentorship to help you master programming and build your career.",
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
