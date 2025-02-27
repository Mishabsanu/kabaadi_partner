"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setLogin } from "@/redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function EnterMobile() {
  const [mobile, setMobile] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const handleNext = () => {
    if (mobile.length === 10) {
      // Get persisted state from localStorage
      const storedStateString = localStorage.getItem("persist:root");
      console.log(storedStateString, "storedStateString");

      if (storedStateString) {
        // Parse the stored state
        const storedState = JSON.parse(storedStateString);
        const storedAuth = JSON.parse(storedState?.auth);
        const existingUsers = storedAuth?.users || [];

        // Find the user by email (ensure email is available)
        const existingUser = existingUsers.find(
          (user) => user.mobile === mobile
        );

        if (existingUser) {
          // If user exists, update Redux store with the existing user
          const users = [...existingUsers]; // Create a copy of the existing users array
          dispatch(
            setLogin({
              current_user: { id: existingUser.id, mobile },
              users: users,
            })
          );
        } else {
          // If no existing user, create a new user and add to Redux
          const userId = uuidv4();
          const newUser = { id: userId, mobile };
          const users = [...existingUsers, newUser]; // Add the new user to the list

          dispatch(
            setLogin({
              current_user: newUser,
              users: users,
            })
          );
        }

        // Navigate to the home page or any other page after login
        router.push(`/auth/verify-otp?mobile=${mobile}`);
      } else {
        // If there's no existing state, create a new user
        const userId = uuidv4();
        const newUser = { id: userId, email };
        const users = [newUser];

        dispatch(
          setLogin({
            current_user: newUser,
            users: users,
          })
        );

        router.push(`/auth/verify-otp?mobile=${mobile}`);
      }
      // Redirect to OTP verification page with mobile as a query parameter
      router.push(`/auth/verify-otp?mobile=${mobile}`);
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
              const onlyNums = e.target.value.replace(/\D/g, ""); // Allow only digits
              setMobile(onlyNums.slice(0, 10)); // Enforce max length of 10
            }}
          />
        </div>

        <button
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
            mobile.length === 10
              ? "bg-[#8B008B]"
              : "bg-[#af6aaf] cursor-not-allowed"
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
          </span>
          .
        </p>
      </div>
    </div>
  );
}
