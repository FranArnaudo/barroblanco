import clientPromise from "@/lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { User } from "../../../types";
import bcrypt from "bcrypt";

type ResponseData = {
  message?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send({ message: "Missing mandatory fields" });
    }
    const mongo = await clientPromise;
    const user = await mongo
      .db(process.env.DATABASE_NAME)
      .collection<User>("users")
      .findOne({ email }, { projection: { _id: 0 } });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    if (!user.verified) {
      res.status(400).send({ message: "User hasn't been verified yet" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid credentials" });
    }
    if (!process.env.AUTH_SECRET) {
      return res.status(500).send({ message: "Missing environment variables" });
    }
    jwt.sign(
      { user },
      process.env.AUTH_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err || !token) {
          res.status(500).send({ message: "Couldn't sign token" });
        }
        res.status(200).send({ token: `Bearer ${token}` });
      }
    );
  } else {
    res.status(404).send({ message: "Not found" });
  }
}
