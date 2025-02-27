"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

export default function UnderReview() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center mt-5 justify-start min-h-screen bg-gray-50 px-4">
      {/* Header */}
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">Mishabs Organisation</p>
          <p className="text-sm text-gray-500">Pickup unit</p>
        </div>
        <button
          className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          M
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center mt-20 gap-4">
        {/* Clock Icon */}
        <div className="w-20 h-20 flex items-center justify-center bg-yellow-200 rounded-full">
          <svg
            className="w-10 h-10 text-yellow-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 4a8 8 0 11-8 8 8.009 8.009 0 018-8m0-2a10 10 0 100 20 10 10 0 000-20zm.5 5a1 1 0 00-2 0v5.5l3.85 2.3a1 1 0 101-1.73L12.5 11.5V7z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mt-10">
          Your account is under review
        </h2>
        <p className="text-gray-600 px-4 text-sm leading-relaxed">
          This process typically takes 2 days. We will notify you once it’s
          approved.
        </p>
      </div>

      {/* Contact Section */}
      <div className="w-full max-w-sm mt-25">
        <p className="text-xs text-gray-500 text-center">
          Here’s how you can contact us.
        </p>
        <button className="mt-3 w-full flex items-center justify-center bg-green-600 text-white font-medium py-3 rounded-lg shadow hover:bg-green-700 transition">
          <FaPhoneAlt className="mr-2" />
          Contact Us
        </button>
      </div>
    </div>
  );
}
