"use server";

import { revalidatePath } from "next/cache";
import { MaterialType } from "../../../types";
import clientPromise from "../mongodb";
import { uuid } from "uuidv4";

export const createMaterialType = async (data: Omit<MaterialType, "id">) => {
  const client = await clientPromise;
  client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .insertOne({
      ...data,
      id: uuid(),
      createdAt: new Date(),
      lastUpdated: new Date(),
    });
  revalidatePath("/tipos");
};
export const updateMaterialType = async (data: Partial<MaterialType>) => {
  const client = await clientPromise;
  const response = await client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          name: data.name,
          description: data.description,
          lastUpdated: new Date(),
        },
      }
    );
  revalidatePath("/materiales");
};
export const deleteMaterialType = async (id: string) => {
  const client = await clientPromise;
  const response = await client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .findOneAndDelete({ id });
  revalidatePath("/tipos");
};
