
"use client"; 

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CookieConsentBanner from '@/components/CookieConsentBanner'; 
import React, { useEffect } from 'react'; 
// Removed useRouter and usePathname as they are no longer used

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Removed router and pathname declarations

  useEffect(() => {
    // Apply theme from localStorage on initial client load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Removed the useEffect block that handled refresh redirection

  return (
    <html lang="en">
      <head>
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
