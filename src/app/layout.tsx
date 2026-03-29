import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DisclaimerBar from "@/components/DisclaimerBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TruckSettlementPro — Truck Accident Settlement Calculator",
    template: "%s | TruckSettlementPro",
  },
  description:
    "Find out what your truck accident case may be worth. State-specific settlement estimates powered by real FMCSA and NHTSA crash data.",
  metadataBase: new URL("https://trucksettlementpro.com"),
  openGraph: {
    siteName: "TruckSettlementPro",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <DisclaimerBar />
      </body>
    </html>
  );
}
