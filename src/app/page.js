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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA38SscZbhQ8rpSTASajlKYpcLI6Hpf7JL8Q&s"
        alt="Scrapr Logo"
        className="w-40 animate-bounce"
      />
    </div>
  );
}
