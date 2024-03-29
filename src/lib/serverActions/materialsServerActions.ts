"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "../mongodb";

export const createMaterial = async (data: any) => {
  const client = await clientPromise;
  client
    .db("test")
    .collection("materials")
    .insertOne({
      ...data,
      createdAt: new Date(),
      lastUpdated: new Date(),
    });
  revalidatePath("/materials");
};
