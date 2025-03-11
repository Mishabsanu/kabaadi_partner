"use client";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";

export default function WeeklyRoutes() {
  const router = useRouter();
  const { data: userData, error: userError } = usePersistLoginQuery();
  const user = useMemo(() => userData?.result || {}, [userData]);

  useEffect(() => {
    if (userError) {
      toast.error(userError?.data?.message || "An error occurred.");
    }
  }, [userError]);

  useEffect(() => {
    if (!user?.picking) {
      router.push("/create-pick-list");
    }
  }, [user?.picking, router]);

  const weeklyRoutes = [
    { day: "Monday", off: false },
    { day: "Tuesday", off: false },
    { day: "Wednesday", off: false },
    { day: "Thursday", off: false },
    { day: "Friday", off: false },
    { day: "Saturday", off: false },
    { day: "Sunday", off: true },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col items-center p-6">
      <Head>
        <title>Weekly Routes</title>
      </Head>

      {/* Header */}
      <div className="bg-[#8B008B] text-white w-full max-w-2xl flex items-center px-5 py-4 rounded-xl shadow-lg">
        <button
          onClick={() => router.push("/under-review")}
          className="text-white hover:opacity-80 transition"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="mx-auto text-lg font-bold">Weekly Routes</h1>
      </div>

      {/* Weekly Routes List */}
      <div className="mt-6 space-y-5 w-full max-w-2xl">
        {weeklyRoutes.map(({ day, off }) => {
          const pinCodes =
            user?.picking?.filter((item) => item.day === day) || [];

          return (
            <div
              key={day}
              className={`p-6 rounded-xl shadow-lg transition transform hover:scale-105 backdrop-blur-lg ${
                off
                  ? "bg-gray-200 text-gray-500 border border-gray-300"
                  : "bg-white text-gray-800 border border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{day}</span>
                {off ? (
                  <span className="text-red-500 font-medium">Day Off</span>
                ) : pinCodes.length > 0 ? (
                  <button
                    onClick={() => router.push("/create-pick-list")}
                    className="bg-[#8B008B] text-white text-sm px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/create-pick-list")}
                    className="bg-[#8B008B] text-white text-sm px-5 py-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    Create
                  </button>
                )}
              </div>

              {!off && pinCodes.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600">
                    Pin Codes:
                  </p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {" "}
                    {/* Increased gap */}
                    {pinCodes.map((item, index) => (
                      <div key={index} className="flex flex-wrap gap-2">
                        {Array.isArray(item.pin_codes) ? (
                          item.pin_codes.map((pin, i) => (
                            <span
                              key={i}
                              className="bg-gradient-to-r from-purple-100 to-pink-200 text-purple-700 text-xs font-semibold px-4 py-1 rounded-full shadow-sm"
                            >
                              {pin}
                            </span>
                          ))
                        ) : (
                          <span className="bg-gradient-to-r from-purple-100 to-pink-200 text-purple-700 text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                            {item.pin_codes}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
