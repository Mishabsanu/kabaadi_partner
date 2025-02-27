"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const vehicles = [
  { id: 1, name: "Cycle", icon: "🚲" },
  { id: 2, name: "Thela", icon: "🛒" },
  { id: 3, name: "Bike", icon: "🏍️" },
  { id: 4, name: "E-rickshaw", icon: "🚛" },
  { id: 5, name: "Mini-truck", icon: "🚚" },
  { id: 6, name: "Truck", icon: "🚛" },
];

const weightEquipments = [
  { id: 1, name: "Digital Machine", icon: "🖥️" },
  { id: 2, name: "Tarazu", icon: "⚖️" },
];

export default function AddVehicle() {
  const router = useRouter(); // Initialize router
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const requiresVehicleNumber = selectedVehicle !== 1 && selectedVehicle !== 2;

  const handleSubmit = () => {
    if (
      !selectedVehicle ||
      !vehicleName ||
      !selectedEquipment ||
      (requiresVehicleNumber && !vehicleNumber)
    )
      return;
    setIsModalOpen(true); // Show modal after submission
  };

  const handleOkayClick = () => {
    setIsModalOpen(false);
    router.push("/under-review"); // Redirect to UnderReview page
  };

  return (
    <div className="min-h-screen bg-white px-6 py-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <button className="text-xl">←</button>
        <h1 className="text-2xl font-bold">Add Vehicle</h1>
      </div>

      {/* Choose Vehicle */}
      <h2 className="mt-4 text-lg font-semibold">Choose your vehicle</h2>
      <div className="grid grid-cols-3 gap-4 mt-3">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle.id)}
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
              selectedVehicle === vehicle.id
                ? "border-purple-400 bg-purple-200"
                : "border-gray-300"
            }`}
          >
            <span className="text-2xl">{vehicle.icon}</span>
            <p className="mt-1 text-sm">{vehicle.name}</p>
          </div>
        ))}
      </div>

      {/* Vehicle Name */}
      <h2 className="mt-6 text-lg font-semibold">Vehicle Name</h2>
      <input
        type="text"
        placeholder="Enter Vehicle Name"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
        className="mt-2 w-full border rounded-lg p-3 text-lg outline-none"
      />

      {/* Vehicle Number (Only if Required) */}
      {requiresVehicleNumber && (
        <>
          <h2 className="mt-4 text-lg font-semibold">Vehicle Number</h2>
          <input
            type="text"
            placeholder="Enter Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="mt-2 w-full border rounded-lg p-3 text-lg outline-none"
          />
        </>
      )}

      {/* Select Weight Equipment */}
      <h2 className="mt-6 text-lg font-semibold">
        Select your weight equipment
      </h2>
      <div className="mt-3 space-y-3">
        {weightEquipments.map((equipment) => (
          <div
            key={equipment.id}
            onClick={() => setSelectedEquipment(equipment.id)}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
              selectedEquipment === equipment.id
                ? "border-purple-500 bg-purple-100"
                : "border-gray-300"
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{equipment.icon}</span>
              <p className="text-lg">{equipment.name}</p>
            </div>
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                selectedEquipment === equipment.id
                  ? "border-purple-500 bg-purple-500"
                  : "border-gray-400"
              }`}
            >
              {selectedEquipment === equipment.id && (
                <span className="text-white">✔</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={
          !selectedVehicle ||
          !vehicleName ||
          !selectedEquipment ||
          (requiresVehicleNumber && !vehicleNumber)
        }
        className={`w-full mt-6 py-2 rounded-lg text-white font-medium font-semibold ${
          selectedVehicle &&
          vehicleName &&
          (!requiresVehicleNumber || vehicleNumber || selectedEquipment)
            ? "bg-[#8B008B]"
            : "bg-[#af6aaf] cursor-not-allowed"
        }`}
      >
        Continue
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <span className="text-green-600 text-2xl">✔</span>
              </div>
            </div>
            <h2 className="text-xl font-bold">Your Vehicle is Added</h2>
            <p className="mt-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full inline-block">
              {requiresVehicleNumber ? vehicleNumber : "N/A"}
            </p>
            <button
              onClick={handleOkayClick} // Redirect to UnderReview page
              className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
