
"use client";

import React from 'react';
import type { Tool } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface RoiChartProps {
  tools: Tool[];
}

const RoiChart: React.FC<RoiChartProps> = ({ tools }) => {
  if (tools.length === 0) {
    return null; // Don't render if no tools
  }

  const chartData = tools.map(tool => ({
    name: tool.name,
    roi: tool.roi,
    fill: tool.roi >= 80 ? 'hsl(var(--chart-1))' : tool.roi >= 70 ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))',
  }));

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl">ROI Comparison</CardTitle>
        <CardDescription>Return on Investment (ROI) for selected tools.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 200 + tools.length * 30 }}> {/* Adjust height based on number of tools */}
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--foreground))" label={{ value: 'ROI (%)', position: 'insideBottom', offset: -5, fill: 'hsl(var(--foreground))' }} />
              <YAxis dataKey="name" type="category" stroke="hsl(var(--foreground))" width={100}  />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)' }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
              <Bar dataKey="roi" name="ROI">
                <LabelList dataKey="roi" position="right" formatter={(value: number) => `${value}%`} fill="hsl(var(--foreground))"/>
                {chartData.map((entry, index) => (
                  <rect key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
         <div className="mt-4 flex justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full mr-1.5" style={{ backgroundColor: 'hsl(var(--chart-1))' }}></span> High ROI (80-100%)
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full mr-1.5" style={{ backgroundColor: 'hsl(var(--chart-2))' }}></span> Medium ROI (70-79%)
            </div>
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full mr-1.5" style={{ backgroundColor: 'hsl(var(--destructive))' }}></span> Low ROI (&lt;70%)
            </div>
          </div>
      </CardContent>
    </Card>
  );
};

export default RoiChart;
