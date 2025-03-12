import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

// creats a s3 bucket, takes a string arg for the bucket name and sends a creation command
export const createBucket = async (bucketName: string) => {
    const command = new CreateBucketCommand({ Bucket: bucketName });
    const client = new S3Client([
        {
            region: process.env.S3_AWS_REGION,
            credentials: {
                accessKeyId: process.env.S3_AWS_ACCESS_KEY,
                secretAccessKey: process.env.S3_AWS_SECRET_ACCESS,
            },
        },
    ]);
    client.send(command);
    return bucketName;
};

createBucket("crombie-management")
    .then((bucketName) => {
        console.log(`Bucket name: ${bucketName}`);
        console.log("Bucket created successfully.\n");
    })
    .catch((error) => {
        console.error("Creation failed:", error);
    });
