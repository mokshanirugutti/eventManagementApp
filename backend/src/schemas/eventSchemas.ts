import { z } from 'zod';

export const eventCreationSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    date: z.string().transform((str) => new Date(str)),
});

export const eventUpdateSchema = eventCreationSchema.partial(); 