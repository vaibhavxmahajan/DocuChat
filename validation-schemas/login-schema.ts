import z from "zod";

export const loginSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .min(1, { error: "Email is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(30, { error: "Password is too long" }),
});
