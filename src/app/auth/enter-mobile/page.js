"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterMobile() {
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const router = useRouter();

  const handleNext = () => {
    if (mobile.length === 10) {
      router.push("/auth/verify-otp");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen px-6 bg-white">
      <div className="w-full max-w-sm mt-14">
        {/* Header Text */}
        <h1 className="text-2xl font-bold text-black mb-6">
          Enter your mobile number
        </h1>

        {/* Mobile Input Box */}
        <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-full">
          <select
            className="bg-transparent text-black font-semibold outline-none"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          >
            <option value="+91">+91 🇮🇳</option>
            <option value="+1">+1 🇺🇸</option>
            <option value="+44">+44 🇬🇧</option>
            <option value="+61">+61 🇦🇺</option>
          </select>|
          <input
            type="tel"
            className="ml-3 outline-none flex-1 text-lg w-full"
            placeholder="Enter mobile number"
            value={mobile}
            maxLength={10}
            onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
          />
        </div>

        {/* Continue Button */}
        <button
          className={`w-full mt-6 py-3 rounded-lg text-white text-lg font-semibold ${
            mobile.length === 10 ? "bg-[#8B008B] hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={handleNext}
          disabled={mobile.length !== 10}
        >
          Continue
        </button>

        {/* Terms & Conditions */}
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
          </span>.
        </p>
      </div>
    </div>
  );
}
