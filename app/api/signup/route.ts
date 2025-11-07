import config from "@/config";
import ApiStatusCodes from "@/constants/api-status-codes";
import RoutePaths from "@/constants/route-paths";
import { auth } from "@/lib/auth";
import { ApiResponseServer } from "@/types/api/api-response";
import { User } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(req : Request): Promise<NextResponse<ApiResponseServer<User>>> {
    try {
        const { name, email, password } = await req.json();
        console.log({ name, email, password });
        const data = await auth.api.signUpEmail({
          body: {
            name: name,
            email: email,
            password: password,
            callbackURL: `${config.app_base_url}${RoutePaths.LOGIN}`,
          },
        });
        return NextResponse.json({
          success: true,
          message: 'User created successfully',
          status: ApiStatusCodes.OK,
          data: data.user,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message,
            message: 'Internal Server Error',
            status: ApiStatusCodes.INTERNAL_SERVER_ERROR,
        });
    }
}