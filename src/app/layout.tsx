import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "The right way to learn coding",
  description: "The right way to learn coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
