
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Sun, Moon, Search as SearchIcon, BookOpenCheck } from 'lucide-react';
import SettingsSheet from './SettingsSheet';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import ReleaseNotesDisplay from './ReleaseNotesDisplay';

const Header: React.FC = () => {
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);
  const [settingsSheetInitialView, setSettingsSheetInitialView] = useState<'main' | 'releaseNotes' | 'searchTool'>('main');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showReleaseNotesDialog, setShowReleaseNotesDialog] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialIsDarkMode = savedTheme === 'dark' ||
                              (!savedTheme && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(initialIsDarkMode);
    if (initialIsDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = useCallback(() => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleContactUs = () => {
    window.open('https://www.taodigitalsolutions.com/contact-us-lead-generation-form', '_blank');
  };

  const handleOpenSearch = () => {
    setSettingsSheetInitialView('searchTool');
    setIsSettingsSheetOpen(true);
  };

  return (
    <>
      <header className="bg-background text-foreground shadow-lg sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Side: TAO DIGITAL Branding */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
 <img src="/pdfs/logo.png" alt="TAO Digital Logo" className="h-8 w-8 md:h-10 md:w-10" />
          {/* Cog icon removed from here */}
          <div>
            <span className="block text-xl sm:text-2xl font-bold tracking-tight">
              TAO DIGITAL
            </span>
            <p className="text-xs sm:text-sm text-foreground/80 tracking-wide">
              Transformation Made Simple
            </p>
          </div>
        </div>

        {/* Right Side: App Title and Action Icons */}
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary">
            Beacon
          </h1>
          {/* Action Icons */}
          <Button variant="ghost" size="icon" onClick={handleContactUs} aria-label="Contact Us">
            <Mail className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleThemeToggle} aria-label="Toggle theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleOpenSearch} aria-label="Search tools">
            <SearchIcon className="h-5 w-5" />
          </Button>
           <Button variant="ghost" size="icon" onClick={() => setShowReleaseNotesDialog(true)} aria-label="View Release Notes">
            <BookOpenCheck className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Release Notes Dialog */}
      <Dialog open={showReleaseNotesDialog} onOpenChange={setShowReleaseNotesDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">Release Notes (V.2.0)</DialogTitle>
            <DialogDescription>
              Latest updates and fixes for Beacon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <ReleaseNotesDisplay />
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SettingsSheet
        open={isSettingsSheetOpen}
        onOpenChange={setIsSettingsSheetOpen}
        initialView={settingsSheetInitialView}
      />
    </>
  );
};

export default Header;
