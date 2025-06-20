import type React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IntentFlow - Garden Protocol Intent Lifecycle Simulator",
    template: "%s | IntentFlow",
  },
  description:
    "Visualize and understand the complete lifecycle of cross-chain intents in the Garden Protocol",
  keywords: [
    "garden protocol",
    "intent-based",
    "cross-chain",
    "defi",
    "blockchain",
    "cryptocurrency",
    "web3",
  ],
  authors: [{ name: "Qudus Adeyemi", url: "https://garden.finance" }],
  creator: "Qudus Adeyemi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "",
    title: "IntentFlow - Garden Protocol Intent Lifecycle Simulator",
    description:
      "Visualize and understand the complete lifecycle of cross-chain intents in the Garden Protocol",
    siteName: "IntentFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IntentFlow - Garden Protocol Intent Lifecycle Simulator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-satoshi antialiased">
        {children}
      </body>
    </html>
  );
}
