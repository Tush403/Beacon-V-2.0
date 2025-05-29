
"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Sun, Moon, Search as SearchIcon, BookOpenCheck } from 'lucide-react'; // Changed Menu to BookOpenCheck
import SettingsSheet from './SettingsSheet';
import Link from 'next/link'; // Added Link for TAO DIGITAL logo

const Header: React.FC = () => {
  const [isSettingsSheetOpen, setIsSettingsSheetOpen] = useState(false);
  const [settingsSheetInitialView, setSettingsSheetInitialView] = useState<'main' | 'releaseNotes' | 'searchTool'>('main');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialIsDarkMode = savedTheme === 'dark' ||
                              (!savedTheme && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(initialIsDarkMode);
    if (initialIsDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

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

  const handleContactUs = () => {
    window.open('https://www.taodigitalsolutions.com/contact-us-lead-generation-form', '_blank');
  };

  const handleOpenSearch = () => {
    setSettingsSheetInitialView('searchTool');
    setIsSettingsSheetOpen(true);
  };

  const handleOpenSettingsMenu = () => {
    setSettingsSheetInitialView('main');
    setIsSettingsSheetOpen(true);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-[hsl(255,65%,50%)] to-[hsl(295,75%,70%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Side: TAO DIGITAL Branding */}
        <Link href="https://www.taodigitalsolutions.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 sm:gap-x-3 group">
          <svg
            className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground transition-transform duration-300 ease-in-out group-hover:scale-110"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Static Pixel Part (LHS) */}
            <g id="pixel-part">
              <rect x="10" y="30" width="10" height="10" fill="#0D47A1" /> {/* Dark Blue */}
              <rect x="20" y="20" width="10" height="10" fill="#0D47A1" />
              <rect x="20" y="40" width="10" height="10" fill="#1976D2" /> {/* Medium Blue */}
              <rect x="30" y="10" width="10" height="10" fill="#0D47A1" />
              <rect x="30" y="30" width="10" height="10" fill="#1976D2" />
              <rect x="30" y="50" width="10" height="10" fill="#90CAF9" /> {/* Light Blue */}
              <rect x="40" y="20" width="10" height="10" fill="#1976D2" />
              <rect x="40" y="40" width="10" height="10" fill="#90CAF9" />
              <rect x="40" y="60" width="10" height="10" fill="#FFB74D" /> {/* Orange */}
              <rect x="50" y="30" width="10" height="10" fill="#90CAF9" />
              <rect x="50" y="50" width="10" height="10" fill="#FFB74D" />
              <rect x="50" y="70" width="10" height="10" fill="#81C784" /> {/* Green */}
            </g>
            {/* Animated Gear Part (RHS) - Rotates around its local (0,0) which is the gear's axle */}
            <g
              id="gear-part"
              transform="translate(55, 35)" // Position the gear relative to the SVG canvas
              className="animate-spin-slow origin-[0px_0px]" // Tailwind spin animation with custom origin
            >
              <path
                d="M0 -25C13.8071 -25 25 -13.8071 25 0C25 13.8071 13.8071 25 0 25V20C11.0457 20 20 11.0457 20 0C20 -11.0457 11.0457 -20 0 -20V-25Z"
                fill="currentColor" // Use current text color (primary-foreground)
              />
              {/* Gear Teeth - Adjusted for the half-gear shape */}
              <path d="M-3 -28 L3 -28 L3 -22 L-3 -22 Z" fill="currentColor" />
              <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(30 0 0)" fill="currentColor" />
              <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(60 0 0)" fill="currentColor" />
              <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(90 0 0)" fill="currentColor" />
              <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(120 0 0)" fill="currentColor" />
              <path d="M-3 28 L3 28 L3 22 L-3 22 Z" transform="rotate(180 0 0)" fill="currentColor" />
            </g>
          </svg>
          <div>
            <span className="block text-xl sm:text-2xl font-bold tracking-tight text-primary-foreground">
              TAO DIGITAL
            </span>
            <p className="text-xs sm:text-sm text-primary-foreground/80 tracking-wide">
              Transformation Made Simple
            </p>
          </div>
        </Link>

        {/* Right Side: App Title and Action Icons */}
        <div className="flex items-center gap-x-1 sm:gap-x-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground">
            Beacon
          </h1>

          <Button variant="ghost" size="icon" onClick={handleContactUs} className="text-primary-foreground hover:bg-white/10" aria-label="Contact Us">
            <Mail className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="text-primary-foreground hover:bg-white/10" aria-label="Toggle theme">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleOpenSearch} className="text-primary-foreground hover:bg-white/10" aria-label="Search tools">
            <SearchIcon className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={handleOpenSettingsMenu} className="text-primary-foreground hover:bg-white/10" aria-label="Open app menu">
            <BookOpenCheck className="h-5 w-5" /> {/* Changed from Menu to BookOpenCheck */}
          </Button>
        </div>
      </header>
      <SettingsSheet
        open={isSettingsSheetOpen}
        onOpenChange={setIsSettingsSheetOpen}
        initialView={settingsSheetInitialView}
      />
    </>
  );
};

// Minimal Button component stub
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string; "aria-label"?: string }
>(({ className, children, variant, size, ...props }, ref) => {
  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";


export default Header;
