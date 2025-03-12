"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EnterMobileContent = () => {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    if (mobile?.length === 10) {
      setLoading(true);

      try {
        await axios.post("https://kabadiwale-backend.onrender.com/api/V1/partner/send-otp", {
          mobile_no: mobile,
        });
        localStorage.setItem("progressStep", "enterMobile");
        localStorage.setItem("mobile", mobile);
        toast.success("OTP sent successfully!");
        router.push(`/auth/verify-otp`);
      } catch (error) {
        toast.error("Failed to send OTP. Please try again.");
        console.error("Error sending OTP:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Invalid mobile number. Must be 10 digits.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen px-6 bg-white">
      <div className="w-full max-w-sm mt-14">
        <h1 className="text-2xl font-bold text-black mb-6">
          Enter your mobile number
        </h1>

        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-1 w-full">
          <span className="text-black">+91</span>
          <span className="mx-2 text-black">|</span>
          <input
            type="tel"
            className="outline-none flex-1 text-lg w-full"
            placeholder="Enter mobile number"
            value={mobile}
            maxLength={10}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              setMobile(onlyNums?.slice(0, 10));
            }}
          />
        </div>

        <button
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
            mobile?.length === 10
              ? "bg-[#8B008B]"
              : "bg-[#af6aaf] cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={mobile?.length !== 10 || loading}
        >
          {loading ? "Sending OTP..." : "Continue"}
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          By continuing, You accept the{" "}
          <span className="text-[#8B008B] underline cursor-pointer">
            Terms of Service
          </span>
          ,{" "}
          <span className="text-[#8B008B] underline cursor-pointer">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-[#8B008B] underline cursor-pointer">
            Content Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default EnterMobileContent;
