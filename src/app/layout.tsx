import "@/app/globals.css";
import type { Metadata } from "next";
import { arima } from "@/config/config";
import ConsoleBanner from "@/components/consoleBanner";

export const metadata: Metadata = {
  title: "Rahee | Be My Valentine",
  description: "A Valentine Proposal for Rahee!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${arima.className} antialiased`}
        suppressHydrationWarning
      >
        <ConsoleBanner nodeVersion={process.version} />
        {children}
      </body>
    </html>
  );
}
