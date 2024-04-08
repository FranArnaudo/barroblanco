import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.ACCESS_KEY) {
  throw new Error('Invalid/Missing environment variable: "AWS_ACCESS_KEY"');
}

if (!process.env.SECRET_ACCESS_KEY) {
  throw new Error('Invalid/Missing environment variable: "AWS_SECRET_KEY"');
}

if (!process.env.AWS_S3_BUCKET) {
  throw new Error('Invalid/Missing environment variable: "AWS_S3_BUCKET"');
}

export const s3Client = new S3Client({
  region: "sa-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});
