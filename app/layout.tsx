import type { Metadata } from "next";
import {
  ClerkProvider
} from '@clerk/nextjs';
import localFont from "next/font/local";
import "./globals.css";
import { ModelProvider } from "@/components/model-provider";
import { ToasterProvider } from "@/components/toaster-provider";
import { CrispProvider } from "@/components/crisp-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VAST AI",
  description: "AI Tools nexus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <CrispProvider/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModelProvider/>
        <ToasterProvider/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
