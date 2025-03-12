import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

// inits the dynamoclient and document clients
export const client: DynamoDBClient = new DynamoDBClient({
    region: process.env.ORG_AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.ORG_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.ORG_AWS_SECRET_ACCESS_KEY as string,
        sessionToken: process.env.ORG_AWS_SESSION_TOKEN as string,
    },
});

export const docClient: DynamoDBDocumentClient =
    DynamoDBDocumentClient.from(client);
