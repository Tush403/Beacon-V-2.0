
// This component is extracted from SettingsSheet.tsx to be reusable.
// It only contains the JSX for displaying the release notes content.
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Sparkles, CheckCircle2, XCircle, Pin, AlertTriangle, Gem, Rocket, TrendingUp, Zap as ZapIcon } from 'lucide-react';

const ReleaseNotesDisplay: React.FC = () => (
  <div className="space-y-6 py-4 text-sm px-1">
    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-3">
        <Rocket className="mr-2 h-5 w-5 text-primary animate-pulse" />
        Major Platform Upgrade!
      </h3>
      <div className="pl-2 space-y-1.5 text-foreground/90">
        <p className="flex items-start">
          <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
          <span>
            <strong>Beacon has leveled up!</strong> We're thrilled to announce our migration from Microsoft Power Apps to the cutting-edge <strong>Google Firebase Studio</strong>.
          </span>
        </p>
        <p className="flex items-start">
          <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            This strategic move empowers us with enhanced performance, greater scalability, and a modern development environment, allowing us to bring you innovative features faster than ever. Expect a smoother, more responsive experience as you navigate Beacon.
          </span>
        </p>
      </div>
    </div>

    <Separator />

    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-2">
        <Badge variant="default" className="mr-2 bg-accent text-accent-foreground">V.2.0</Badge>
        <ZapIcon className="mr-2 h-5 w-5 text-yellow-500" />
        What's New & Enhanced?
      </h3>
      <ul className="space-y-2 text-foreground/90 pl-2">
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            <strong>Dive Deeper, Faster:</strong> Our revamped Tool Comparison UI lets you analyze features side-by-side with unparalleled clarity, helping you make data-driven decisions in record time.
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            <strong>Find Your Perfect Match Instantly:</strong> Experience lightning-fast and laser-accurate results with our upgraded Smart Search. No more endless scrolling – get to the right tools, right away!
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            <strong>Smarter Estimations, Real-World Accuracy:</strong> Our AI Effort Estimator now incorporates your chosen 'Automation Tool Name' and is calibrated with real-world project data, delivering more precise and actionable effort projections for better project planning.
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            <strong>Maximize Your Returns:</strong> The ROI Comparison Table now offers a crystal-clear view of potential gains, with improved data organization to clearly illustrate the value each tool brings to your bottom line.
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            <strong>Seamless Navigation:</strong> Effortlessly glide back to the top of any page with our new 'Back to Top' button – because your time is valuable.
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span>
            <strong>Intuitive Actions at Your Fingertips:</strong> Discover functionality faster with new tooltips on our floating action buttons. Clarity and convenience, combined for a smoother workflow.
          </span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="h-4 w-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
          <span><strong>Export to PDF:</strong> <span className="font-semibold text-green-700">(Coming Soon)</span> Get ready to share your findings easily!</span>
        </li>
      </ul>
    </div>

    <Separator />

    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-2">
        <XCircle className="mr-2 h-5 w-5 text-destructive" />
        Refinements & Fixes
      </h3>
      <ul className="space-y-1.5 text-foreground/90 pl-2">
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span><strong>Smoother Filtering:</strong> Resolved an issue where the coding language dropdown would sometimes disappear when 'AI/ML' was selected, ensuring a seamless filtering experience.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span><strong>Cleaner Data Entry:</strong> The AI Effort Estimator now handles numeric inputs more gracefully, preventing leading zeros and allowing empty fields for quicker and cleaner data entry.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span><strong>Behind-the-Scenes Polish:</strong> We've squashed minor bugs and optimized internal data handling (like `comparisonParametersData`) for a more robust and reliable experience.</span>
        </li>
         <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Resolved incorrect tool values in dropdowns.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Improved visibility & styling of disabled fields for better clarity.</span>
        </li>
        <li className="flex items-start">
          <Gem className="h-3 w-3 mr-2.5 mt-1 text-primary flex-shrink-0" />
          <span>Optimized performance for faster search results, getting you to insights quicker.</span>
        </li>
      </ul>
    </div>

    <Separator />

    <div>
      <h3 className="flex items-center text-lg font-semibold text-foreground mb-2">
        <Pin className="mr-2 h-5 w-5 text-blue-500" />
        Important Notes
      </h3>
      <ul className="space-y-1.5 text-foreground/90 pl-2">
        <li className="flex items-start">
          <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
          <span>Our migration to Firebase Studio means you can look forward to more frequent updates and exciting new features. Stay tuned!</span>
        </li>
        <li className="flex items-start">
          <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
          <span>The "Export to PDF" feature is under active development and will be rolled out soon.</span>
        </li>
         <li className="flex items-start">
          <Pin className="h-3 w-3 mr-2.5 mt-1 text-foreground/70 flex-shrink-0" />
          <span>We value your feedback! Use the contact options to share your thoughts and help us make Beacon even better.</span>
        </li>
      </ul>
    </div>
     <div className="flex items-center text-xs text-muted-foreground pt-2">
        <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
        Beacon V.2.0 - Powered by Firebase Studio
      </div>
  </div>
);

export default ReleaseNotesDisplay;
