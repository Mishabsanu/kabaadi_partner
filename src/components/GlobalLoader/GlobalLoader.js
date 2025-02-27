"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const GlobalLoader = () => {
  const pathname = usePathname(); // Detect route changes
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Show loader when path changes
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading delay

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    loading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-[#8B008B]"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="#8B008B"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
          <p className="text-white mt-2">Loading...</p>
        </div>
      </div>
    )
  );
};

export default GlobalLoader;
