import clientPromise from "./mongodb";

type FetchMaterialTypeArgs = {
  name: string,
  page: string,
  take: string
}
type MaterialTypeQuery = {
  name?: { $regex: string; $options: string };
}
export const fetchTypesPaginated = async ({
  name,
  page = "1",
  take = "10",
}: FetchMaterialTypeArgs) => {
  const client = await clientPromise;
  await client.connect();
  let query: MaterialTypeQuery = {};
  if (name) {
    query.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
  }
  const totalDocuments = await client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .countDocuments(query);
  const totalPages = Math.ceil(totalDocuments / Number(take));
  // Calculate the number of documents to skip
  const skip = (Number(page) - 1) * Number(take);
  const data = await client
    .db(process.env.DATABASE_NAME)
    .collection("materialTypes")
    .find(query)
    .limit(Number(take))
    .skip(skip)
    .toArray();
  return {
    totalPages,
    data,
  };
};