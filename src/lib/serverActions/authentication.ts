"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const authenticate = () => {
  const token = cookies().get("currentUser");
  let isAuthenticated = false;
  if (token && process.env.AUTH_SECRET) {
    try {
      let decodedToken = jwt.verify(
        token.value.split(" ")[1],
        process.env.AUTH_SECRET
      );
    } catch (error) {
      cookies().delete("currentUser");
    }
  }
};

export const logout = () => {};
