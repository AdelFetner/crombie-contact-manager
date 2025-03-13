import { z } from "zod";

// the schema for the contactForm
export const formSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "Name is too short" })
        .max(30, { message: "Name is too long" }),
    lastName: z
        .string()
        .min(2, { message: "Last Name is too short" })
        .max(30, { message: "Last Name is too long" }),
    email: z.string().email({ message: "Invalid email" }),
    phone: z
        .string()
        .min(8, { message: "Phone number is too short" })
        .max(16, { message: "Phone number is too long" }),
    company: z.string().optional(),
    role: z.string().optional(),
    notes: z.string().optional(),
    // image is an union of zod types, it can be a FileList or a string, for lists it takes the first file
    image: z
        .union([
            z
                .instanceof(FileList)
                .transform((files) => files[0])
                .optional(),
            z.string().optional(),
        ])
        .optional(),
});

export type TFormSchema = z.infer<typeof formSchema>;

export interface Contact extends TFormSchema {
    id: string;
    createdAt: string;
}
