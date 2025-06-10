// src/app/layout.tsx
import './globals.css'; // Correct path assuming globals.css is in src/app/
import type { Metadata } from 'next';

// Example: If you want to set up a global font
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Beacon - Test Automation Tool Picker',
  description: 'Discover the optimal test automation tools tailored to your project\'s unique needs. Beacon guides you through a comprehensive selection process, empowering you to make informed decisions with confidence.',
  // You can add more metadata here, like openGraph, icons, etc.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Example: <body className={inter.className}>{children}</body> */}
      <body>{children}</body>
    </html>
  );
}
