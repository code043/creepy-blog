import type { Metadata } from "next";
import { Geist, Geist_Mono, Creepster, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { AuthProvider } from "./context/auth-content";

const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creepy",
  description: "Blog about mysteries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${creepster.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <body className={` antialiased min-h-full flex flex-col bg-black`}>
        <AuthProvider>
            <Navbar />
            {children}
            <section className="flex justify-center">
              <Footer />
            </section>
        </AuthProvider>
      </body>
    </html>
  );
}
