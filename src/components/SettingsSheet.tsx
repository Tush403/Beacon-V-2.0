
"use client";

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, BookOpenCheck, Palette, Mail, Search, LogIn, Menu, Sun, Moon, Sparkles, CheckCircle2, XCircle, Pin, AlertTriangle, Gem, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsSheetProps {
  onOpenChange: (open: boolean) => void;
}

const ReleaseNotesContent: React.FC = () => (
  <div className="space-y-6 py-4 text-sm h-full overflow-y-auto px-1">
    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-2">
        <Badge variant="default" className="mr-2 bg-primary text-primary-foreground">NEW</Badge>
        <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
        What's New?
      </h3>
      <ul className="space-y-1.5 text-foreground/90 pl-2">
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span><strong>Enhanced Tool Comparison UI:</strong> Improved design and readability.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span><strong>Smart Search Updates:</strong> Faster and more accurate results.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span><strong>ROI Table Enhancements:</strong> Better organization and data clarity.</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span><strong>Export to PDF:</strong> <span className="font-semibold text-green-700">(Coming Soon)</span></span>
        </li>
      </ul>
    </div>

    <Separator />

    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-2">
        <XCircle className="mr-2 h-5 w-5 text-destructive" />
        Bug Fixes & Improvements
      </h3>
      <ul className="space-y-1.5 text-foreground/90 pl-2">
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Fixed dropdown disappearing issue when selecting <strong>AI/ML</strong>.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Resolved incorrect tool values in dropdowns.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Improved visibility & styling of disabled fields.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Optimized performance for faster search results.</span>
        </li>
      </ul>
    </div>

    <Separator />

    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-2">
        <Pin className="mr-2 h-5 w-5 text-blue-500" />
        Notes for Users
      </h3>
      <ul className="space-y-1.5 text-foreground/90 pl-2">
        <li className="flex items-start">
          <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
          <span><strong>Export to PDF</strong> is currently <span className="font-semibold text-green-700">disabled</span> but will be available in the next update.</span>
        </li>
        <li className="flex items-start">
          <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
          <span>More tooltips have been added for clarity—<strong>hover over key values</strong> to see details.</span>
        </li>
      </ul>
    </div>
     <div className="flex items-center text-xs text-muted-foreground pt-2">
        <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
        V.2.0
      </div>
  </div>
);


const SettingsSheet: React.FC<SettingsSheetProps> = ({ onOpenChange: handleSheetOpenChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'releaseNotes'>('main');

  useEffect(() => {
    // Check for saved theme and apply it
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  const handleThemeToggle = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleOptionClick = (optionName: string) => {
    console.log(`${optionName} clicked. Placeholder action.`);
  };

  return (
    <Sheet onOpenChange={(open) => {
      handleSheetOpenChange(open);
      if (!open) { 
        setCurrentView('main'); // Reset to main view when sheet closes
      }
    }}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open App Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] flex flex-col bg-card text-card-foreground p-0">
        <SheetHeader className="p-6 pb-2 border-b">
           <SheetTitle className="flex items-center text-xl text-primary">
            <Menu className="mr-2 h-6 w-6 text-accent" />
            {currentView === 'main' ? 'Beacon Menu' : 'Release Notes'}
          </SheetTitle>
          {currentView === 'main' && (
            <SheetDescription>
              App options, information, and release notes.
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="flex-1 p-4 space-y-1 overflow-y-auto">
          {currentView === 'main' && (
            <>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md"
                onClick={() => setCurrentView('releaseNotes')}
              >
                <BookOpenCheck className="mr-3 h-5 w-5 text-muted-foreground" />
                Acknowledgement
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md" onClick={handleThemeToggle}>
                {isDarkMode ? <Sun className="mr-3 h-5 w-5 text-muted-foreground" /> : <Moon className="mr-3 h-5 w-5 text-muted-foreground" />}
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md" onClick={() => handleOptionClick('Write Us')}>
                <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                Write Us
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md" onClick={() => handleOptionClick('Search Tool Action')}>
                <Search className="mr-3 h-5 w-5 text-muted-foreground" />
                Search Tool
              </Button>
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md" onClick={() => handleOptionClick('Sign In/Sign Up')}>
                <LogIn className="mr-3 h-5 w-5 text-muted-foreground" />
                Sign In / Sign Up
              </Button>
            </>
          )}

          {currentView === 'releaseNotes' && (
            <div className="flex flex-col h-full">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md mb-2 sticky top-0 bg-card z-10 -mt-4 pt-4 -mx-4 px-4"
                onClick={() => setCurrentView('main')}
              >
                <ChevronLeft className="mr-2 h-5 w-5 text-muted-foreground" />
                Back to Menu
              </Button>
              <div className="flex-1 overflow-y-auto -mx-4 px-4"> {/* Adjust padding for scrollable area */}
                <ReleaseNotesContent />
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="p-6 pt-4 border-t border-border">
          <SheetClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsSheet;
