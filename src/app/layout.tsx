import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#e01f1f",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "PACIFIC×CROSS ADVISOR HUB — Protect Your Future. No Cap.",
  description:
    "Your editorial command center for Pacific Cross insurance. Explore Blue Royale & FlexiShield, access training tools, social media content, and client resources.",
  keywords: [
    "Pacific Cross",
    "Blue Royale",
    "FlexiShield",
    "Insurance Philippines",
    "Health Insurance",
    "OFW Insurance",
    "Financial Literacy",
    "HMO Enhancer",
  ],
  authors: [{ name: "Pacific Cross Insurance" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Pacific Cross Advisor Hub",
    description: "Your editorial command center for Blue Royale & FlexiShield",
    type: "website",
    siteName: "Pacific Cross",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PC×HUB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Barlow+Condensed:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* Noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />
        {/* Vignette overlay */}
        <div className="vignette-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
