import z from "zod";

export const userSignupSchema = z
  .object({
    name: z.string().min(5, { message: "Full Name must be atleast 5 characters long" }),
    email: z
      .email()
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(30, { message: "Password is too long" })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // error will show under confirm_password field
  });
