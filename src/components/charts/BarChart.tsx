"use client";

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

type Bar = { label: string; value: number };

export default function BarChart({ data, width=600, height=180 }: { data: Bar[]; width?: number; height?: number }) {
  if (data.length === 0) {
    return <div className="text-sm text-black/60 dark:text-white/60">Нет данных</div>;
  }

  // Преобразуем данные для Recharts
  const chartData = data.map((item) => ({
    name: item.label.length > 20 ? item.label.substring(0, 20) + "..." : item.label,
    value: item.value,
    fullName: item.label
  }));

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          margin={{
            top: 30, // Место для подписей значений сверху
            right: 50, // Больше места справа для наклонных названий
            left: 50,  // Больше места слева для наклонных названий
            bottom: 80, // Больше места для наклонных названий
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.7 }}
            axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
            angle={-45} // Наклонные названия
            textAnchor="end"
            height={80} // Высота для наклонных названий
            interval={0} // Показываем все названия
          />
          {/* Убираем YAxis - значения будут на барах */}
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3">
                    <div className="text-sm font-medium mb-1">{data.fullName}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Продаж: {data.value}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar 
            dataKey="value" 
            fill="var(--brand)" 
            radius={[4, 4, 0, 0]}
            maxBarSize={80}
            label={{ 
              position: 'top', 
              fontSize: 12, 
              fill: 'currentColor',
              opacity: 0.8
            }}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}


