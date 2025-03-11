import { Request, Response } from "express";
import { createContact, getContact } from "../services/contactService.js";

// create contact
export const createContactController = async (req: Request, res: Response) => {
    try {
        // calls createContact func with the request body as the param
        const result = await createContact(req.body);

        // returns a 201 and the result
        res.status(201).json({
            message: "Contact created successfully",
            data: result,
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
