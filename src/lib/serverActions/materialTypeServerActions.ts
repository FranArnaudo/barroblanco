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

// Fetch

type FetchMaterialTypeArgs = {
  name: string;
  page: string;
  take: string;
};
type MaterialTypeQuery = {
  name?: { $regex: string; $options: string };
};
export const fetchTypesPaginated = async ({
  name,
  page = "1",
  take = "10",
}: FetchMaterialTypeArgs) => {
  const client = await clientPromise;
  await client.connect();
  let query: MaterialTypeQuery = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  const totalDocuments = await client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / Number(take));
  const skip = (Number(page) - 1) * Number(take);
  const data = await client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .find(query, { projection: { _id: 0 } })
    .limit(Number(take))
    .skip(skip)
    .toArray();
  return {
    totalPages,
    data,
  };
};
export const fetchAllTypes = async (): Promise<MaterialType[]> => {
  const client = await clientPromise;
  await client.connect();
  const data = await client
    .db(process.env.DATABASE_NAME)
    .collection<MaterialType>("materialTypes")
    .find({}, { projection: { _id: 0 } })
    .toArray();
  return data;
};

export const fetchTypeById = async (id: string): Promise<MaterialType> => {
  const client = await clientPromise;
  await client.connect();
  return (await client
    .db(process.env.DATABASE_NAME)
    .collection<MaterialType>("materialTypes")
    .findOne({ id }, { projection: { _id: 0 } })) as MaterialType;
};
