
"use client";

import React from 'react';
import type { EstimatorInputValues, EffortEstimationOutput } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bot, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from './ui/skeleton';

interface EffortEstimatorProps {
  inputValues: EstimatorInputValues;
  onInputChange: (field: keyof EstimatorInputValues, value: string | number | boolean) => void;
  onSubmit: () => void;
  estimation: EffortEstimationOutput | null;
  isLoading: boolean;
  error: string | null;
}

const EffortEstimator: React.FC<EffortEstimatorProps> = ({
  inputValues,
  onInputChange,
  onSubmit,
  estimation,
  isLoading,
  error,
}) => {
  const handleNumericInputChange = (field: keyof EstimatorInputValues, value: string) => {
    const numValue = parseInt(value, 10);
    onInputChange(field, isNaN(numValue) ? 0 : numValue);
  };

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card text-card-foreground animate-in fade-in-0 slide-in-from-left-12 duration-700 ease-out delay-300 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-primary">
          <Bot className="mr-2 h-6 w-6 text-accent" />
          AI Effort Estimator
        </CardTitle>
        <CardDescription>Provide project details to get an effort estimation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="complexityLow" className="text-sm font-medium text-foreground/80">Complexity - Low (Test Cases)</Label>
          <Input
            id="complexityLow"
            type="number"
            min="0"
            value={inputValues.complexityLow}
            onChange={(e) => handleNumericInputChange('complexityLow', e.target.value)}
            placeholder="e.g., 50"
            className="mt-1 bg-input/80"
          />
        </div>
        <div>
          <Label htmlFor="complexityMedium" className="text-sm font-medium text-foreground/80">Complexity - Medium (Test Cases)</Label>
          <Input
            id="complexityMedium"
            type="number"
            min="0"
            value={inputValues.complexityMedium}
            onChange={(e) => handleNumericInputChange('complexityMedium', e.target.value)}
            placeholder="e.g., 30"
            className="mt-1 bg-input/80"
          />
        </div>
        <div>
          <Label htmlFor="complexityHigh" className="text-sm font-medium text-foreground/80">Complexity - High (Test Cases)</Label>
          <Input
            id="complexityHigh"
            type="number"
            min="0"
            value={inputValues.complexityHigh}
            onChange={(e) => handleNumericInputChange('complexityHigh', e.target.value)}
            placeholder="e.g., 15"
            className="mt-1 bg-input/80"
          />
        </div>
        <div>
          <Label htmlFor="complexityHighlyComplex" className="text-sm font-medium text-foreground/80">Complexity - Highly Complex (Test Cases)</Label>
          <Input
            id="complexityHighlyComplex"
            type="number"
            min="0"
            value={inputValues.complexityHighlyComplex}
            onChange={(e) => handleNumericInputChange('complexityHighlyComplex', e.target.value)}
            placeholder="e.g., 5"
            className="mt-1 bg-input/80"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="usesFramework"
            checked={inputValues.usesFramework}
            onCheckedChange={(checked) => onInputChange('usesFramework', checked)}
          />
          <Label htmlFor="usesFramework" className="text-sm font-medium text-foreground/80">Using a Standard Test Framework?</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="usesCiCd"
            checked={inputValues.usesCiCd}
            onCheckedChange={(checked) => onInputChange('usesCiCd', checked)}
          />
          <Label htmlFor="usesCiCd" className="text-sm font-medium text-foreground/80">CI/CD Pipeline Integrated?</Label>
        </div>

        <div>
          <Label htmlFor="teamSize" className="text-sm font-medium text-foreground/80">QA Team Size (Engineers)</Label>
          <Input
            id="teamSize"
            type="number"
            min="1"
            value={inputValues.teamSize}
            onChange={(e) => handleNumericInputChange('teamSize', e.target.value)}
            placeholder="e.g., 3"
            className="mt-1 bg-input/80"
          />
           {inputValues.teamSize <= 0 && <p className="text-xs text-destructive mt-1">Team size must be greater than 0.</p>}
        </div>

        <Button onClick={onSubmit} disabled={isLoading || inputValues.teamSize <= 0} className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Get Estimate
        </Button>
      </CardContent>

      {(isLoading && !estimation && !error) && (
        <CardFooter className="flex flex-col items-start space-y-2 border-t border-border/50 pt-4">
            <Skeleton className="h-6 w-1/2 bg-muted/50" />
            <Skeleton className="h-4 w-full bg-muted/50" />
            <Skeleton className="h-4 w-3/4 bg-muted/50" />
        </CardFooter>
      )}

      {error && !isLoading && (
        <CardFooter className="border-t border-border/50 pt-4">
          <Alert variant="destructive" className="bg-destructive/10 border-destructive/50 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Estimation Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardFooter>
      )}
      {estimation && !isLoading && !error && (
        <CardFooter className="flex flex-col items-start space-y-2 border-t border-border/50 pt-4 bg-primary/5 p-4 rounded-b-lg">
          <h4 className="text-md font-semibold text-primary">Estimation Result:</h4>
          <p className="text-lg font-bold text-accent">
            {estimation.estimatedPersonDays} person-day(s)
          </p>
          <p className="text-sm text-muted-foreground italic mt-1">
            <strong className="text-foreground/80 not-italic">Explanation:</strong> {estimation.explanation}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default EffortEstimator;
