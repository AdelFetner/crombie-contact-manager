import { Router } from "express";
import {
    createContactController,
    deleteContactController,
    editContactController,
    getContactController,
    getContactsController,
} from "../controllers/contactController.js";

export const contactsRouter = Router();

// routes
contactsRouter.post("/", createContactController);
contactsRouter.get("/", getContactsController);
contactsRouter.get("/:id", getContactController);
contactsRouter.delete("/:id", deleteContactController);
contactsRouter.put("/:id", editContactController);
