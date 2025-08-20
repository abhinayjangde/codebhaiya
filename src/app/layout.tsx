import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthProvider from "@/providers/AuthProvider"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "The right way to learn coding",
  description: "The right way to learn coding",
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <SpeedInsights />
            <Footer />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  )
}

export default RootLayout