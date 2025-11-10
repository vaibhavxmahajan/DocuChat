import db from "@/db";
import { betterAuth } from "better-auth";
import  { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema/index";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./helpers/resend";


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
      async sendVerificationOTP({ email, type, otp }) {
          if(type === 'sign-in'){
            //TODO sign in verfication email send
            console.log({ email, otp, type })
            await resend.emails.send({
              from: "Acme <onboarding@resend.dev>", // You could add your custom domain
              to: email, // email of the user to want to end
              subject: "Email Verification", // Main subject of the email
              html: `Otp : ${otp}`, // Content of the email
              // you could also use "React:" option for sending the email template and there content to user
            });
          }
      },
    })
  ]
});
