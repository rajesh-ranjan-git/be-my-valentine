"use client";

import "@/app/globals.css";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError() {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <main className="relative flex justify-center items-center bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 w-screen h-dvh overflow-hidden">
          <div className="z-2 relative flex flex-col justify-center items-center gap-4 bg-white/95 shadow-2xl p-4 rounded-xl w-[84%] max-w-200 h-[90vh] max-h-120 text-pink-600 text-lg md:text-xl lg:text-2xl text-center select-none">
            <div className="relative w-full h-64 overflow-hidden">
              <Image
                src="/assets/error/something-went-wrong-error.webp"
                alt="Something went wrong..."
                fill
                className="object-contain pointer-events-none"
              />
            </div>
            <h2 className="flex justify-center items-center gap-4 w-full">
              ❌ Oops! Something went wrong...
            </h2>
          </div>
        </main>
      </body>
    </html>
  );
}
