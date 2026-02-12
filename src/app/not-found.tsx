"use client";

import { useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

const NotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      redirect("/be-my-valentine");
    }, 1000);
  }, []);

  return (
    <main className="relative flex justify-center items-center bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 w-screen h-dvh overflow-hidden">
      <div className="z-2 relative flex flex-col justify-center items-center gap-4 bg-white/95 shadow-2xl p-4 rounded-xl w-[84%] max-w-200 h-[90vh] max-h-120 text-pink-600 text-lg md:text-xl lg:text-2xl text-center select-none">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src="/assets/error/not-found-error.webp"
            alt="Page not found..."
            fill
            className="object-contain pointer-events-none"
          />
        </div>
        <h2 className="flex justify-center items-center gap-4 w-full">
          ⚠️ Oops! The page you are looking for is not available...
        </h2>
      </div>
    </main>
  );
};

export default NotFound;
