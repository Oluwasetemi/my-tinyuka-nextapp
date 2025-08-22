import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tinyuka AltSchool",
  description: "Teaching NextJS to Tinyuka AltSchool Students",
  icons: {
    icon: "https://fav.farm/💩",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex gap-4 items-center justify-between p-4">
          <h1 className="text-4xl font-bold">Tinyuka AltSchool</h1>
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/todos">Todos</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
