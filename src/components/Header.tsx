
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Sun, Moon, Search as SearchIcon, BookOpenCheck, Menu as MenuIcon } from 'lucide-react';
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

  const handleOpenSettingsMenu = () => {
    setSettingsSheetInitialView('main');
    setIsSettingsSheetOpen(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-[hsl(255,65%,50%)] to-[hsl(295,75%,70%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Side: TAO DIGITAL Branding - REMOVED */}
        {/* An empty div or span can be used as a placeholder if flexbox needs a child for justify-between, or adjust justify-end on the right group */}
        <div> {/* This div ensures the Beacon title and icons are grouped and pushed to the right by justify-between */}
           {/* This space intentionally left blank or can be used for a different element if needed */}
        </div>

        {/* Right Side: App Title and Action Icons */}
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground">
            Beacon
          </h1>
          {/* Action Icons */}
          <Button variant="ghost" size="icon" onClick={handleContactUs} className="text-primary-foreground hover:bg-white/10" aria-label="Contact Us">
            <Mail className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="text-primary-foreground hover:bg-white/10" aria-label="Toggle theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleOpenSearch} className="text-primary-foreground hover:bg-white/10" aria-label="Search tools">
            <SearchIcon className="h-5 w-5" />
          </Button>
           <Button variant="ghost" size="icon" onClick={() => setShowReleaseNotesDialog(true)} className="text-primary-foreground hover:bg-white/10" aria-label="View Release Notes">
            <BookOpenCheck className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleOpenSettingsMenu} className="text-primary-foreground hover:bg-white/10" aria-label="Open App Menu">
            <MenuIcon className="h-5 w-5" /> {/* Changed from Settings to MenuIcon */}
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
