"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/language");
    }, 2000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#F6F6F6]">
      <img
        src="https://www.pngkit.com/png/detail/354-3549726_metal-prime-ventures-scrap-metals-logo-png.png"
        alt="Scrapr Logo"
        className="w-40 animate-bounce "
      />
    </div>
  );
}
