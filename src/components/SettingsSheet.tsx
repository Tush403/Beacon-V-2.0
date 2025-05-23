
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
import { Settings, BookOpenCheck, Palette, Mail, Search, LogIn, Menu, Sun, Moon, Sparkles, CheckCircle2, XCircle, Pin, AlertTriangle, Gem, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsSheetProps {
  onOpenChange: (open: boolean) => void;
}

const ReleaseNotesContent: React.FC = () => (
  <div className="space-y-6 py-4 text-sm h-full overflow-y-auto px-1"> {/* Added px-1 for slight padding from border */}
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
  const [showReleaseNotesPane, setShowReleaseNotesPane] = useState(false);

  useEffect(() => {
    const currentThemeIsDark = localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
    setIsDarkMode(currentThemeIsDark);
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
  };

  const handleOptionClick = (optionName: string) => {
    console.log(`${optionName} clicked. Placeholder action.`);
    // For non-toggle actions, you might want to close the sheet:
    // handleSheetOpenChange(false); 
  };

  return (
    <Sheet onOpenChange={(open) => {
      handleSheetOpenChange(open);
      if (!open) { 
        setShowReleaseNotesPane(false); // Reset pane visibility when sheet closes
      }
    }}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open App Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[700px] flex flex-col bg-card text-card-foreground p-0">
        <SheetHeader className="p-6 pb-2 border-b">
          <SheetTitle className="flex items-center text-xl text-primary">
            <Menu className="mr-2 h-6 w-6 text-accent" />
            Beacon Menu
          </SheetTitle>
          <SheetDescription>
            App options, information, and release notes.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 overflow-hidden"> {/* Main flex container for two panes */}
          {/* Release Notes Pane (Left) */}
          <div className={cn(
            "transition-all duration-300 ease-in-out h-full border-r border-border/50",
            showReleaseNotesPane ? "w-3/5 p-4" : "w-0 p-0 opacity-0" 
            // No padding when hidden to prevent border from showing strangely
          )}>
            {showReleaseNotesPane && ( // Only render content when visible to help with transitions/layout
              <>
                <h3 className="text-lg font-semibold text-accent mb-2">Release Notes</h3>
                <ReleaseNotesContent />
              </>
            )}
          </div>

          {/* Main Menu Pane (Right, or full if release notes hidden) */}
          <div className={cn(
            "flex-1 p-4 space-y-1 overflow-y-auto h-full transition-all duration-300 ease-in-out",
            // Width adjustment is implicitly handled by flex-1 and the sibling's conditional width
          )}>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-between text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md",
                showReleaseNotesPane && "bg-accent/10" // Highlight when active
              )} 
              onClick={() => setShowReleaseNotesPane(!showReleaseNotesPane)}
            >
              <span className="flex items-center">
                <BookOpenCheck className="mr-3 h-5 w-5 text-muted-foreground" />
                Acknowledgement
              </span>
              {showReleaseNotesPane ? <ChevronLeft className="h-5 w-5 text-muted-foreground" /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
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
          </div>
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
