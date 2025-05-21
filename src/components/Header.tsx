
import React from 'react';
import { Cog } from 'lucide-react'; // Changed from Sigma, and will be used for TAO DIGITAL

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-xl backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Left Part: TAO DIGITAL Logo and Text */}
        <div className="flex items-center">
          <Cog className="h-9 w-9 mr-3 text-accent animate-spin-slow" /> {/* TAO Digital representative icon */}
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

// Add custom animation for slower spin if needed in globals.css or tailwind.config.js
// For tailwind.config.js:
// theme: {
//   extend: {
//     animation: {
//       'spin-slow': 'spin 3s linear infinite',
//     }
//   }
// }


export default Header;

