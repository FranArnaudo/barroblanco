import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barro Blanco - Dashboard",
  description: "Barro Blanco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${inter.className} h-full w-full bg-slate-200 flex text-black`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
