"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setUserDetails } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";

export default function EnterDetails() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleContinue = () => {
    if (name && lastName) {
      dispatch(setUserDetails({ name, lastName }));
      router.push("/vehicle/add-vehicle");
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-3">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-left text-black text-lg mb-3"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-4 mt-5">Enter your details</h1>

      {/* Name Input Fields */}
      <div className="mb-3">
        <label className="text-base font-medium">Name</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            className="border border-gray-400 rounded-md p-2 w-full text-base"
            placeholder="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-400 rounded-md p-2 w-full text-base"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      {/* Continue Button */}
      <button
        className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
          name && lastName ? "bg-[#8B008B]" : "bg-[#af6aaf] cursor-not-allowed"
        }`}
        // className="bg-[#8B008B] text-white font-medium text-base py-2 rounded-md w-full"
        onClick={handleContinue}
      >
        Continue
      </button>

      {/* Referral Code */}
      <p className="text-center mt-3 text-gray-600 text-sm">
        Have a Referral Code?
        <span className="text-[#8B008B] font-medium cursor-pointer ml-1">
          Apply a Referral Code
        </span>
      </p>
    </div>
  );
}
