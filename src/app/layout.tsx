import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pacific Cross Advisor Hub | Insurance Training & Resources",
  description: "Your comprehensive resource for becoming a trusted Pacific Cross insurance advisor. Learn Blue Royale, FlexiShield products, practice spiels, and protect Filipino families.",
  keywords: ["Pacific Cross", "Insurance", "Philippines", "Blue Royale", "FlexiShield", "HMO", "Health Insurance", "Advisor Training", "OFW Insurance"],
  authors: [{ name: "Pacific Cross Philippines" }],
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Pacific Cross Advisor Hub",
    description: "Learn, practice, and grow as a trusted insurance advisor",
    url: "https://pacificcross.com.ph",
    siteName: "Pacific Cross Advisor Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Cross Advisor Hub",
    description: "Your journey as a trusted insurance advisor starts here",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
