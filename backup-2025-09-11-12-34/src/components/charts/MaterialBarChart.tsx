"use client";

import { BarChart as MuiBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

type BarItem = { label: string; value: number };

export default function MaterialBarChart({ data }: { data: BarItem[] }) {
  if (data.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Нет данных
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Топ‑5 акций
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <MuiBarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="label" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              fontSize={12}
            />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
                      <p style={{ margin: 0, color: '#1976d2' }}>
                        Продаж: {payload[0].value}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="value" 
              fill="#1976d2"
              radius={[4, 4, 0, 0]}
              maxBarSize={80}
            />
          </MuiBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

