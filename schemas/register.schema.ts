import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must contain at least 3 characters"),

    email: z.string().email("Invalid email address"),

    password: z.string().min(8, "Password must contain at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
