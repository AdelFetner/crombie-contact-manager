import { Router } from "express";
import {
    createContactController,
    deleteContactController,
    editContactController,
    getContactController,
    getContactsController,
} from "../controllers/contactController.js";
import multer from "multer";

export const contactsRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

// routes
contactsRouter.post("/", upload.single("image"), createContactController);
contactsRouter.get("/", getContactsController);
contactsRouter.get("/:id", getContactController);
contactsRouter.delete("/:id", deleteContactController);
contactsRouter.put("/:id", editContactController);
