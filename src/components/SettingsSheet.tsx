
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
import { Separator } from "@/components/ui/separator";
import { Settings, BookOpenCheck, Palette, Mail, Search, LogIn, Menu, Sun, Moon } from 'lucide-react';

interface SettingsSheetProps {
  onOpenChange: (open: boolean) => void;
  onOpenReleaseNotesRequest: () => void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ onOpenChange, onOpenReleaseNotesRequest }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize theme state based on localStorage or document class
    const currentThemeIsDark = localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    setIsDarkMode(currentThemeIsDark);
    // Ensure the class matches the state, especially for initial load if layout.tsx hasn't run yet or if class was manually changed
    if (currentThemeIsDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
    // Optionally close the sheet after toggling theme
    // onOpenChange(false); 
  };

  const handleOptionClick = (optionName: string) => {
    console.log(`${optionName} clicked. Placeholder action.`);
    // Potentially close the sheet after action
    onOpenChange(false); 
  };

  const handleAcknowledgeClick = () => {
    onOpenChange(false); // Close settings sheet
    onOpenReleaseNotesRequest(); // Request to open release notes
  };

  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open App Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px] flex flex-col bg-card text-card-foreground">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center text-xl text-primary">
            <Menu className="mr-2 h-6 w-6 text-accent" />
            Beacon Menu
          </SheetTitle>
          <SheetDescription>
            App options and information.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto space-y-2 py-2 pr-2">
          <Button variant="ghost" className="w-full justify-start text-left" onClick={handleAcknowledgeClick}>
            <BookOpenCheck className="mr-3 h-5 w-5 text-muted-foreground" />
            Acknowledgement
          </Button>
          <Separator className="my-1" />
          <Button variant="ghost" className="w-full justify-start text-left" onClick={handleThemeToggle}>
            {isDarkMode ? <Sun className="mr-3 h-5 w-5 text-muted-foreground" /> : <Moon className="mr-3 h-5 w-5 text-muted-foreground" />}
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </Button>
           <Separator className="my-1" />
          <Button variant="ghost" className="w-full justify-start text-left" onClick={() => handleOptionClick('Write Us')}>
            <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
            Write Us
          </Button>
           <Separator className="my-1" />
          <Button variant="ghost" className="w-full justify-start text-left" onClick={() => handleOptionClick('Search Tool Action')}>
            <Search className="mr-3 h-5 w-5 text-muted-foreground" />
            Search Tool
          </Button>
           <Separator className="my-1" />
          <Button variant="ghost" className="w-full justify-start text-left" onClick={() => handleOptionClick('Sign In/Sign Up')}>
            <LogIn className="mr-3 h-5 w-5 text-muted-foreground" />
            Sign In / Sign Up
          </Button>
        </div>

        <SheetFooter className="pt-4 border-t border-border">
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
