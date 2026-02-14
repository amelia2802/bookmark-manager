import LoginPage from "./components/LoginPage";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookmark Manager |Abstrabit: Micro-Challenge",
  description: "A Simple Bookmark Manager App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex justify-between p-4 bg-[#168695] text-white items-center">
          <h1 className="font-bold tracking-wide text-xl italic"><Link href="/">Abstrabit Bookmark Manager</Link></h1>
        <nav>
          <ul>
            <li> <LoginPage className="bg-emerald-500 hover:bg-emerald-700 text-white text-l font-bold py-2 px-4 rounded" href="#">Login</LoginPage></li>
          </ul>
        </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
