import z from "zod";

const verifyEmailSchema = z
  .object({
    otp: z.string().min(6, { message: "Invalid Otp" }),
  })

export default verifyEmailSchema