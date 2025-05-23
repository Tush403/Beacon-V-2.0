
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(231,48%,40%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Part: TAO DIGITAL Logo and Text */}
        <div className="flex items-center">
          {/* Custom SVG Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="h-9 w-9 mr-3 animate-spin-slow" // Removed text-accent, fills are explicit
            aria-hidden="true"
          >
            <defs>
              <path
                id="cog-tooth"
                d="M-2,-6 L2,-6 L4,-2 L4,2 L2,6 L-2,6 L-4,2 L-4,-2 Z"
              />
            </defs>
            {/* Pixel Part */}
            <g id="pixels">
              {/* Column 1 */}
              <rect x="4" y="12" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
              <rect x="4" y="18" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              <rect x="4" y="24" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
              <rect x="4" y="30" width="5" height="5" fill="#F97316" /> {/* Orange */}
              <rect x="4" y="36" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              {/* Column 2 */}
              <rect x="10" y="9" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              <rect x="10" y="15" width="5" height="5" fill="#16A34A" /> {/* Green */}
              <rect x="10" y="21" width="5" height="5" fill="#F97316" /> {/* Orange */}
              <rect x="10" y="27" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
              <rect x="10" y="33" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              <rect x="10" y="39" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
               {/* Column 3 */}
              <rect x="16" y="12" width="5" height="5" fill="#F97316" /> {/* Orange */}
              <rect x="16" y="18" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
              <rect x="16" y="24" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              <rect x="16" y="30" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
              <rect x="16" y="36" width="5" height="5" fill="#F97316" /> {/* Orange */}
              {/* Column 4 (interface with cog) */}
              <rect x="22" y="15" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              <rect x="22" y="21" width="5" height="5" fill="#1E40AF" /> {/* Dark Blue */}
              <rect x="22" y="27" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
              <rect x="22" y="33" width="5" height="5" fill="#F97316" /> {/* Orange */}
            </g>
            {/* Cog Part - Right Half (Simplified) */}
            <g transform="translate(45, 32)" fill="hsl(var(--primary))">
              {/* Central body of the cog - approximated as a partial disc */}
              <path d="M0,-20 A20,20 0 0 1 0,20 L-10,20 A10,10 0 0 0 -10,-20 Z" />
              {/* Teeth - 7 teeth for approx 180 degrees */}
              <use href="#cog-tooth" transform="rotate(0) translate(0,-20)" />
              <use href="#cog-tooth" transform="rotate(25.7) translate(0,-20)" />
              <use href="#cog-tooth" transform="rotate(51.4) translate(0,-20)" />
              <use href="#cog-tooth" transform="rotate(77.1) translate(0,-20)" />
              <use href="#cog-tooth" transform="rotate(102.8) translate(0,-20)" />
              <use href="#cog-tooth" transform="rotate(128.5) translate(0,-20)" />
              <use href="#cog-tooth" transform="rotate(154.2) translate(0,-20)" />
            </g>
          </svg>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-primary-foreground">TAO DIGITAL</h2>
            <p className="text-xs text-primary-foreground/80 hidden sm:block">Transformation Made Simple</p>
          </div>
        </div>
        
        {/* Right Part: Beacon Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground text-right">
          Beacon
        </h1>
      </div>
    </header>
  );
};

export default Header;
