
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
  // SheetTrigger, // No longer using internal trigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Palette, Mail, Search, LogIn, Menu as MenuIcon, Sun, Moon, ChevronLeft, BookOpenCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockToolsData } from '@/lib/data';
import type { Tool } from '@/lib/types';
import ReleaseNotesDisplay from '@/components/ReleaseNotesDisplay';

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: 'main' | 'releaseNotes' | 'searchTool';
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ open, onOpenChange, initialView = 'main' }) => {
  const [currentView, setCurrentView] = useState<'main' | 'releaseNotes' | 'searchTool'>(initialView);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  // isDarkMode and handleThemeToggle are removed as theme toggle is now in Header

  useEffect(() => {
    if (open && initialView && currentView !== initialView) {
      setCurrentView(initialView);
      if (initialView !== 'searchTool') {
        setSearchTerm('');
        setSearchResults([]);
      }
    }
  }, [open, initialView, currentView]);


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


  const handleOptionClick = (optionName: string) => {
    // "Write Us" and "Theme" are handled by header now.
    if (optionName === 'Sign In/Sign Up') {
      console.log(`${optionName} clicked. Placeholder action.`);
      onOpenChange(false); // Close sheet for now
    } else {
      console.log(`${optionName} clicked. Placeholder action.`);
    }
  };

  const navigateBackToMain = () => {
    setCurrentView('main');
    setSearchTerm('');
    setSearchResults([]);
  };

  const ReleaseNotesView: React.FC = () => (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 h-full p-4">
        <ReleaseNotesDisplay />
      </ScrollArea>
    </div>
  );

  const SearchToolView: React.FC = () => (
    <div className="flex flex-col h-full p-4 pt-2 space-y-4">
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
                    onOpenChange(false); 
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
    <Sheet open={open} onOpenChange={(sheetOpen) => {
      onOpenChange(sheetOpen);
      if (!sheetOpen) { 
        setCurrentView('main'); // Reset to main view when sheet closes
        setSearchTerm('');
        setSearchResults([]);
      }
    }}>
      {/* SheetTrigger is now handled by Header.tsx */}
      <SheetContent side="right" className="w-[350px] sm:w-[400px] flex flex-col bg-card text-card-foreground p-0">
        <SheetHeader className="p-6 pb-2 border-b">
           <SheetTitle className="flex items-center text-xl text-primary">
            {currentView !== 'main' && (
              <Button variant="ghost" size="icon" className="mr-2 -ml-2 h-8 w-8 text-primary hover:bg-primary/10" onClick={navigateBackToMain}>
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Back to Menu</span>
              </Button>
            )}
            {currentView === 'main' && <MenuIcon className="mr-2 h-6 w-6 text-accent" />}
            
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
              {/* Theme toggle removed, now in header */}
              {/* <Separator className="my-2" /> */}
              {/* Write Us removed, now in header */}
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
             <ReleaseNotesView />
          )}

          {currentView === 'searchTool' && (
            <SearchToolView />
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
