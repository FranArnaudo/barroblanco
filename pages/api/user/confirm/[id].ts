import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../types";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const { id } = req.query;
    const mongo = await clientPromise;
    const user = await mongo
      .db(process.env.DATABASE_NAME)
      .collection<User>("users")
      .findOne({ id }, { projection: { _id: 0 } });
    if (!user) {
      return res.status(400).json({ message: "No such user" });
    }
    if (user.verified) {
      return res.status(400).json({ message: "User already validated" });
    }
    await mongo
      .db(process.env.DATABASE_NAME)
      .collection("users")
      .updateOne({ id }, { $set: { verified: true } });
    return res.status(200).json({ message: "User validated" });
  }
  return res.status(404).json({ message: "Not found" });
}
