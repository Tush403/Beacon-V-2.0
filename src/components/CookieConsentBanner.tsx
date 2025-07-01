
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'cookie_consent_status';

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consentStatus = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consentStatus) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (status: 'accepted' | 'rejected' | 'managed') => {
    localStorage.setItem(COOKIE_CONSENT_KEY, status);
    setIsVisible(false);
    // For "managed", you might open a settings modal here in a real app
    if (status === 'managed') {
      console.log("Cookie settings managed (placeholder action)");
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-card shadow-2xl border-t border-border/50",
        "animate-in slide-in-from-bottom-12 duration-500 ease-out"
      )}
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-lg font-semibold text-card-foreground mb-2">
          Cookie consent
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          We use cookies to recognize your repeated visits and preferences, as well as to measure the effectiveness of our documentation and whether users find what they&apos;re searching for. With your consent, you&apos;re helping us to make our documentation better.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={() => handleConsent('accepted')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
            size="sm"
          >
            Accept
          </Button>
          <Button
            onClick={() => handleConsent('rejected')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
            size="sm"
          >
            Reject
          </Button>
          <Button
            onClick={() => handleConsent('managed')}
            variant="outline"
            className="border-accent/50 text-accent hover:bg-accent/10 hover:text-accent-foreground w-full sm:w-auto"
            size="sm"
          >
            Manage settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
