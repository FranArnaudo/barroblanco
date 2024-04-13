import clientPromise from "@/lib/mongodb";
import { EmailTemplate } from "@/ui/EmailTemplate";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import { uuid } from "uuidv4";
import { User } from "../../../types";

type ResponseData = {
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const mongoClient = await clientPromise;
    const user = await mongoClient
      .db(process.env.DATABASE_NAME)
      .collection<User>("users")
      .findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUserId = uuid();
    bcrypt.hash(req.body.password, 10, function (err, hash) {
      return mongoClient
        .db(process.env.DATABASE_NAME)
        .collection("users")
        .insertOne({
          id: newUserId,
          email: req.body.email,
          password: hash,
          verified: false,
        });
    });
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: "franarnaudo1999@gmail.com",
      subject: "New user for Barro Blanco",
      html: EmailTemplate(req.body.email, newUserId),
    });
    return res.status(201).json({ message: "User created, not validated" });
  }
  res.status(404).json({ message: "Endpoint not found" });
}
