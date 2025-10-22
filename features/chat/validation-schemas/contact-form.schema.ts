import { z } from "zod";

export const contactFormSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    content: z.string().min(10, "Message must be at least 10 characters"),
    confirmation_message_provider: z.enum(["email", "sms"], {
        message: "Please select where you want to receive the confirmation message",
    }),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;

