
"use client";

import React, { useState } from 'react';
import { Cog, Menu } from 'lucide-react';
import SettingsSheet from './SettingsSheet';
// ReleaseNotesSheet is no longer imported as its functionality is merged.

const Header: React.FC = () => {
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);
  // State for ReleaseNotesSheet is removed.

  return (
    <>
      {/* The main <header> tag now becomes the flex container and handles padding */}
      <header className="bg-gradient-to-r from-[hsl(255,65%,50%)] to-[hsl(295,75%,70%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Side: TAO DIGITAL Branding */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <Cog className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground animate-spin-slow" aria-hidden="true" />
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
          {/* Settings Button/Sheet Trigger */}
          <SettingsSheet
            onOpenChange={setIsSettingsSheetOpen}
            // onOpenReleaseNotesRequest prop is removed
          />
        </div>
      </header>
      {/* ReleaseNotesSheet is no longer rendered here as its functionality is merged into SettingsSheet */}
    </>
  );
};

export default Header;
