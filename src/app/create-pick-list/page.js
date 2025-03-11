"use client";

import { useAddRoutePlanMutation } from "@/services/auth/authApi";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const RoutePlanner = () => {
  const [routes, setRoutes] = useState({});
  const [pinCodes, setPinCodes] = useState([]);
  const router = useRouter();

  const user = useSelector((state) => state.auth);
  const latitude = user?.user?.latitude ?? null;
  const longitude = user?.user?.longitude ?? null;

  const [addRoutePlan] = useAddRoutePlanMutation(user?.user?._id);

  const fetchNearbyPincodes = useCallback(async () => {
    try {
      const reverseGeocodeRes = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: { lat: latitude, lon: longitude, format: "json" },
        }
      );

      if (!reverseGeocodeRes.data || !reverseGeocodeRes.data.address) {
        toast.error("Invalid location response!");
        return;
      }

      const overpassQuery = `[out:json]; node [postal_code] (around:30000, ${latitude}, ${longitude}); out;`;
      const overpassURL = "https://overpass-api.de/api/interpreter";
      const overpassRes = await axios.post(overpassURL, overpassQuery, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (overpassRes.data && overpassRes.data.elements.length > 0) {
        const postalCodes = [
          ...new Set(
            overpassRes.data.elements.map((el) => el.tags.postal_code)
          ),
        ];
        setPinCodes(postalCodes);
      } else {
        toast.error("No pincodes found within 30km!");
      }
    } catch (error) {
      console.error("Error fetching pincodes:", error);
      toast.error("Failed to fetch nearby pincodes!");
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchNearbyPincodes();
    }
  }, [latitude, longitude, fetchNearbyPincodes]);

  const handleSelect = (day, selectedOptions) => {
    setRoutes((prev) => ({
      ...prev,
      [day]: selectedOptions.map((option) => option.value),
    }));
  };

  // Get all selected pin codes across the week
  const getSelectedPincodes = () => {
    return Object.values(routes).flat();
  };

  const generateRoutes = async () => {
    const newRoutes = Object.entries(routes).map(([day, pincodeList]) => ({
      day,
      pin_codes: pincodeList.length > 0 ? pincodeList : ["Off Day"],
    }));

    try {
      await addRoutePlan({
        routes: newRoutes,
        user_id: user?.user?._id,
      });

      toast.success("Route plan added successfully!");
      router.push("/pickup-journey"); // Redirect to the next page
    } catch (error) {
      console.error("Error saving routes:", error);
      toast.error("Failed to save route plan.");
    }
  };

  return (
    <div className="w-full max-w-xl p-8 bg-white rounded-lg mx-auto">
      <Head>
        <title>Weekly Routes</title>
      </Head>

      <div className="bg-[#8B008B] text-white w-full max-w-2xl flex items-center px-5 py-4 rounded-xl shadow-lg">
        <button
          onClick={() => router.back()}
          className="text-white hover:opacity-80 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="mx-auto text-lg font-bold">Route Planner</h1>
      </div>

      <div className="space-y-3">
        {daysOfWeek.map((day) => {
          const selectedPincodes = getSelectedPincodes();
          const availablePincodes = pinCodes.filter(
            (pincode) =>
              !selectedPincodes.includes(pincode) ||
              (routes[day] && routes[day].includes(pincode))
          );

          return (
            <div
              key={day}
              className="flex flex-col sm:flex-row sm:items-center gap-2 bg-gray-50 p-3 rounded-md shadow w-full"
            >
              <span className="font-bold text-gray-700 w-full sm:w-32">
                {day}:
              </span>
              <div className="w-full sm:w-auto">
                <MultiSelect
                  options={availablePincodes.map((pincode) => ({
                    label: pincode,
                    value: pincode,
                  }))}
                  value={(routes[day] || []).map((pincode) => ({
                    label: pincode,
                    value: pincode,
                  }))}
                  onChange={(selected) => handleSelect(day, selected)}
                  labelledBy="Select Pincodes"
                  className="w-full sm:w-96"
                  hasSelectAll={true}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={generateRoutes}
        className="mt-4 w-full bg-[#8B008B] hover:bg-[#6F006F] text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Generate Route
      </button>
    </div>
  );
};

export default RoutePlanner;
