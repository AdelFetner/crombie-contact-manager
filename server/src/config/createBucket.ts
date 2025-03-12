import { CreateBucketCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { s3Client } from "./bucketConnection.js";

dotenv.config();

// creats a s3 bucket, takes a string arg for the bucket name and sends a creation command
export const createBucket = async (bucketName: string) => {
    const command = new CreateBucketCommand({ Bucket: bucketName });
    s3Client.send(command);
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
