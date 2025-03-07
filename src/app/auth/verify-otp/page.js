"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

function VerifyOTPContent() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(90);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile");

  console.log(mobile, "mobile");
  const user = useSelector((state) => state?.auth?.current_user);
  console.log(user, "user");

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp?.length === 6) {
      if (user?.name) {
        router.push("/under-review");
      } else {
        router.push("/auth/enter-details");
      }
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    setTimer(90);
    setIsResendDisabled(true);
    alert("OTP has been resent!");
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen p-4 bg-white">
      <div className="w-full max-w-sm">
        <button
          onClick={() => router.back()}
          className="text-left text-black text-base mb-3"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold text-black mb-1 mt-5">
          Enter the OTP sent to
        </h1>
        <p className="text-xl font-bold text-black mb-3">{mobile}</p>
        <div className="border-2 border-[#8B008B] p-1 rounded-md text-center">
          <input
            type="text"
            maxLength="6"
            className="outline-none w-full text-center tracking-wider py-0.5 text-lg"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
            otp.length === 6
              ? "bg-[#8B008B]"
              : "bg-[#af6aaf] cursor-not-allowed"
          }`}
          onClick={handleVerify}
          disabled={otp.length !== 6}
        >
          Continue
        </button>
        <p className="text-gray-500 text-center mt-3 text-sm">
          Didn’t get OTP?{" "}
          <button
            onClick={handleResendOTP}
            disabled={isResendDisabled}
            className={`font-bold ${
              isResendDisabled ? "text-gray-400" : "text-black"
            }`}
          >
            {isResendDisabled ? `Resend in ${timer}s` : "Resend now"}
          </button>
        </p>
      </div>
    </div>
  );
}

// Wrap in Suspense for proper rendering
export default function VerifyOTP() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
}
