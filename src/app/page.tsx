
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import ReleaseNotesDisplay from '@/components/ReleaseNotesDisplay';
import { cn } from '@/lib/utils';

const CURRENT_APP_VERSION = "V.2.0"; // Ensure this matches the version in ReleaseNotesDisplay
const ACKNOWLEDGED_VERSION_KEY = `acknowledged_beacon_version`; // Key for localStorage

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
        "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4 text-center",
        showReleaseNotes && "filter backdrop-blur-sm pointer-events-none"
      )}>
        <main className="max-w-2xl animate-in fade-in-0 zoom-in-95 duration-500">
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
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 px-10 py-6 text-lg group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </main>
        <footer className="absolute bottom-8 text-xs text-muted-foreground">
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
            <DialogTitle className="text-xl text-primary">ToolWise - Release Notes (V.2.0)</DialogTitle>
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
