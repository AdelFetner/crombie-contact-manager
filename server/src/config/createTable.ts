import { TableCreationParameters } from "@aws-sdk/client-dynamodb";
import { createDynamoTable } from "./createDynamoTable";

// defines params to use as args for createDynamoTable
const params: TableCreationParameters = {
    TableName: "Contacts",
    AttributeDefinitions: [
        {
            AttributeName: "id",
            AttributeType: "S",
        },
        {
            AttributeName: "createdAt",
            AttributeType: "S",
        },
    ],
    KeySchema: [
        {
            AttributeName: "id",
            KeyType: "HASH",
        },
        {
            AttributeName: "createdAt",
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
            console.log("Table already exists - no action taken");
        } else {
            console.error("Creation failed:", error);
        }
    });
