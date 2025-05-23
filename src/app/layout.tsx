
"use client"; // Add this because useEffect is used

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CookieConsentBanner from '@/components/CookieConsentBanner'; // Import the banner
import React, { useEffect } from 'react'; // Import useEffect

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = { // Cannot export metadata from a client component
//   title: 'Beacon - Automatic Tool Picker',
//   description: 'Beacon: Find the best test automation tools tailored to your needs.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Apply theme from localStorage on initial client load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      // Default to light theme or if 'light' is explicitly saved
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Metadata can be placed directly in head for client components or managed differently */}
        <title>Beacon - Automatic Tool Picker</title>
        <meta name="description" content="Beacon: Find the best test automation tools tailored to your needs." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <CookieConsentBanner />
        <Toaster />
      </body>
    </html>
  );
}
