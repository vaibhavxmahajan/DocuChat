import db from "@/db";
import { betterAuth } from "better-auth";
import  { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema/index";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database : drizzleAdapter(db, {
    provider : 'pg',
    schema : schema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn : false,
  },
  plugins : [nextCookies()]
});
