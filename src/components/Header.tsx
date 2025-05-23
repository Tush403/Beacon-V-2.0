import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(231,48%,40%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left side: TAO Digital Logo and Name */}
        <div className="flex items-center gap-x-2 sm:gap-x-3">
          {/* SVG Logo Icon */}
          <svg
            className="h-7 w-auto sm:h-8" // Height controls size, width is auto
            viewBox="0 0 42 32" // Adjusted viewBox for a suitable aspect ratio of the icon
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Pixels (Simplified 3x4 grid for clarity) */}
            {/* Column 1 */}
            <rect x="0" y="6" width="5" height="5" fill="#F59E0B" /> {/* Orange */}
            <rect x="0" y="13" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
            <rect x="0" y="20" width="5" height="5" fill="#1E3A8A" /> {/* Dark Blue */}
            
            {/* Column 2 */}
            <rect x="6" y="2" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}
            <rect x="6" y="9" width="5" height="5" fill="#1E3A8A" /> {/* Dark Blue */}
            <rect x="6" y="16" width="5" height="5" fill="#F59E0B" /> {/* Orange */}
            <rect x="6" y="23" width="5" height="5" fill="#10B981" /> {/* Green */}
            
            {/* Column 3 (Transitioning to gear) */}
            <rect x="12" y="6" width="5" height="5" fill="#1E3A8A" /> {/* Dark Blue */}
            <rect x="12" y="13" width="5" height="5" fill="#F59E0B" /> {/* Orange */}
            <rect x="12" y="20" width="5" height="5" fill="#60A5FA" /> {/* Light Blue */}

            {/* Gear Part (RHS) - Simplified half-gear */}
            <path 
              d="M17 0 
                 L27 0 
                 C 30.3137 0 33 2.68629 33 6 
                 L33 6 
                 L37 6 Q 39 8 39 10 L37 10
                 L41 14 Q 42 16 41 18 L37 18
                 L37 22 Q 39 22 39 24 L37 24
                 L33 26 
                 L33 26 
                 C 33 29.3137 30.3137 32 27 32 
                 L17 32 
                 L17 0 Z" 
              fill="hsl(var(--primary))" 
            />
            {/* Small circle detail on gear (optional) */}
            {/* <circle cx="25" cy="16" r="2" fill="hsl(var(--background))" /> */}
          </svg>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-primary-foreground">
            TAO DIGITAL
          </span>
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
