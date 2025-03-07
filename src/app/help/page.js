"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

const Help = () => {
  const router = useRouter();
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="text-left text-black text-lg mb-3"
      >
        ← Help
      </button>
      {/* <div className="flex items-center mb-4 text-lg font-bold">
        <IoArrowBack className="mr-2 text-xl" /> Help
      </div> */}

      {/* Image & Contact Info */}
      <div className=" p-6 rounded-2xl text-center">
        <Image
          src="/help.avif"
          width={100}
          height={100}
          alt="Help"
          className="w-full max-w-sm mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold">Contact Us</h2>
        <p className="text-sm text-gray-600">
          Get in touch with us for assistance and queries, we will be happy to
          help you.
        </p>
      </div>

      {/* Contact Options */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <FaPhone className="text-[#8B008B] text-xl" />
            <span className="text-base font-medium">Call Us</span>
          </div>
          <IoChevronForward className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <FaWhatsapp className="text-[#8B008B] text-xl" />
            <span className="text-base font-medium">WhatsApp Us</span>
          </div>
          <IoChevronForward className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Help;
