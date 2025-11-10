"use server";

import { auth } from "@/lib/auth";

export const sendVerificationEmail = async({ email } : { email : string })=>{
    try {
        const data = await auth.api.sendVerificationOTP({
          body: {
            email: email, // required
            type: "sign-in", // required
          },
        });
        if(!data.success){
            throw new Error('Email sent failed.')
        }
        return data.success
    } catch (error) {
        throw new Error((error as Error)?.message)
    }
}