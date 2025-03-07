"use client";
import { setUserDetails } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MapPinIcon } from "@heroicons/react/24/solid";
export default function EnterDetails() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [myLatitude, setMyLatitude] = useState("");
  const [myLongitude, setMyLongitude] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  // Function to capture user location and autofill address fields
  const handleAutoFill = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
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
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleContinue = () => {
    if (name && lastName && city && state && pincode && country && pan && gst) {
      dispatch(
        setUserDetails({
          name,
          lastName,
          street,
          city,
          state,
          pincode,
          country,
          pan,
          gst,
          myLatitude,
          myLongitude,
        })
      );
      // router.push("/vehicle/add-vehicle");
      router.push("/under-review");
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
              value={name}
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
              value={lastName}
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
              value={street}
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
              value={pincode}
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
              value={pan}
              onChange={(e) => setPan(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="text-base font-medium">GST Number</label>
            <input
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full text-base"
              placeholder="22AAAAA0000A1Z5"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`w-full mt-6 py-2 rounded-lg text-white font-medium ${
            name &&
            lastName &&
            city &&
            state &&
            pincode &&
            country &&
            pan &&
            gst
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
}
