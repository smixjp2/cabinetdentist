"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { date: "Lun", total: Math.floor(Math.random() * 5000) + 1000 },
  { date: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { date: "Mer", total: Math.floor(Math.random() * 5000) + 1000 },
  { date: "Jeu", total: Math.floor(Math.random() * 5000) + 1000 },
  { date: "Ven", total: Math.floor(Math.random() * 5000) + 1000 },
  { date: "Sam", total: Math.floor(Math.random() * 5000) + 1000 },
  { date: "Dim", total: Math.floor(Math.random() * 5000) + 1000 },
];

export default function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recettes de la semaine</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
