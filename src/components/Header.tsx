
import React from 'react';
import { Sigma } from 'lucide-react'; // Changed from Zap to Sigma for a more analytical/futuristic feel

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-xl backdrop-blur-md bg-opacity-80 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <Sigma className="h-8 w-8 mr-3 text-accent" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Beacon
        </h1>
      </div>
    </header>
  );
};

export default Header;
