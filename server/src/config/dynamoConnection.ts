import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

// inits the dynamoclient and document clients
export const client: DynamoDBClient = new DynamoDBClient([
    {
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    },
]);

export const docClient: DynamoDBDocumentClient =
    DynamoDBDocumentClient.from(client);
