
"use client";

import React, { useState, useEffect } from 'react';
import type { Tool } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface RoiChartProps {
  tools: Tool[];
}

const RoiChart: React.FC<RoiChartProps> = ({ tools }) => {
  // Default radius for SSR and initial client render.
  // Assumes --radius is "0.375rem", parseFloat("0.375rem") * 4 = 1.5
  const [barRadiusConfig, setBarRadiusConfig] = useState<[number, number, number, number]>([0, 1.5, 1.5, 0]);
  const [tooltipStyleRadius, setTooltipStyleRadius] = useState<string>('0.375rem'); // Default to CSS var string

  useEffect(() => {
    // This code runs only on the client, after the component mounts
    try {
      const rootStyle = getComputedStyle(document.documentElement);
      const radiusCssVar = rootStyle.getPropertyValue('--radius').trim(); // e.g., "0.375rem"
      
      const numericRadius = parseFloat(radiusCssVar); // e.g., 0.375
      if (!isNaN(numericRadius)) {
        setBarRadiusConfig([0, numericRadius * 4, numericRadius * 4, 0]);
      }
      
      setTooltipStyleRadius(radiusCssVar); // e.g., "0.375rem"
    } catch (error) {
      console.warn("Could not calculate dynamic styles for chart:", error);
      // Defaults will be used if an error occurs
    }
  }, []);


  if (tools.length === 0) {
    return (
      <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-accent"/>ROI Comparison</CardTitle>
          <CardDescription>Select tools and apply filters to see ROI data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No ROI data to display. Please refine your selection.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = tools.map(tool => ({
    name: tool.name,
    roi: tool.roi,
    fill: tool.roi >= 80 ? 'hsl(var(--chart-1))' : tool.roi >= 70 ? 'hsl(var(--chart-2))' : 'hsl(var(--chart-3))', 
  }));

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-accent"/>ROI Comparison</CardTitle>
        <CardDescription>Estimated Return on Investment (ROI) for the selected tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 150 + tools.length * 40 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 40, 
                left: 20,
                bottom: 20, 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                stroke="hsl(var(--foreground)/0.8)" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'ROI (%)', position: 'insideBottom', offset: -10, fill: 'hsl(var(--muted-foreground))' }} 
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                stroke="hsl(var(--foreground)/0.8)" 
                width={120} 
                tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                interval={0} 
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent)/0.1)' }}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  color: 'hsl(var(--popover-foreground))', 
                  borderRadius: tooltipStyleRadius,
                  borderColor: 'hsl(var(--border))',
                  boxShadow: '0 4px 12px hsl(var(--primary)/0.2)',
                }}
                formatter={(value: number) => [`${value}%`, 'ROI']}
              />
              <Legend 
                wrapperStyle={{ color: 'hsl(var(--muted-foreground))', paddingTop: '10px' }}
                formatter={(value) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>}
              />
              <Bar dataKey="roi" name="ROI" barSize={25} radius={barRadiusConfig}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <LabelList 
                  dataKey="roi" 
                  position="right" 
                  formatter={(value: number) => `${value}%`} 
                  fill="hsl(var(--foreground))"
                  style={{ fontWeight: 'bold' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
         <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-sm mr-1.5" style={{ backgroundColor: 'hsl(var(--chart-1))' }}></span> High ROI (80-100%)
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-sm mr-1.5" style={{ backgroundColor: 'hsl(var(--chart-2))' }}></span> Medium ROI (70-79%)
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-sm mr-1.5" style={{ backgroundColor: 'hsl(var(--chart-3))' }}></span> Low ROI (&lt;70%)
            </div>
          </div>
      </CardContent>
    </Card>
  );
};

export default RoiChart;
