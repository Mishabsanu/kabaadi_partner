"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/language");
    }, 2000);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#F6F6F6]">
      <Image
        src="https://www.pngkit.com/png/detail/354-3549726_metal-prime-ventures-scrap-metals-logo-png.png"
        alt="Scrapr Logo"
        width={100}
        height={100}
        className="w-40 animate-bounce "
      />
    </div>
  );
}
