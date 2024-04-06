"use client";

import "react-toastify/dist/ReactToastify.css";
import "../../app/globals.css";
import { ToastContainer } from "react-toastify";
import { Montserrat } from "next/font/google";

interface ToastProviderProps {
  children: React.ReactNode;
}
const montserrat = Montserrat({ subsets: ["latin"] });
export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer bodyStyle={montserrat.style} />
    </>
  );
}
