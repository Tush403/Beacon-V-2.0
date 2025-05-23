
"use client"; // Required because we are using useState for sheet control

import React, { useState } from 'react';
import { Cog, Grid3x3 } from 'lucide-react'; // Removed Newspaper
import ReleaseNotesSheet from './ReleaseNotesSheet';
import SettingsSheet from './SettingsSheet'; // Import the new SettingsSheet
// Removed Button import as it's only used by SettingsSheet trigger now

const Header: React.FC = () => {
  const [isReleaseNotesOpen, setIsReleaseNotesOpen] = useState(false);
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);

  const handleOpenReleaseNotes = () => {
    setIsSettingsSheetOpen(false); // Ensure settings sheet is closed
    setIsReleaseNotesOpen(true);
  };
  
  return (
    <>
      <header className="bg-gradient-to-r from-[hsl(255,65%,50%)] to-[hsl(295,75%,70%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          {/* Left Side: TAO DIGITAL Branding */}
          <div className="flex items-center gap-x-2 sm:gap-x-3">
            <Cog className="h-8 w-8 sm:h-10 sm:w-10 text-accent animate-spin-slow" aria-hidden="true" />
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-tight text-primary-foreground">
                TAO DIGITAL
              </span>
              <p className="text-xs sm:text-sm text-primary-foreground/80 tracking-wide">
                Transformation Made Simple
              </p>
            </div>
          </div>

          {/* Right Side: App Title and Action Icons */}
          <div className="flex items-center gap-x-1 sm:gap-x-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground">
              Beacon
            </h1>
            {/* Release Notes Button - REMOVED
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:bg-white/10"
              onClick={() => setIsReleaseNotesOpen(true)}
            >
              <Newspaper className="h-5 w-5" />
              <span className="sr-only">View Release Notes</span>
            </Button>
            */}
            {/* Settings Button/Sheet Trigger */}
            <SettingsSheet 
              onOpenChange={setIsSettingsSheetOpen} 
              onOpenReleaseNotesRequest={handleOpenReleaseNotes} 
            />
          </div>
        </div>
      </header>

      {/* Sheets are rendered here but controlled by state */}
      <ReleaseNotesSheet open={isReleaseNotesOpen} onOpenChange={setIsReleaseNotesOpen} />
    </>
  );
};

export default Header;
