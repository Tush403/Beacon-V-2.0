
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
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, BookOpenCheck, Palette, Mail, Search, LogIn, Menu, Sun, Moon, Sparkles, CheckCircle2, XCircle, Pin, AlertTriangle, Gem, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockToolsData } from '@/lib/data';
import type { Tool } from '@/lib/types';

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
  const [currentView, setCurrentView] = useState<'main' | 'releaseNotes' | 'searchTool'>('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (currentView === 'searchTool' && searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = mockToolsData.filter(tool =>
        tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        tool.strengths.some(s => s.toLowerCase().includes(lowerCaseSearchTerm)) ||
        tool.weaknesses.some(w => w.toLowerCase().includes(lowerCaseSearchTerm)) ||
        tool.applicationTypes.some(at => at.toLowerCase().includes(lowerCaseSearchTerm)) ||
        tool.testTypes.some(tt => tt.toLowerCase().includes(lowerCaseSearchTerm))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, currentView]);

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
     // handleSheetOpenChange(false); // Close sheet after action
  };

  const SearchToolContent: React.FC = () => (
    <div className="flex flex-col h-full">
      <Button
        variant="ghost"
        className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md mb-2 sticky top-0 bg-card z-10 -mt-4 pt-4 -mx-4 px-4 shadow-sm"
        onClick={() => {
          setCurrentView('main');
          setSearchTerm(''); 
          setSearchResults([]); 
        }}
      >
        <ChevronLeft className="mr-2 h-5 w-5 text-muted-foreground" />
        Back to Menu
      </Button>
      <div className="flex-1 overflow-y-auto -mx-4 px-4 space-y-4">
        <Input
          type="text"
          placeholder="Search tools by name, feature, type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-background/80 border-border/70 sticky top-[calc(2.5rem+8px)] z-10 shadow-sm" // Adjust top value if header changes
        />
        <div className="pt-2"> {/* Added padding top to avoid content hiding behind sticky input */}
          {searchTerm.trim() !== '' && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No tools found matching your search.</p>
          )}
          {searchResults.length > 0 && (
            <ScrollArea className="h-[calc(100vh-220px)]"> {/* Adjust height dynamically or ensure it's reasonable */}
              <ul className="space-y-1">
                {searchResults.map(tool => (
                  <li key={tool.id} className="p-2.5 hover:bg-muted/50 rounded-md cursor-pointer border-b border-border/30 transition-colors"
                    onClick={() => {
                      console.log("Selected tool:", tool.name);
                      handleSheetOpenChange(false); 
                    }}
                  >
                    <div className="font-medium text-foreground">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">Score: {tool.score.toFixed(1)}</div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          )}
          {searchTerm.trim() === '' && (
            <p className="text-sm text-muted-foreground text-center py-4">Type to search for tools.</p>
          )}
        </div>
      </div>
    </div>
  );


  return (
    <Sheet onOpenChange={(open) => {
      handleSheetOpenChange(open);
      if (!open) { 
        setCurrentView('main'); 
        setSearchTerm('');
        setSearchResults([]);
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
            {currentView === 'main' && 'Beacon Menu'}
            {currentView === 'releaseNotes' && 'Release Notes'}
            {currentView === 'searchTool' && 'Search Tools'}
          </SheetTitle>
          {currentView === 'main' && (
            <SheetDescription>
              App options, information, and tool search.
            </SheetDescription>
          )}
           {currentView === 'releaseNotes' && (
            <SheetDescription>
              Latest updates and fixes for Beacon.
            </SheetDescription>
          )}
           {currentView === 'searchTool' && (
            <SheetDescription>
              Find specific tools quickly.
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
              <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md" onClick={() => setCurrentView('searchTool')}>
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
                className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md mb-2 sticky top-0 bg-card z-10 -mt-4 pt-4 -mx-4 px-4 shadow-sm"
                onClick={() => setCurrentView('main')}
              >
                <ChevronLeft className="mr-2 h-5 w-5 text-muted-foreground" />
                Back to Menu
              </Button>
              <div className="flex-1 overflow-y-auto -mx-4 px-4">
                <ReleaseNotesContent />
              </div>
            </div>
          )}

          {currentView === 'searchTool' && <SearchToolContent />}
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
