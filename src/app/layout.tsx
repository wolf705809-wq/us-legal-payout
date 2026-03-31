import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  other: {
    "activeprospect-domain-verification": "6F1LpZJgEjQA6ZlTRNd6VQ==",
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
        {/* TrustedForm — Consent Tags Enabled */}
        <Script
          id="trustedform"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {
    var field = 'xxTrustedFormCertUrl';
    var provideReferrer = false;
    var invertFieldSensitivity = false;
    var tf = document.createElement('script');
    tf.type = 'text/javascript'; tf.async = true;
    tf.src = 'https://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&provide_referrer=false&invert_field_sensitivity=false&get_on_request_id=true';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
})();`,
          }}
        />
      </body>
    </html>
  );
}
