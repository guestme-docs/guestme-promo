"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Point = { x: number; y: number };

export default function LineChart({ data, width=600, height=160 }: { data: Point[]; width?: number; height?: number }) {
  if (data.length === 0) return <div className="text-sm text-black/60 dark:text-white/60">Нет данных</div>;
  
  // Преобразуем данные для Recharts
  const chartData = data.map((point, index) => ({
    name: new Date(point.x).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' }),
    value: point.y,
    fullDate: new Date(point.x).toLocaleDateString('ru-RU')
  }));

  return (
    <div className="w-full" style={{ height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--brand)" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.7 }}
            axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.7 }}
            axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
                    <div className="text-sm font-medium mb-1">{data.fullDate}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Продаж: {data.value}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="var(--brand)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


