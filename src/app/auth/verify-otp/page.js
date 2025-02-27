"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    if (otp.length === 6) {
      router.push('/auth/enter-details');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-xl font-bold mb-4">Enter OTP</h1>
      <input 
        type="text" 
        className="border p-2 rounded w-64 text-center" 
        placeholder="Enter OTP" 
        value={otp} 
        onChange={(e) => setOtp(e.target.value)}
      />
      <button 
        className="bg-blue-500 text-white p-2 rounded mt-4" 
        onClick={handleVerify}
      >Verify</button>
    </div>
  );
}
