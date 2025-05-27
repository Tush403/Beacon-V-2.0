
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
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Palette, Mail, Search, LogIn, Menu, Sun, Moon, ChevronLeft, BookOpenCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockToolsData } from '@/lib/data';
import type { Tool } from '@/lib/types';
import ReleaseNotesDisplay from '@/components/ReleaseNotesDisplay';

interface SettingsSheetProps {
  onOpenChange: (open: boolean) => void;
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ onOpenChange: handleSheetOpenChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState<'main' | 'releaseNotes' | 'searchTool'>('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);

  useEffect(() => {
    // Determine initial dark mode state from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDarkMode = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(initialIsDarkMode);
    if (initialIsDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    if (currentView === 'searchTool' && searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const results = mockToolsData.filter(tool =>
        tool.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        (tool.strengths && tool.strengths.some(s => s.toLowerCase().includes(lowerCaseSearchTerm))) ||
        (tool.weaknesses && tool.weaknesses.some(w => w.toLowerCase().includes(lowerCaseSearchTerm))) ||
        (tool.applicationTypes && tool.applicationTypes.some(at => at.toLowerCase().includes(lowerCaseSearchTerm))) ||
        (tool.testTypes && tool.testTypes.some(tt => tt.toLowerCase().includes(lowerCaseSearchTerm)))
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
    handleSheetOpenChange(false); // Close sheet after toggling theme
  };

  const handleOptionClick = (optionName: string) => {
    if (optionName === 'Write Us') {
      window.location.href = 'mailto:tushardshinde21@gmail.com?subject=Inquiry about Beacon App';
      console.log('Attempting to open email client for Write Us...');
      handleSheetOpenChange(false); // Close sheet after attempting to open email
    } else if (optionName === 'Sign In/Sign Up') {
      console.log(`${optionName} clicked. Placeholder action.`);
      handleSheetOpenChange(false); // Close sheet for now
    } else {
      console.log(`${optionName} clicked. Placeholder action.`);
    }
  };

  const navigateBackToMain = () => {
    setCurrentView('main');
    setSearchTerm('');
    setSearchResults([]);
  };

  const ReleaseNotesContent: React.FC = () => (
    <ScrollArea className="flex-1 h-full">
      <div className="p-4">
        <ReleaseNotesDisplay />
      </div>
    </ScrollArea>
  );

  const SearchToolContent: React.FC = () => (
    <div className="flex flex-col h-full pt-2 space-y-4">
      <Input
        type="text"
        placeholder="Search tools by name, feature, type..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-background/80 border-border/70 shadow-sm"
      />
      <div className="flex-1 overflow-y-auto">
        {searchTerm.trim() !== '' && searchResults.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No tools found matching your search.</p>
        )}
        {searchResults.length > 0 && (
          <ScrollArea className="h-[calc(100%-4rem)]"> {/* Adjust height based on input field */}
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
  );


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
            {currentView === 'main' ? (
              <Menu className="mr-2 h-6 w-6 text-accent" />
            ) : (
              <Button variant="ghost" size="icon" className="mr-2 -ml-2 h-8 w-8 text-primary hover:bg-primary/10" onClick={navigateBackToMain}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to Menu</span>
              </Button>
            )}
            {currentView === 'main' && 'Beacon Menu'}
            {currentView === 'releaseNotes' && 'Acknowledgement'}
            {currentView === 'searchTool' && 'Search Tools'}
          </SheetTitle>
          <SheetDescription>
            {currentView === 'main' && 'App options, information, and tool search.'}
            {currentView === 'releaseNotes' && 'Latest updates and fixes for Beacon.'}
            {currentView === 'searchTool' && 'Find specific tools quickly.'}
          </SheetDescription>
        </SheetHeader>

        <div className={cn("flex-1 overflow-y-auto", 
          currentView === 'main' ? "p-4 space-y-1" : 
          (currentView === 'releaseNotes' || currentView === 'searchTool') ? "p-0" : ""
        )}>
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
              <ReleaseNotesContent />
            </div>
          )}

          {currentView === 'searchTool' && (
            <div className="flex flex-col h-full p-4 pt-0">
              <SearchToolContent />
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
