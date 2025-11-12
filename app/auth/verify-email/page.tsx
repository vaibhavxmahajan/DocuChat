import { OTPForm } from '@/components/otp-form';
import React from 'react';

type VerifyEmailProps = {
  searchParams: Promise<{
    email : string
  }>
}

const VerifyEmailPage : React.FC<VerifyEmailProps> = async({ searchParams }) => {
  const urlSearchParams = await searchParams
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OTPForm email={urlSearchParams.email || ""}/>
      </div>
    </div>
  );
}

export default VerifyEmailPage