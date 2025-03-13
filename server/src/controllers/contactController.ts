import { Request, Response } from "express";
import {
    createContact,
    deleteContact,
    editContact,
    getContact,
    getContacts,
} from "../services/contactService.js";
import { deleteFromBucket, sendToBucket } from "../services/s3Service.js";

// create contact
export const createContactController = async (req: Request, res: Response) => {
    try {
        // multer file manipulation
        const file = req.file;

        if (file) {
            // sends the image to the bucket
            const { url, response } = await sendToBucket(
                "crombie-management",
                file
            );

            // sets body image to the url so it can be sent to creacte method
            req.body.image = url;
        }

        // calls createContact func with the request body as the param
        const result = await createContact(req.body);

        // returns a 201 and the result, with the entity data and the aws response
        const { data, response } = result;
        res.status(201).json({
            message: "Contact created successfully",
            data: data,
            awsResponse: response,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                error: `Failed to create contact: ${error.message}`,
            });
        }
    }
};

// get contact by id
export const getContactController = async (req: Request, res: Response) => {
    try {
        const contactId = req.params.id;
        // calls getContact fuc with the contactId as the param
        const contact = await getContact(contactId);

        // checks for falsy array
        if (!contact) {
            res.status(404).json({ error: "Contact not found" });
            return;
        }

        res.status(200).json({
            message: "Contact retrieved successfully",
            data: contact,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                error: `Failed to get contact: ${error.message}`,
            });
        }
    }
};

// get all contacts
export const getContactsController = async (req: Request, res: Response) => {
    try {
        // calls getContacts func
        const contacts = await getContacts();

        // checks for falsy array
        if (!contacts) {
            res.status(404).json({ error: "Contacts not found" });
            return;
        }

        res.status(200).json({
            message: "Contacts retrieved successfully",
            data: contacts,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                error: `Failed to get contacts: ${error.message}`,
            });
        }
    }
};

// delete contact
export const deleteContactController = async (req: Request, res: Response) => {
    try {
        // gets the contactId from the request params
        const contactId = req.params.id;
        // calls deleteContact func with the contactId as the param
        const result = await deleteContact(contactId);

        // deletes the image from the bucket if it exists
        if (result.data && result.data?.[0]?.image) {
            // gets the key (url) and deletes the image from the bucket
            const key = result.data[0].image.split("/").pop();
            await deleteFromBucket("crombie-management", key);
        }

        // returns the aws response
        res.status(200).json({
            message: "Contact deleted successfully",
            awsResponse: result,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                error: `Failed to delete contact: ${error.message}`,
            });
        }
    }
};

// edit contact
export const editContactController = async (req: Request, res: Response) => {
    try {
        // gets the contactId from the request params
        const contactId = req.params.id;
        const file = req.file;
        const body = req.body;

        // if file exists, sends it to bucket and sets img to body as the url, if not, sets img to the existing contact image or empty to cover for editing cases
        if (file) {
            const { url } = await sendToBucket("crombie-management", file);
            body.image = url;
        } else {
            const existingContact = await getContact(contactId);
            body.image = existingContact?.[0]?.image || "";
        }

        // calls editContact func with the contactId and the request body as the params
        const result = await editContact(contactId, body);

        // returns the aws response
        res.status(200).json({
            message: "Contact edited successfully",
            awsResponse: result,
        });
    } catch (error: unknown) {
        res.status(500).json({
            error: `Failed to edit contact: ${error}`,
        });
    }
};
