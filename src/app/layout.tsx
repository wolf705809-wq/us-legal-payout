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
    default: "TruckSettlementPro — Truck Accident Case Evaluation Tool",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PYHW63VZFS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PYHW63VZFS');
          `}
        </Script>
        <Script
          id="trustedform"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {
      var tf = document.createElement('script');
      tf.type = 'text/javascript'; tf.async = true;
      tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
        '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
        new Date().getTime() + Math.random();
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(tf, s);
    })();`
          }}
        />
      </body>
    </html>
  );
}
