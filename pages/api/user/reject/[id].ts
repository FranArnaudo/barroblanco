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
      .findOne({ id, verified: false }, { projection: { _id: 0 } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No such user or already validated" });
    }
    await mongo
      .db(process.env.DATABASE_NAME)
      .collection("users")
      .deleteOne({ id });
    return res.status(200).json({ message: "User rejected" });
  }
}
