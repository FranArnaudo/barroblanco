import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import ToastProvider from "@/providers/ToastProvider";
import ProtectedRoute from "@/ui/protectedRoutes/ProtectedRoute";
import { AuthStoreProvider } from "@/providers/AuthStoreProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

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
    <html lang="en">
      <body
        className={`${montserrat.className} h-full w-full bg-primary-light flex text-black`}
      >
        <AuthStoreProvider>
          <Sidebar />
          <ToastProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </ToastProvider>
        </AuthStoreProvider>
      </body>
    </html>
  );
}
