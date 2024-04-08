"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "../mongodb";
import { uuid } from "uuidv4";
import { CreateTemplateForm, Template } from "../../../types";
import { s3Client } from "../awss3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
export const createTemplate = async (data: Partial<Template>) => {
  let imgUrl = "";
  if (data.img) {
    try {
      const newKey = `${data.name?.replace(" ", "")}K${uuid()}.jpg`;
      const putObject = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: newKey,
        Body: (await new Blob([data.img]).arrayBuffer()) as Buffer,
      });
      await s3Client.send(putObject);
      imgUrl = `https://${process.env.AWS_S3_BUCKET}.s3.sa-east-1.amazonaws.com/${newKey}`;
    } catch (error) {
      console.log(
        "🚀Fran ~ file: templateServerActions.ts:27 ~ createTemplate ~ error:",
        error
      );
    }
    const client = await clientPromise;
    client
      .db(process.env.DATABASE_NAME)
      .collection("templates")
      .insertOne({
        ...data,
        id: uuid(),
        img: imgUrl,
        createdAt: new Date(),
        lastUpdated: new Date(),
      });
    revalidatePath("/plantillas");
  }
};

export const fetchAllTemplates = async () => {
  const client = await clientPromise;
  await client.connect();
  return (await client
    .db(process.env.DATABASE_NAME)
    .collection<Template>("templates")
    .find({}, { projection: { _id: 0 } })
    .toArray()) as Template[];
};
