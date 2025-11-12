"use client";

import { GalleryVerticalEnd, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import verifyEmailSchema from "@/validation-schemas/verify-email-schema"
import z from "zod"
import { verifyEmailOtp } from "@/app/server-actions/login-signup/email-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RoutePaths from "@/constants/route-paths";

type OtpFormProps = React.ComponentProps<"div"> & {
  email : string
}

export function OTPForm({ className,email, ...props }: OtpFormProps) {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    defaultValues : {
      otp : ''
    },
    resolver : zodResolver(verifyEmailSchema)
  })
  const router = useRouter()

  const onSubmit = async(data : z.infer<typeof verifyEmailSchema>)=>{
    try { 
      const response = await verifyEmailOtp({ email : email,otp : data.otp })
      if(!response.success) throw new Error(response?.message)

      form.reset()
      toast.success(response.message)
      router.push(RoutePaths.LOGIN)
    } catch (error) {
      toast.error((error as Error)?.message)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Enter verification code</h1>
            <FieldDescription>
              We sent a 6-digit code to your email address
            </FieldDescription>
          </div>
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState })=>{
              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="sr-only">
                    Verification code
                  </FieldLabel>
                  <InputOTP
                    maxLength={6}
                    id={field.name}
                    {...field}
                    aria-invalid={fieldState.invalid}
                    containerClassName="gap-4"
                  >
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:h-16 *:data-[slot=input-otp-slot]:w-12 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FieldDescription className="text-center">
                    Didn&apos;t receive the code? <a href="#">Resend</a>
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[{ message: fieldState.error?.message }]}
                    />
                  )}
                </Field>
              );
            }}  
          />
          
          <Field>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              { 
                form.formState.isSubmitting &&  <Loader2 className="size-4 animate-spin"/>
              }
              Verify
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
