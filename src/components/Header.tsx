
import React from 'react';
import { Zap } from 'lucide-react'; // Using Zap as a placeholder icon similar to Beacon/ToolWise

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <Zap className="h-8 w-8 mr-3 text-accent" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          ToolWise
        </h1>
      </div>
    </header>
  );
};

export default Header;
