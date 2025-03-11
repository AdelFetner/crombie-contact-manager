import { Router } from "express";
import {
    createContactController,
    getContactController,
} from "../controllers/contactController.js";

export const contactsRouter = Router();

// routes
contactsRouter.post("/", createContactController);
contactsRouter.get("/:id", getContactController);
