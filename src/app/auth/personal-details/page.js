"use client";

import { setLogin } from "@/redux/auth/authSlice";
import { MapPinIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const PersonalDetailsContent = () => {
  const [first_name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin_code, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [pan_no, setPan] = useState("");
  const [gst_no, setGst] = useState("");
  const [myLatitude, setMyLatitude] = useState("");
  const [myLongitude, setMyLongitude] = useState("");
  const user = useSelector((state) => state.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  // Function to capture user location and autofill address fields
  const handleAutoFill = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.address) {
              setStreet(data.address.road || "");
              setCity(data.address.city || data.address.town || "");
              setState(data.address.state || "");
              setPincode(data.address.postcode || "");
              setCountry(data.address.country || "");
              setMyLatitude(latitude);
              setMyLongitude(longitude);

              // ✅ Success Toast Notification
              toast.success("Address auto-filled successfully!");
            } else {
              toast.error("Failed to retrieve address. Try again.");
            }
          } catch (error) {
            console.error("Error fetching address:", error);
            toast.error("Error fetching address. Please try again.");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error(
            "Unable to access location. Please enable location services."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleContinue = async () => {
    if (
      first_name &&
      last_name &&
      city &&
      state &&
      pin_code &&
      country &&
      pan_no &&
      gst_no
    ) {
      try {
        const response = await axios.post(
          "https://kabadiwale-backend.onrender.com/api/V1/partner/personal-details",
          {
            first_name,
            last_name,
            address,
            city,
            state,
            pin_code,
            country,
            pan_no,
            gst_no,
            latitude: myLatitude,
            longitude: myLongitude,
            userId: user?.user?._id,
          }
        );
        localStorage.setItem("progressStep", "personalDetails");
        if (response.data) {
          dispatch(
            setLogin({
              user: response?.data?.result,
            })
          );

          // ✅ Success Toast Notification
          toast.success("Details submitted successfully!");

          router.push("/under-review");
        } else {
          toast.error(
            response.data.message || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        console.error("API Error:", error);
        toast.error(
          error.response?.data?.message ||
            "Failed to submit details. Please check your inputs and try again."
        );
      }
    } else {
      toast.error("Please fill all required fields.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4 sm:px-6 md:px-8 py-3 items-center">
      {/* Container */}
      <div className="w-full max-w-xl mx-auto bg-white p-4 rounded-lg">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="text-left text-black text-base mb-6"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold text-black mb-6">
          Enter your details
        </h1>

        {/* Name Input Fields */}
        <div className="mb-3">
          <label className="text-base font-medium">First Name</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="text-base font-medium">Last Name</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Address Fields */}
        <div className="mb-3 relative">
          <label className="text-base font-medium">Street Address</label>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base pr-10"
              placeholder="Street"
              value={address}
              onChange={(e) => setStreet(e.target.value)}
            />
            <MapPinIcon
              className="absolute right-3 top-3 h-6 w-6 text-gray-600 cursor-pointer"
              onClick={handleAutoFill}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="w-full">
            <label className="text-base font-medium">City</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-base font-medium">State</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3">
          <div className="w-full">
            <label className="text-base font-medium">Pincode</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="Pincode"
              value={pin_code}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-base font-medium">Country</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>

        {/* PAN & GST Fields */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
          <div className="w-full">
            <label className="text-base font-medium">PAN Number</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="ABCDE1234F"
              value={pan_no}
              onChange={(e) => setPan(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-base font-medium">GST Number</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="22AAAAA0000A1Z5"
              value={gst_no}
              onChange={(e) => setGst(e.target.value)}
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
            first_name &&
            last_name &&
            city &&
            state &&
            pin_code &&
            country &&
            pan_no &&
            gst_no
              ? "bg-[#8B008B]"
              : "bg-[#af6aaf] cursor-not-allowed"
          }`}
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
    </div>
  );
};

export default PersonalDetailsContent;
