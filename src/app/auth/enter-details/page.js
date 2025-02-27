"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EnterDetails() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (name && lastName) {
      router.push('/vehicle/add-vehicle');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">

      <h1 className="text-xl font-bold mb-4">Enter Your Details</h1>
      <input 
        type="text" 
        className="border p-2 rounded w-64 text-center" 
        placeholder="First Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type="text" 
        className="border p-2 rounded w-64 text-center mt-2" 
        placeholder="Last Name" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)}
      />
      <button 
        className="bg-blue-500 text-white p-2 rounded mt-4" 
        onClick={handleContinue}
      >Continue</button>
    </div>
  );
}
