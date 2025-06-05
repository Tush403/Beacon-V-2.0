
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, Palette, Mail, Search, LogIn, Menu as MenuIcon, Sun, Moon, ChevronLeft, BookOpenCheck, Star, ExternalLink, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockToolsData } from '@/lib/data'; // Assuming mockToolsData is here
import type { Tool } from '@/lib/types'; // Assuming Tool type is here
import ReleaseNotesDisplay from '@/components/ReleaseNotesDisplay';

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: 'main' | 'releaseNotes' | 'searchTool';
}

const SettingsSheet: React.FC<SettingsSheetProps> = ({ open, onOpenChange, initialView = 'main' }) => {
  const [currentView, setCurrentView] = useState<'main' | 'releaseNotes' | 'searchTool'>(initialView);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Tool[]>([]);

  const [selectedToolForPopup, setSelectedToolForPopup] = useState<Tool | null>(null);
  const [showToolPopup, setShowToolPopup] = useState(false);

  // Helper function to check if a tool matches the search term
  const doesToolMatchSearch = useCallback((tool: Tool, lowerCaseSearchTerm: string): boolean => {
    if (!lowerCaseSearchTerm) return false;

    // Check name
    if (tool.name.toLowerCase().includes(lowerCaseSearchTerm)) return true;

    // Check searchable array properties (case-insensitive, some match)
    const searchableArrays = [
      tool.strengths,
      tool.weaknesses,
      tool.applicationTypes,
      tool.testTypes,
    ];

    return searchableArrays.some(arr =>
      arr && arr.some(item => item.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const initialIsDarkMode = savedTheme === 'dark' || 
                                (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(initialIsDarkMode);
      if (initialIsDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
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
    // handleSheetOpenChange(false); // Optionally close sheet after theme change
  }, [isDarkMode]);


  const handleSheetOpenChange = (sheetOpen: boolean) => {
    onOpenChange(sheetOpen); // Propagate to parent (Header.tsx)
    if (!sheetOpen) {
      // Reset internal state when sheet is closed
      setCurrentView('main');
      setSearchTerm('');
      setSearchResults([]);
      setShowToolPopup(false); 
      setSelectedToolForPopup(null);
    }
  };
  
  // Effect to update currentView if initialView prop changes while sheet is open
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
    if (optionName === 'Sign In/Sign Up') {
      console.log(`${optionName} clicked. Placeholder action.`);
      handleSheetOpenChange(false);
    } else if (optionName === 'Write Us') {
      window.location.href = 'mailto:tushardshinde21@gmail.com?subject=Inquiry about Beacon App';
      handleSheetOpenChange(false);
    } else {
      console.log(`${optionName} clicked. Placeholder action.`);
    }
  };

  const navigateToView = (view: 'main' | 'releaseNotes' | 'searchTool') => {
    setCurrentView(view);
    if (view !== 'searchTool') {
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const ReleaseNotesContent: React.FC = () => (
    <ScrollArea className="h-full p-4">
      <ReleaseNotesDisplay />
    </ScrollArea>
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
      <div className="flex-1 min-h-0">
        {searchTerm.trim() !== '' && searchResults.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No tools found matching your search.</p>
        )}
        {searchResults.length > 0 && (
          <ScrollArea className="h-full">
            <ul className="space-y-1 pr-2">
              {searchResults.map(tool => (
                <li 
                  key={tool.id} 
                  className="p-2.5 hover:bg-muted/50 rounded-md cursor-pointer border-b border-border/30 transition-colors"
                  onClick={() => {
                    setSelectedToolForPopup(tool);
                    setShowToolPopup(true);
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
    <Sheet open={open} onOpenChange={handleSheetOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] flex flex-col bg-card text-card-foreground p-0">
        <SheetHeader className="p-6 pb-2 border-b border-border">
          <SheetTitle className="flex items-center text-xl text-primary">
            {currentView !== 'main' && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 -ml-2 h-8 w-8 text-primary hover:bg-primary/10"
                onClick={() => {
                  setCurrentView('main');
                  if (currentView === 'searchTool') {
                    setSearchTerm('');
                    setSearchResults([]);
                    setShowToolPopup(false); 
                    setSelectedToolForPopup(null);
                  }
                }}
              >
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
            (currentView === 'main') ? "p-4 space-y-1" : "p-0" 
        )}>
          {currentView === 'main' && (
            <>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md"
                onClick={() => navigateToView('releaseNotes')}
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
              <Button variant="ghost" className="w-full justify-start text-left py-2 px-3 text-sm font-normal hover:bg-accent/10 rounded-md" onClick={() => navigateToView('searchTool')}>
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

          {currentView === 'releaseNotes' && <ReleaseNotesContent />}
          {currentView === 'searchTool' && <SearchToolView />}
        </div>

        <SheetFooter className="p-6 pt-4 border-t border-border">
          <SheetClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Close Menu
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>

      {/* Tool Details Popup Dialog */}
      {selectedToolForPopup && (
        <Dialog open={showToolPopup} onOpenChange={(open) => {
          setShowToolPopup(open);
          if (!open) {
            setSelectedToolForPopup(null); // Clear selected tool when dialog closes
          }
        }}>
          <DialogContent className="sm:max-w-lg bg-card text-card-foreground border-border shadow-xl rounded-lg">
            <DialogHeader className="p-4 border-b border-border">
              <DialogTitle className="flex items-center text-lg text-primary">
                <Star className="mr-2 h-5 w-5 text-accent" /> 
                {selectedToolForPopup.name}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Overall Score: {selectedToolForPopup.score.toFixed(1)}/10
              </DialogDescription>
            </DialogHeader>
            <div className="p-4 space-y-4 text-sm max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="font-semibold text-foreground mb-1 flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-positive" /> Key Strengths:
                </h4>
                <ul className="list-disc list-inside pl-5 text-muted-foreground space-y-0.5">
                  {selectedToolForPopup.strengths.slice(0, 3).map((s, i) => <li key={`s-${i}`}>{s}</li>)} 
                  {selectedToolForPopup.strengths.length > 3 && <li className="italic">...and more</li>}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1 flex items-center">
                  <XCircle className="mr-2 h-4 w-4 text-destructive" /> Key Weaknesses:
                </h4>
                <ul className="list-disc list-inside pl-5 text-muted-foreground space-y-0.5">
                  {selectedToolForPopup.weaknesses.slice(0, 3).map((w, i) => <li key={`w-${i}`}>{w}</li>)}
                  {selectedToolForPopup.weaknesses.length > 3 && <li className="italic">...and more</li>}
                </ul>
              </div>
              <Separator className="my-3"/>
              <div>
                <p><strong className="text-foreground/90">Primary Application Types:</strong> {selectedToolForPopup.applicationTypes.slice(0,2).join(', ')}</p>
                <p><strong className="text-foreground/90">Primary Test Types:</strong> {selectedToolForPopup.testTypes.slice(0,2).join(', ')}</p>
              </div>
            </div>
            <DialogFooter className="p-4 border-t border-border sm:justify-between gap-2">
              {selectedToolForPopup.websiteUrl && (
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <a href={selectedToolForPopup.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                  </a>
                </Button>
              )}
              <DialogClose asChild>
                <Button type="button" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Sheet>
  );
};

export default SettingsSheet;

    
