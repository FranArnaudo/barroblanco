"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "../mongodb";
import { CalculationRow, CalculationSummary, Material } from "../../../types";
import jwt from "jsonwebtoken";
import { uuid } from "uuidv4";
import { cookies } from "next/headers";
import { authenticate } from "./authentication";

export const createMaterial = async (data: Partial<Material>) => {
  const client = await clientPromise;
  client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .insertOne({
      ...data,
      id: uuid(),
      createdAt: new Date(),
      lastUpdated: new Date(),
    });
  revalidatePath("/materiales");
};
export const updateMaterial = async (data: Partial<Material>) => {
  const client = await clientPromise;
  const response = await client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          name: data.name,
          price: data.price,
          type: data.type,
          lastUpdated: new Date(),
        },
      }
    );
  revalidatePath("/materiales");
};
export const deleteMaterial = async (id: string) => {
  const client = await clientPromise;
  const response = await client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .findOneAndDelete({ id });
  revalidatePath("/materiales");
};
export const calculate = async (rows: CalculationRow[]) => {
  const idsOfMaterialsToFind = rows.map((row) => row.materialId);
  const client = await clientPromise;
  const materials = await client
    .db(process.env.DATABASE_NAME)
    .collection<Material>("materials")
    .find({ id: { $in: idsOfMaterialsToFind } }, { projection: { _id: 0 } })
    .toArray();

  const final = materials.reduce<CalculationSummary>(
    (accum, current) => {
      const row = rows.find((row) => {
        return row.materialId === current.id;
      });
      if (!row) {
        return accum;
      }

      const amount = row.amount;
      const cost = amount * current.price;

      accum.total += cost;
      accum.summary.push({ name: current.name, cost });

      return accum;
    },
    { total: 0, summary: [] }
  );
  return final;
};

//Fetch

type FetchMaterialsArgs = {
  name?: string;
  type?: string;
  take?: string;
  page?: string;
};
type MaterialsQuery = {
  name?: { $regex: string; $options: string };
  type?: { $regex: string; $options: string };
};

export const fetchMaterialsPaginated = async ({
  name,
  type,
  page,
  take = "10",
}: FetchMaterialsArgs) => {
  authenticate();
  const client = await clientPromise;
  await client.connect();
  let query: MaterialsQuery = {};
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
  }
  if (type) {
    query.type = { $regex: `^${type}$`, $options: "i" }; // Case-insensitive exact match
  }
  const totalDocuments = await client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / Number(take));
  // Calculate the number of documents to skip
  const skip = (Number(page) - 1) * Number(take);
  const data = await client
    .db(process.env.DATABASE_NAME)
    .collection("materials")
    .find(query, { projection: { _id: 0 } })
    .limit(Number(take))
    .skip(skip)
    .toArray();
  return {
    totalPages,
    data,
  };
};

export const fetchAllMaterials = async () => {
  const client = await clientPromise;
  await client.connect();
  return (await client
    .db(process.env.DATABASE_NAME)
    .collection<Material>("materials")
    .find({}, { projection: { _id: 0 } })
    .toArray()) as Material[];
};

export const fetchMaterialById = async (id: string): Promise<Material> => {
  const client = await clientPromise;
  await client.connect();
  return (await client
    .db(process.env.DATABASE_NAME)
    .collection<Material>("materials")
    .findOne({ id }, { projection: { _id: 0 } })) as Material;
};
