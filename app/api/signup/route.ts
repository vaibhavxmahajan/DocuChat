import config from "@/config";
import ApiStatusCodes from "@/constants/api-status-codes";
import RoutePaths from "@/constants/route-paths";
import { auth } from "@/lib/auth";

export async function POST(req : Request){
    const { name,email, password } = await req.json();
    const data = await auth.api.signUpEmail({
        body : {
            name : name,
            email : email,
            password : password,
            callbackURL : `${config.app_base_url}${RoutePaths.LOGIN}`
        }
    });
    return Response.json({ success: true, user : data.user,status : ApiStatusCodes.OK });
}