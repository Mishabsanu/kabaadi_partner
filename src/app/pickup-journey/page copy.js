"use client";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { ArrowLeft, Search } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Beats() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("today");
  const [currentDate, setCurrentDate] = useState("");
  const [tomorrowDate, setTomorrowDate] = useState("");
  const [monthDates, setMonthDates] = useState([]);
  console.log(monthDates, "monthDates");

  const [selectedDate, setSelectedDate] = useState(null);

  const { data: userData, error: userError } = usePersistLoginQuery();
  const user = useMemo(() => userData?.result || {}, [userData]);

  useEffect(() => {
    if (userError) {
      toast.error(userError?.data?.message);
    }
  }, [userError]);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    setTomorrowDate(
      tomorrow.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );

    generateMonthDates();
  }, []);

  const generateMonthDates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const datesArray = [];

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const date = new Date(year, month, day);
      const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      datesArray.push(formattedDate);
    }

    setMonthDates(datesArray);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDate(null);
    localStorage.setItem("activeTab", tab);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getDayName = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const todayDay = getDayName(new Date());
  const tomorrowDay = getDayName(new Date(Date.now() + 86400000)); // Tomorrow
  const selectedDay = selectedDate
    ? getDayName(new Date(selectedDate))
    : todayDay; // Default to today if no date is selected

  const pickupData = user?.picking?.filter((item) => {
    if (activeTab === "today") {
      return item.day === todayDay;
    } else if (activeTab === "tomorrow") {
      return item.day === tomorrowDay;
    } else if (activeTab === "monthly") {
      return item.day === selectedDay; // If no date is selected, it will default to today
    }
    return false;
  });

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <Head>
        <title>Beats UI</title>
      </Head>

      {/* Header */}
      <div className="bg-[#8B008B] text-white flex items-center p-4">
        <button className="text-white text-xl">
          <ArrowLeft size={24} />
        </button>
        <h1 className="mx-auto text-lg font-semibold">Picking Journey</h1>
        <div className="text-xl">
          <Search size={24} />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white flex justify-around py-2 border-b">
        <button
          onClick={() => handleTabChange("today")}
          className={`${
            activeTab === "today"
              ? "text-[#af6aaf] border-b-2 border-[#af6aaf] pb-2"
              : "text-gray-500"
          }`}
        >
          Today's
        </button>
        <button
          onClick={() => handleTabChange("tomorrow")}
          className={`${
            activeTab === "tomorrow"
              ? "text-[#af6aaf] border-b-2 border-[#af6aaf] pb-2"
              : "text-gray-500"
          }`}
        >
          Tomorrow's
        </button>
        <button
          onClick={() => handleTabChange("monthly")}
          className={`${
            activeTab === "monthly"
              ? "text-[#af6aaf] border-b-2 border-[#af6aaf] pb-2"
              : "text-gray-500"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Monthly Date List */}
      {activeTab === "monthly" && (
        <div className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-md">
          <h2 className="text-gray-700 font-semibold">Select Date</h2>

          {/* Weekly Labels (M, T, W, etc.) */}
          <div className="grid grid-cols-7 gap-2 mt-2 text-center font-semibold text-gray-600">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={index}
                className="w-10 h-6 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates in Weekly Format */}
          <div className="grid grid-cols-7 gap-2 mt-2">
            {monthDates.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm ${
                  selectedDate === day
                    ? "bg-[#af6aaf] text-white" // Active selected date
                    : day === currentDate && !selectedDate
                    ? "bg-[#af6aaf] text-white" // Highlight today's date only if no date is selected
                    : "bg-gray-200"
                }`}
              >
                {day?.split(" ")[1]} {/* Extracting date number */}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Beat Info */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-md">
        <div className="flex justify-between text-[#af6aaf]">
          <span>Beat</span>
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {activeTab === "tomorrow"
              ? tomorrowDate
              : selectedDate || currentDate}
          </span>
        </div>
        <div className="flex justify-between mt-2 text-gray-700">
          <span>
            Picking {pickupData?.length}/{pickupData?.length}
          </span>
          <span>Off-beat picking 0</span>
        </div>
      </div>

      {/* Pickup Pin Codes Section */}
      <div className="bg-white mx-4 mt-4 p-4 rounded-lg shadow-md">
        <h2 className="text-gray-700 font-semibold">Pickup Pin Codes</h2>
        <div className="mt-2">
          {pickupData?.length > 0 ? (
            pickupData.map((items, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b"
              >
                <span className="text-gray-700">
                  Pincode: {items?.pin_codes}
                </span>
                <button className="text-[#af6aaf] text-sm">View</button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No pickups found for this date.</p>
          )}
        </div>
      </div>

      {/* No Beats Found */}
      {pickupData?.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow">
          <img src="/icons/no-data.svg" alt="No Beats" className="mb-4 w-24" />
          <h2 className="text-lg font-semibold">No Beats Found</h2>
          <p className="text-gray-500 text-center px-6">
            No Beats found for this day. Please check for another day!
            <button
              onClick={() => router.push("/create-pick-list")}
              className="bg-[#8B008B] w-52 mt-6 py-2 rounded-lg font-medium text-white cursor-pointer"
            >
              Create Picking
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
