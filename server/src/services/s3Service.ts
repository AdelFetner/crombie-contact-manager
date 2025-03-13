import {
    DeleteObjectCommand,
    GetObjectCommand,
    NoSuchKey,
    PutObjectCommand,
    S3ServiceException,
    waitUntilObjectNotExists,
} from "@aws-sdk/client-s3";
import { s3Client } from "../config/bucketConnection.js";
import { v4 as uuid } from "uuid";

// inits the client
const client = s3Client;

// send file to a bucket specified by an arg
export const sendToBucket = async (
    bucketName: string,
    file: Express.Multer.File
) => {
    // if file is anything other than an image, return an error
    if (!file.mimetype.startsWith("image")) {
        throw new Error("File is not an image");
    }

    // composite key of uuid + filename to ensure uniqueness
    const key = `${uuid()}-${file.originalname}`;

    const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        const response = await client.send(putCommand);
        // returns the public url of the object in the bucket and the response
        return {
            url: `https://${bucketName}.s3.amazonaws.com/${key}`,
            response: response,
        };
    } catch (error: unknown) {
        //error handling from s3 SDK
        if (
            error instanceof S3ServiceException &&
            error.name === "EntityTooLarge"
        ) {
            throw new Error(
                `Error from S3 while uploading object to ${bucketName}.  ${error.name}: ${error.message}`
            );
        } else {
            throw new Error(`Failed to upload file: ${error}`);
        }
    }
};

// get file from a bucket
export const getFromBucket = async (bucketName: string, key: string) => {
    // gets object from bucket
    const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
    });
    try {
        const response = await client.send(getCommand);
        // returns the object as a string
        return response.Body?.transformToString();
    } catch (error: unknown) {
        //error handling from s3 SDK
        if (error instanceof NoSuchKey) {
            console.error(
                `Error from S3 while getting object "${key}" from "${bucketName}". No such key exists.`
            );
        } else if (error instanceof S3ServiceException) {
            console.error(
                `Error from S3 while getting object from ${bucketName}.  ${error.name}: ${error.message}`
            );
        } else {
            throw error;
        }
    }
};

// delete file from a bucket
export const deleteFromBucket = async (bucketName: string, key: string) => {
    // deletes object from bucket
    const deleteCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    try {
        const response = await client.send(deleteCommand);

        // waits until the object is deleted from the bucket and limits both delay and wait time
        await waitUntilObjectNotExists(
            { client: client, maxWaitTime: 60, minDelay: 2 },
            { Bucket: bucketName, Key: key }
        );

        return `The object "${key}" from bucket "${bucketName}" was deleted successfully`;
    } catch (error: unknown) {
        //error handling from s3 SDK
        if (error instanceof NoSuchKey) {
            console.error(
                `Error from S3 while deleting object "${key}" from "${bucketName}". No such key exists.`
            );
        } else if (
            error instanceof S3ServiceException &&
            error.name === "NoSuchBucket"
        ) {
            console.error(
                `Error from S3 while deleting object from ${bucketName}. The bucket doesn't exist.`
            );
        } else if (error instanceof S3ServiceException) {
            console.error(
                `Error from S3 while deleting object from ${bucketName}.  ${error.name}: ${error.message}`
            );
        } else {
            throw error;
        }
    }
};

// edit file in a bucket
// takes the bucket where to edit, the key of the object to edit, and the new file. It deletes the old object and uploads the new one
export const editInBucket = async (
    bucketName: string,
    key: string,
    file: Express.Multer.File
) => {
    // if file is anything other than an image, return an error
    if (!file.mimetype.startsWith("image")) {
        throw new Error("File is not an image");
    }

    try {
        // deletes the old object
        await deleteFromBucket(bucketName, key);

        // uploads the new object
        return await sendToBucket(bucketName, file);
    } catch (error: unknown) {
        throw new Error(`Failed to edit file: ${error}`);
    }
};
