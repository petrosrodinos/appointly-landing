import { z } from "zod";

export const contactFormSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    content: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

