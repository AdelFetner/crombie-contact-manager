import { TableCreationParameters } from "@aws-sdk/client-dynamodb";
import { createDynamoTable } from "./createDynamoTable.js";

// defines params to use as args for createDynamoTable
const params: TableCreationParameters = {
    TableName: "Contacts",
    // defines the attributes and their types
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "S",
        },
        {
            AttributeName: "lastName",
            AttributeType: "S",
        },
    ],
    // defines the key schema for the table
    KeySchema: [
        {
            AttributeName: "id",
            KeyType: "HASH",
        },
        {
            AttributeName: "lastName",
            KeyType: "RANGE",
        },
    ],
};

// creates table, catches if it already exists or if it failed
createDynamoTable(params)
    .then(() => console.log("Table creation request sent successfully"))
    .catch((error) => {
        // aws sdk error for resource currently in use
        if (error.name === "ResourceInUseException") {
        } else {
            console.error("Creation failed:", error);
        }
    });
