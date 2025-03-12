import { GetCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../config/dynamoConnection.js";
import { v4 as uuidv4 } from "uuid";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

// interface for the contact data
interface Contact {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: string;
    company?: string;
    role?: string;
    notes?: string[];
}

// create contact
export const createContact = async (
    data: Omit<Contact, "id" | "createdAt">
) => {
    // adds the id and createdAt dinamically
    const newContact: Contact = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...data,
    };

    // puts item data on the table
    const request = new PutCommand({
        TableName: "Contacts",
        Item: newContact,
    });

    // sends request to dynamodb
    try {
        const response = await docClient.send(request);
        // returns the response and the data for the controller to show
        return {
            response,
            data: newContact,
        };
    } catch (error) {
        throw new Error("Failed to create contact");
    }
};

// get a contact by id
export const getContact = async (contactId: string) => {
    // checks if the contactId is valid
    if (!contactId) {
        throw new Error("Contact ID is required");
    }
    // checks if the contactId is a valid uuid, uuids are 36 characters long
    if (contactId.length !== 36) {
        throw new Error("Invalid contact ID");
    }

    const request = new QueryCommand({
        TableName: "Contacts",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: marshall({
            ":id": contactId,
        }),
    });

    try {
        // queries the contact data from the table
        const response = await docClient.send(request);
        // converts dynamo record into an object
        return response.Items?.map((item) => unmarshall(item));
    } catch (error) {
        throw new Error("Failed to get contact");
    }
};

// query all contacts
export const getContacts = async () => {
    const request = new ScanCommand({
        TableName: "Contacts",
    });

    try {
        // scans the table for all the contacts
        const response = await docClient.send(request);

        // returns the contacts array
        return response.Items;
    } catch (error) {
        throw new Error("Failed to get contacts");
    }
};
