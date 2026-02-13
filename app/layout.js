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
          <h1 className="font-bold tracking-wider text-xl italic">ABM</h1>
        <nav>
          <ul>
            <li> <a className="bg-emerald-500 hover:bg-emerald-700 text-white text-l font-bold py-2 px-4 rounded" href="#">Login</a></li>
          </ul>
        </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
