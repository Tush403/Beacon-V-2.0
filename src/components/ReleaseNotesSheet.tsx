
"use client";

import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  // SheetTrigger, // Removed: No longer self-triggered
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Sparkles, CheckCircle2, XCircle, Pin, AlertTriangle, Gem } from 'lucide-react';

interface ReleaseNotesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReleaseNotesSheet: React.FC<ReleaseNotesSheetProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {/* SheetTrigger is removed as this component is now controlled externally */}
      <SheetContent side="right" className="w-[400px] sm:w-[540px] flex flex-col bg-card text-card-foreground">
        <SheetHeader className="pb-2">
          <SheetTitle className="flex items-center text-2xl text-primary">
            <CalendarDays className="mr-2 h-6 w-6 text-accent" />
            Beacon (V.2.0)
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto pr-4 space-y-6 py-4">
          <div>
            <h3 className="flex items-center text-xl font-semibold text-foreground mb-2">
              <Badge variant="default" className="mr-2 bg-primary text-primary-foreground">NEW</Badge>
              <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
              What's New?
            </h3>
            <ul className="space-y-1.5 text-sm text-foreground/90 pl-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span><strong>Enhanced Tool Comparison UI:</strong> Improved design and readability.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span><strong>Smart Search Updates:</strong> Faster and more accurate results.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span><strong>ROI Table Enhancements:</strong> Better organization and data clarity.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                <span><strong>Export to PDF:</strong> <span className="font-semibold text-green-700">(Coming Soon)</span></span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="flex items-center text-xl font-semibold text-foreground mb-2">
              <XCircle className="mr-2 h-5 w-5 text-destructive" />
              Bug Fixes & Improvements
            </h3>
            <ul className="space-y-1.5 text-sm text-foreground/90 pl-2">
              <li className="flex items-start">
                <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
                <span>Fixed dropdown disappearing issue when selecting <strong>AI/ML</strong>.</span>
              </li>
              <li className="flex items-start">
                <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
                <span>Resolved incorrect tool values in dropdowns.</span>
              </li>
              <li className="flex items-start">
                <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
                <span>Improved visibility & styling of disabled fields.</span>
              </li>
              <li className="flex items-start">
                <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
                <span>Optimized performance for faster search results.</span>
              </li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="flex items-center text-xl font-semibold text-foreground mb-2">
              <Pin className="mr-2 h-5 w-5 text-blue-500" />
              Notes for Users
            </h3>
            <ul className="space-y-1.5 text-sm text-foreground/90 pl-2">
              <li className="flex items-start">
                <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
                <span><strong>Export to PDF</strong> is currently <span className="font-semibold text-green-700">disabled</span> but will be available in the next update.</span>
              </li>
              <li className="flex items-start">
                <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
                <span>More tooltips have been added for clarity—<strong>hover over key values</strong> to see details.</span>
              </li>
            </ul>
          </div>
        </div>

        <SheetFooter className="pt-4 border-t border-border">
          <div className="flex items-center text-xs text-muted-foreground mr-auto">
            <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
            V.2.0
          </div>
          <SheetClose asChild>
            <Button type="button" className="bg-primary hover:bg-primary/90 text-primary-foreground">Acknowledge</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ReleaseNotesSheet;
