import { z } from 'zod';

export const userRegistrationSchema = z.object({
  username: z.string().min(5,{ message: "username is required" }),
  email: z.string().email({message:"Email is required"}),
  password: z.string().min(8, {message:"Password is required"}),
  
});

export const userLoginSchema = z.object({
  username: z.string({message:"username is required"}),
  password: z.string().min(8,{message:"password is required or less than 8 characters"}),
});