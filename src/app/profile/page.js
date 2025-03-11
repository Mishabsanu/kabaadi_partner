"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Correct hook for Next.js 13+ App Router
import {
  FaHome,
  FaBox,
  FaGlobe,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "@/redux/auth/authSlice";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const menuItems = [
    { icon: <FaHome />, label: "My materials", path: "/materials" },
    { icon: <FaBox />, label: "Requests", path: "/requests" },
    { icon: <FaGlobe />, label: "Choose language", path: "/language" },
    {
      icon: <FaHome />,
      label: "Select Pickup Journey",
      path: "/pickup-journey",
    },
    { icon: <FaHeadset />, label: "Help", path: "/help" },
    {
      icon: <FaSignOutAlt />,
      label: "Logout",
      path: "/auth/enter-mobile",
      color: "text-red-500",
      onClick: () => {
        handleLogout();
      },
    },
  ];
  const handleLogout = () => {
    dispatch(setLogout({ current_user: null }));
  };
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-sm">
        <button
          onClick={() => router.back()}
          className="text-left text-black text-lg mb-3"
        >
          ← Back
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center mt-5">
        <div className="w-20 h-20 bg-[rgba(160,0,160,0.2)] text-purple-800 rounded-full flex items-center justify-center text-2xl font-bold">
          {user?.user?.first_name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-3 text-lg font-bold text-gray-800">
          {user?.user?.first_name} {user?.user?.lastName}
        </h2>
        <p className="text-gray-600 text-sm">+91 {user?.user?.mobile_no}</p>
      </div>

      {/* Menu List */}
      <div className="w-full max-w-sm mt-6">
        {menuItems.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            onClick={item.onClick || null}
            className={`w-full flex items-center p-4 bg-white rounded-lg shadow-md mb-2 transition ${
              item.color ? item.color : "text-gray-800"
            }`}
          >
            <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
            <span className="ml-4 flex-grow text-left">{item.label}</span>
            <span className="text-gray-400">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
