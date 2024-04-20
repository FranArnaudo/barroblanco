"use server";

import { cookies } from "next/headers";

export const setCurrentUserCookies = (token: string) => {
  cookies().set("currentUser", token);
};
