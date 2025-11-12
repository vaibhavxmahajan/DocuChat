import { GalleryVerticalEnd } from "lucide-react";

import { SignupForm } from "@/components/ui/signup-form";
import { APP_NAME } from "@/constants/constants";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <div className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-xl">
            <GalleryVerticalEnd className="size-10" />
          </div>
          <h1 className="text-3xl font-semibold">Welcome to DocuChat!</h1>
          <p>Please create your account to continue to Docuchat</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {APP_NAME}
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
}
