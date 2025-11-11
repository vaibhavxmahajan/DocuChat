import db from "@/db";
import { betterAuth } from "better-auth";
import  { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema/index";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./helpers/resend";
import VerifyEmail from "@/emails/verify-email";
import { CONSTANTS } from "@/constants/constants";

export const auth = betterAuth({
  database : drizzleAdapter(db, {
    provider : 'pg',
    schema : schema,
  }),
  emailAndPassword: {
    requireEmailVerification : true,
    enabled: true,
    autoSignIn : false,
  },
  plugins : [
    nextCookies(),
    emailOTP({
      otpLength : 6,
      expiresIn : 600, //Otp expied after 10 minutes
      overrideDefaultEmailVerification : true,
      async sendVerificationOTP({ email, type, otp }) {
          if (type === "email-verification") {
            await resend.emails.send({
              from: CONSTANTS.FROM_EMAIL_WITH_NAME, // You could add your custom domain
              to: [email],
              subject: "Email Verification",
              react: VerifyEmail({ verificationCode: otp }),
            });
          } 
      },
    })
  ]
});
