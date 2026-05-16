import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cohen Allingham · Mechatronics + AI systems",
  description:
    "University of Canterbury mechatronics student building practical AI automations, web app prototypes, and engineering projects.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>{children}</body>
    </html>
  );
}
