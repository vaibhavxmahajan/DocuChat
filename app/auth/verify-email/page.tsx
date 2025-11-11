import { OTPForm } from '@/components/otp-form';
import React from 'react';

type VerifyEmailProps = {
  searchParams : {
    email : string
  }
}

const VerifyEmailPage : React.FC<VerifyEmailProps> = ({ searchParams }) => {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OTPForm email={searchParams.email}/>
      </div>
    </div>
  );
}

export default VerifyEmailPage