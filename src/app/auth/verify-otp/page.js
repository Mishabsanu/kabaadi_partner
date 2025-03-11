"use client";
import VerifyOTPContent from "@/components/VerifyOTPContent";
import withGuest from "@/hoc/withGuest";
import { Suspense } from "react";

// Wrap in Suspense for proper rendering
const VerifyOTP = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

export default withGuest(VerifyOTP);
