"use client";

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

type Slice = { label: string; value: number; color: string };

export default function PieChart({ data, size=128 }: { data: Slice[]; size?: number }) {
  const total = data.reduce((a,b)=>a+b.value,0);
  if (total === 0) return <div className="text-sm text-black/60 dark:text-white/60">Нет данных</div>;
  
  // Преобразуем данные для Recharts
  const chartData = data.map((slice, index) => ({
    name: slice.label,
    value: slice.value,
    color: slice.color,
    percentage: ((slice.value / total) * 100).toFixed(1)
  }));

  return (
    <div className="w-full flex flex-col" style={{ height: size }}>
      <div className="flex-1 pb-2">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={size * 0.3}
              outerRadius={size * 0.48}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
                      <div className="text-sm font-medium mb-1">{data.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Продаж: {data.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Доля: {data.percentage}%
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Легенда */}
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-1 text-xs">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-black/70 dark:text-white/70 truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


