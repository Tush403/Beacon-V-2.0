
"use client";

import React from 'react';
import Link from 'next/link';
// Image component is no longer needed
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 text-center">
      {/* Background Image and related classes removed */}
      <main className="max-w-2xl animate-in fade-in-0 zoom-in-95 duration-500"> {/* z-10 removed */}
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
          Welcome to Beacon
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed">
          Discover the optimal test automation tools tailored to your project's unique needs.
          Beacon guides you through a comprehensive selection process, empowering you to make informed decisions with confidence.
        </p>
        <Link href="/dashboard" passHref>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-10 py-6 text-lg group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </main>
      <footer className="absolute bottom-8 text-xs text-muted-foreground"> {/* z-10 removed, but absolute positioning kept for bottom placement */}
        &copy; {new Date().getFullYear()} Tao Digital Solutions Inc. All rights reserved.
      </footer>
    </div>
  );
}
