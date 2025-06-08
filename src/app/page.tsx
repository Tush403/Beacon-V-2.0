
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Added Image import
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import ReleaseNotesDisplay from '@/components/ReleaseNotesDisplay';
import { cn } from '@/lib/utils';

const CURRENT_APP_VERSION = "V.2.0";
const ACKNOWLEDGED_VERSION_KEY = `acknowledged_beacon_version`;

export default function LandingPage() {
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  useEffect(() => {
    const acknowledgedVersion = localStorage.getItem(ACKNOWLEDGED_VERSION_KEY);
    if (acknowledgedVersion !== CURRENT_APP_VERSION) {
      setShowReleaseNotes(true);
    }
  }, []);

  useEffect(() => {
    const body = document.body;
    if (showReleaseNotes) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = ''; // Cleanup on component unmount
    };
  }, [showReleaseNotes]);

  const handleAcknowledge = () => {
    localStorage.setItem(ACKNOWLEDGED_VERSION_KEY, CURRENT_APP_VERSION);
    setShowReleaseNotes(false);
  };

  return (
    <>
      <div className={cn(
        "min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30",
        showReleaseNotes && "filter backdrop-blur-sm pointer-events-none"
      )}>
        {/* Top Bar for Logo */}
        <div className="w-full p-4 md:p-6">
          <Image
            src="/pdfs/logo1.png"
            alt="TAO Digital Solutions Logo"
            width={180} // Adjusted width for better proportion with h-12/h-14
            height={56}  // Corresponds to h-14 (56px), adjust if h-12 (48px) is preferred
            className="h-12 md:h-14 w-auto" // Responsive height
            priority // Prioritize loading the logo
          />
        </div>

        {/* Main Centered Content */}
        <div className="flex-grow flex flex-col items-center justify-center p-4 text-center -mt-16 md:-mt-20"> {/* Negative margin to pull content up slightly */}
          <main className="max-w-2xl animate-in fade-in-0 zoom-in-95 duration-500">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
              Welcome to TAO's Beacon
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed">
              Elevate your test automation strategy with TAO's Beacon. This enterprise-grade decision engine demystifies tool selection, providing data-driven recommendations to optimize your QA processes, accelerate delivery, and drive innovation at scale.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 px-10 py-6 text-lg group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </main>
        </div>
        
        <footer className="w-full p-4 text-center text-xs text-muted-foreground mt-auto">
          &copy; {new Date().getFullYear()} Tao Digital Solutions Inc. All rights reserved.
        </footer>
      </div>

      <Dialog open={showReleaseNotes} onOpenChange={setShowReleaseNotes}>
        <DialogContent 
          className="sm:max-w-2xl max-h-[80vh] flex flex-col" 
          onPointerDownOutside={(e) => e.preventDefault()} 
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">Beacon - Release Notes (V.2.0)</DialogTitle>
            <DialogDescription>
              Welcome! Please review the latest updates before proceeding.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ReleaseNotesDisplay />
          </div>
          <DialogFooter className="pt-4 mt-auto">
            <Button
              type="button"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={handleAcknowledge}
            >
              Acknowledge & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
