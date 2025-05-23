
import React from 'react';
import { Cog } from 'lucide-react';
import ReleaseNotesSheet from './ReleaseNotesSheet'; // Import the new component

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(231,48%,40%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          <ReleaseNotesSheet /> {/* Add the ReleaseNotesSheet trigger here */}
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

        {/* Beacon Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground">
          Beacon
        </h1>
      </div>
    </header>
  );
};

export default Header;
