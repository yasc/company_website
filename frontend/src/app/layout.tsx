import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { PalantirHeader } from "@/components/layout/PalantirHeader";
import { PalantirFooter } from "@/components/layout/PalantirFooter";
import "./globals.css";

// Body font: Inter (Sans-serif for UI elements, body text)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Headline font: Source Serif 4 (Serif for headlines, editorial authority)
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
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
        className={`${inter.variable} ${sourceSerif.variable} antialiased min-h-screen flex flex-col`}
      >
        <PalantirHeader />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <PalantirFooter />
      </body>
    </html>
  );
}
