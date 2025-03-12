import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3Client: S3Client = new S3Client({
    region: process.env.S3_AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.S3_AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.S3_AWS_SECRET_ACCESS as string,
    },
});
