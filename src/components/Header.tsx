
"use client";

import React, { useState, useEffect } from 'react';
import { Cog, Menu, Mail, Sun, Moon, Search as SearchIcon } from 'lucide-react'; // Changed Headphones to Mail
import SettingsSheet from './SettingsSheet'; 

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
            <Menu className="h-5 w-5" />
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
