import express from "express";
import cors from "cors";
import { contactsRouter } from "./src/routes/contacts.js";

const app = express();

// parsing middleware
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
