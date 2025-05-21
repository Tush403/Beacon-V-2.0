
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import type { Tool, RoiTimePoint } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface RoiChartProps {
  tools: Tool[];
}

interface ChartDataPoint {
  month: number;
  [toolName: string]: number | undefined;
}

const lineColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const RoiChart: React.FC<RoiChartProps> = ({ tools }) => {
  const [tooltipStyleRadius, setTooltipStyleRadius] = useState<string>('0.375rem');

  useEffect(() => {
    try {
      const rootStyle = getComputedStyle(document.documentElement);
      const radiusCssVar = rootStyle.getPropertyValue('--radius').trim();
      setTooltipStyleRadius(radiusCssVar);
    } catch (error) {
      console.warn("Could not calculate dynamic styles for chart tooltip:", error);
    }
  }, []);

  const chartData: ChartDataPoint[] = useMemo(() => {
    if (!tools || tools.length === 0) {
      return [];
    }

    const monthSet = new Set<number>();
    tools.forEach(tool => {
      tool.roiProjection?.forEach(p => monthSet.add(p.month));
    });
    const sortedMonths = Array.from(monthSet).sort((a, b) => a - b);

    if (sortedMonths.length === 0) return [];

    return sortedMonths.map(month => {
      const dataPoint: ChartDataPoint = { month };
      tools.forEach(tool => {
        const projectionPoint = tool.roiProjection?.find(p => p.month === month);
        dataPoint[tool.name] = projectionPoint?.roi;
      });
      return dataPoint;
    });
  }, [tools]);

  if (tools.length === 0 || chartData.length === 0) {
    return (
      <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-accent"/>ROI Projection Comparison</CardTitle>
          <CardDescription>Select tools and apply filters to see ROI projection data.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">No ROI projection data to display. Please refine your selection.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-lg border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center"><TrendingUp className="mr-2 h-6 w-6 text-accent"/>ROI Projection Comparison</CardTitle>
        <CardDescription>Projected Return on Investment (ROI) for the selected tools over 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 300 + tools.length * 20 }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--foreground)/0.8)"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'Month', position: 'insideBottom', offset: -10, fill: 'hsl(var(--muted-foreground))' }}
                type="number"
                domain={['dataMin', 'dataMax']}
                tickFormatter={(tick) => `M${tick}`}
              />
              <YAxis
                stroke="hsl(var(--foreground)/0.8)"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 100]}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3', stroke: 'hsl(var(--accent)/0.5)' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  color: 'hsl(var(--popover-foreground))',
                  borderRadius: tooltipStyleRadius,
                  borderColor: 'hsl(var(--border))',
                  boxShadow: '0 4px 12px hsl(var(--primary)/0.2)',
                }}
                formatter={(value: number, name: string) => [`${value}%`, name]}
                labelFormatter={(label: number) => `Month ${label}`}
              />
              <Legend
                wrapperStyle={{ color: 'hsl(var(--muted-foreground))', paddingTop: '10px' }}
                formatter={(value) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>}
              />
              {tools.map((tool, index) => (
                <Line
                  key={tool.id}
                  type="monotone"
                  dataKey={tool.name}
                  stroke={lineColors[index % lineColors.length]}
                  strokeWidth={2.5}
                  activeDot={{ r: 7, strokeWidth: 2, fill: lineColors[index % lineColors.length] }}
                  dot={{ r: 4, strokeWidth: 1}}
                  connectNulls // Optional: to connect points even if there are nulls in data
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoiChart;
