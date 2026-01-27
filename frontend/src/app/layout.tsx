import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { PalantirHeader } from "@/components/layout/PalantirHeader";
import { PalantirFooter } from "@/components/layout/PalantirFooter";
import "./globals.css";

// Body font: Inter (Sans-serif for UI elements, body text)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headline font: Inter Tight (High-contrast sans for headlines)
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Mono font: JetBrains Mono (For data, charts, and technical elements)
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Applied Economics",
    template: "%s | Applied Economics",
  },
  description: "Rigorous economic research and data-driven insights for better decision making.",
  keywords: ["economics", "research", "data", "consulting", "policy"],
  authors: [{ name: "Applied Economics" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Applied Economics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-charcoal focus:border focus:border-charcoal focus:rounded"
        >
          Skip to main content
        </a>
        <PalantirHeader />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <PalantirFooter />
      </body>
    </html>
  );
}
