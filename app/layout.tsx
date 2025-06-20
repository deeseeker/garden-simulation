import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "IntentFlow - Garden Protocol Intent Lifecycle Simulator",
    template: "%s | IntentFlow",
  },
  description: "Visualize and understand the complete lifecycle of cross-chain intents in the Garden Protocol",
  keywords: ["garden protocol", "intent-based", "cross-chain", "defi", "blockchain", "cryptocurrency", "web3"],
  authors: [{ name: "Garden Protocol Team", url: "https://garden.finance" }],
  creator: "Garden Protocol",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intentflow.garden.finance",
    title: "IntentFlow - Garden Protocol Intent Lifecycle Simulator",
    description: "Visualize and understand the complete lifecycle of cross-chain intents in the Garden Protocol",
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
  twitter: {
    card: "summary_large_image",
    title: "IntentFlow - Garden Protocol Intent Lifecycle Simulator",
    description: "Visualize and understand the complete lifecycle of cross-chain intents in the Garden Protocol",
    images: ["/og-image.png"],
    creator: "@gardenfinance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">{children}</body>
    </html>
  )
}
