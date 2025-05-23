
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(231,48%,40%)] text-primary-foreground shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-end"> {/* Changed justify-between to justify-end */}
        {/* Beacon Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary-foreground"> {/* Removed text-right as justify-end handles alignment */}
          Beacon
        </h1>
      </div>
    </header>
  );
};

export default Header;
