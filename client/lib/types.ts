import { z } from "zod";

// the schema for the contactForm
export const formSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8).max(16),
    company: z.string().optional(),
    role: z.string().optional(),
    notes: z.string().optional(),
});

export type TFormSchema = z.infer<typeof formSchema>;
