"use server";

import ApiStatusCodes from "@/constants/api-status-codes";
import { auth } from "@/lib/auth";
import { ApiResponseServer } from "@/types/api/api-response";

export const sendVerificationEmail = async ({
  email,
}: {
  email: string;
}): Promise<ApiResponseServer<null>> => {
  try {
    const data = await auth.api.sendVerificationOTP({
      body: {
        email: email, // required
        type: "email-verification", // required
      },
    });
    if (!data.success) {
      throw new Error("Email sent failed.");
    }
    return {
      success: data?.success,
      message: "A verification code is sent to your email.",
      status: ApiStatusCodes.OK,
    };
  } catch (error) {
    // throw new Error((error as Error)?.message)
    return {
      success: false,
      message: (error as Error)?.message,
      status: ApiStatusCodes.API_ERROR,
    };
  }
};

export const verifyEmailOtp = async({email, otp} : {email : string, otp : string}) =>{
  console.log({email,otp})
  try {
    const data = await auth.api.verifyEmailOTP({
      body: {
        email: email, // required
        otp: otp, // required
      },
    });
    console.log({data})
  } catch (error) {
    console.log(error)
  }
}