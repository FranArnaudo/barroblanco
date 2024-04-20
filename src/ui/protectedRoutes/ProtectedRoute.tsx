"use client";
import { authenticate } from "@/lib/serverActions/authentication";
import { getCookie } from "cookies-next";
import jsonwebtoken from "jsonwebtoken";
import { useEffect } from "react";
type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useEffect(() => {
    authenticate();
  }, []);
  return children;
};

export default ProtectedRoute;
