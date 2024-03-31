import { Material } from "../../types";
import clientPromise from "./mongodb";

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
    .find(query)
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
    .find()
    .toArray()) as Material[];
};
