"use server";

import ApiStatusCodes from "@/constants/api-status-codes";
import { auth } from "@/lib/auth";
import { ApiResponseServer } from "@/types/api/api-response";
import { User } from "@/types/user";

export const signUpUser = async (
  data: Pick<User, "email" | "password" | "name">
): Promise<ApiResponseServer<Omit<User,"password">>> => {
  try {
    const response = await auth.api.signUpEmail({
        body : {
            ...data,
        },
    });

    if (!response?.user) {
      throw new Error("User signup failed");
    }

    return {
      success: true,
      data: response.user,
      error: null,
      status: ApiStatusCodes.CREATED,
      message: "Verification Code is sent to your email.",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: (error as Error).message,
      status: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    };
  }
};

export const signInUser = async (
    data : Pick<User, "email" | "password">
) : Promise<ApiResponseServer<Omit<User,"password">>> =>{
    try{
        const response = await auth.api.signInEmail({
            body : {
                ...data
            }
        })
        if(!response?.user){
            throw new Error("User sign in failed");
        }
        
        return {
            success: true,
            data: response.user,
            error: null,
            status: ApiStatusCodes.OK,
            message: "User signed in successfully",
        }
    }catch(error){
        return {
            success: false,
            error: (error as Error).message,
            status: ApiStatusCodes.INTERNAL_SERVER_ERROR,
            message: "Internal server error",
        }
    }
}
