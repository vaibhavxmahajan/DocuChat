"use server";

import ApiStatusCodes from "@/constants/api-status-codes";
import { auth } from "@/lib/auth";
import { ApiResponseServer } from "@/types/api/api-response";
import { User } from "@/types/user";

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

export const verifyEmailOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}): Promise<ApiResponseServer<Omit<User, "password">>> => {
  try {
    if (!email || !otp) throw new Error("Required fields are missing");
    const data = await auth.api.verifyEmailOTP({
      body: {
        email: email, // required
        otp: otp, // required
      },
    });
    return {
      message: "Email Verified Successfully.",
      success: data.status,
      status: ApiStatusCodes.OK,
      data: data.user,
    };
  } catch (error: any) {
    return {
      message: error?.message,
      success: false,
      status: error?.statusCode,
      data: null,
    };
  }
};
