import "./globals.css"
import type { Metadata } from "next"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthProvider from "@/providers/AuthProvider"
import ThemeProvider from "@/providers/ThemeProvider"

export const metadata: Metadata = {
  title: "The right way to learn coding",
  description: "The right way to learn coding",
}

const RootLayout = ({children}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <AuthProvider>
        <ThemeProvider>
          <body className="">
            <Navbar />
            {children}
            <Footer />
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  )
}

export default RootLayout