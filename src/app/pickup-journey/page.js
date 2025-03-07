"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const pincodes = ["110001", "110002", "110003", "400001", "400002", "400003"];

const RoutePlanner = () => {
  const [routes, setRoutes] = useState({});
  const [routeTable, setRouteTable] = useState([]);
  const router = useRouter();
  const selectedPincodes = Object.values(routes).flat();

  const handleSelect = (day, selectedOptions) => {
    setRoutes((prev) => ({
      ...prev,
      [day]: selectedOptions.map((option) => option.value),
    }));
  };

  const generateRoutes = () => {
    const newRoutes = Object.entries(routes).map(([day, pincodeList]) => ({
      day,
      pincodes: pincodeList.length > 0 ? pincodeList : ["Off Day"],
    }));
    setRouteTable(newRoutes);
  };

  const deleteRoute = (index) => {
    const newTable = routeTable.filter((_, i) => i !== index);
    setRouteTable(newTable);

    const updatedRoutes = {};
    newTable.forEach((route) => {
      if (route.pincodes[0] !== "Off Day") {
        updatedRoutes[route.day] = route.pincodes;
      }
    });
    setRoutes(updatedRoutes);
  };

  return (
    // <div className="p-4 max-w-xl  bg-white shadow-md rounded-md w-full">
    <div className="w-full max-w-xl p-8 bg-white rounded-lg mx-auto">
      {/* </div> */}
      <button
        onClick={() => router.back()}
        className="text-left text-black text-base mb-6"
      >
        ← Back
      </button>

      {/* Title */}

      <h1 className="text-2xl font-bold text-black mb-6">Route Planner</h1>

      <div className="space-y-3">
        {daysOfWeek.map((day) => {
          const availablePincodes = pincodes.filter(
            (pincode) =>
              !selectedPincodes.includes(pincode) ||
              (routes[day] || []).includes(pincode)
          );

          return (
            <div
              key={day}
              className="flex flex-col sm:flex-row sm:items-center gap-2 bg-gray-50 p-3 rounded-md shadow w-full"
            >
              {" "}
              {/* Adjusted width */}
              <span className="font-bold text-gray-700 w-full sm:w-32">
                {day}:
              </span>{" "}
              {/* Fixed width for labels */}
              <div className="w-full sm:w-auto">
                {" "}
                {/* Flexible width for dropdown */}
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
                  className="w-full  sm:w-96"
                />
              </div>
            </div>
          );
        })}

        {/* Disabled Sunday */}
        <div className="flex items-center gap-2 bg-gray-200 p-3 rounded-md shadow-md opacity-70">
          <span className="font-bold text-gray-700 w-full sm:w-32">
            Sunday:
          </span>
          <span className="text-gray-500">Off Day</span>
        </div>
      </div>
      <button
        className="mt-4 w-full bg-[#8B008B] hover:bg-[#6F006F] text-white font-semibold py-2 rounded-md transition duration-200"
        onClick={generateRoutes}
      >
        Generate Route
      </button>

      {routeTable.length > 0 && (
        <div className="mt-6 rounded-md  w-full overflow-x-auto">
          {" "}
          {/* Responsive table */}
          <h3 className="text-lg font-semibold mb-3 text-black">
            Plan Journey
          </h3>
          <table className="w-full text-sm border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-[#8B008B] text-white text-left">
                <th className="p-2 border border-gray-300">Day</th>
                <th className="p-2 border border-gray-300">Pincodes</th>
                <th className="p-2 border border-gray-300 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {routeTable.map((route, index) => (
                <tr
                  key={index}
                  className="text-gray-800 bg-white hover:bg-gray-100"
                >
                  <td className="p-2 border border-gray-300">{route.day}</td>
                  <td
                    className={`p-2 border border-gray-300 ${
                      route.pincodes[0] === "Off Day"
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {route.pincodes.join(", ")}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    {route.pincodes[0] !== "Off Day" && (
                      <button
                        onClick={() => deleteRoute(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm font-semibold transition duration-200"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* Show Sunday as Off Day */}
              <tr className="text-gray-800 bg-gray-200">
                <td className="p-2 border border-gray-300">Sunday</td>
                <td className="p-2 border border-gray-300 text-red-500 font-bold">
                  Off Day
                </td>
                <td className="p-2 border border-gray-300 text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoutePlanner;
