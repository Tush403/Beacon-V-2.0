
"use client"; 

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import CookieConsentBanner from '@/components/CookieConsentBanner'; 
import React, { useEffect } from 'react'; 
import { usePathname, useRouter } from 'next/navigation'; // Added useRouter and usePathname

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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Apply theme from localStorage on initial client load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Check if the current navigation was a reload
    // This check needs to be client-side only.
    if (typeof window !== 'undefined' && window.performance) {
      const navigationEntries = window.performance.getEntriesByType("navigation");
      if (navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === "reload") {
        if (pathname !== '/') {
          router.push('/');
        }
      }
    }
  }, [pathname, router]); // Rerun if pathname or router changes, though primarily for initial check

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
