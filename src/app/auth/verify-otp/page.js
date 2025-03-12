"use client";
import { setLogin } from "@/redux/auth/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function VerifyOTPContent() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.current_user);
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobile(localStorage.getItem("mobile"));
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (otp?.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        "https://kabadiwale-backend.onrender.com/api/V1/partner/verify-otp",
        { mobile_no: mobile, otp }
      );
      localStorage.setItem("accessToken", response?.data?.token);
      dispatch(
        setLogin({ user: response?.data?.result, token: response?.data?.token })
      );

      if (response?.data.status) {
        toast.success("OTP Verified Successfully!");

        if (user?.first_name) {
          router.push("/under-review");
        } else {
          router.push(`/auth/personal-details?mobile=${mobile}`);
        }
      } else {
        toast.error(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      toast.error(error.response?.data?.message || "Failed to verify OTP.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        "https://kabadiwale-backend.onrender.com/api/V1/partner/send-otp",
        { mobile_no: mobile }
      );
      if (response.data) {
        localStorage.setItem("progressStep", "otpVerified");
        toast.success("OTP has been resent successfully!");
        setOtp("");
        setTimer(60);
        setIsResendDisabled(true);
      } else {
        toast.error(
          response.data.message || "Failed to resend OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Resend OTP Failed:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while resending OTP."
      );
    }
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

const VerifyOTP = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;
