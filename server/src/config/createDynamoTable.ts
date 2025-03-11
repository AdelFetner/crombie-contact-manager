import {
    CreateTableCommand,
    TableCreationParameters,
} from "@aws-sdk/client-dynamodb";
import { client } from "./dynamoConnection";

// creates a dynamo table, set to ondemand. Takes an arg object with table name, attribute defs, and key schema as params from the sdk interface
export const createDynamoTable = async ({
    TableName,
    AttributeDefinitions,
    KeySchema,
}: TableCreationParameters) => {
    const command: CreateTableCommand = new CreateTableCommand({
        TableName: TableName,
        AttributeDefinitions: AttributeDefinitions,
        KeySchema: KeySchema,
        BillingMode: "PAY_PER_REQUEST",
    });

    const response = await client.send(command);
    console.log(response);
    return response;
};
