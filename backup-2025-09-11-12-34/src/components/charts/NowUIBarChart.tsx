"use client";

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

type BarItem = { label: string; value: number };

const GradientCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.mode === 'dark' ? '0 1px 3px rgba(0, 0, 0, 0.5)' : 'none',
  border: theme.palette.mode === 'dark' ? '1px solid #2a2a2a' : 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' ? '0 8px 25px rgba(106, 232, 197, 0.15)' : '0 8px 25px rgba(0,0,0,0.1)',
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  color: theme.palette.text.primary,
}));

const CustomTooltip = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: theme.palette.mode === 'dark' ? '1px solid rgba(42, 42, 42, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 4,
  padding: '12px 16px',
  boxShadow: theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.1)',
  color: theme.palette.text.primary,
}));

function NowUIBarChart({ data }: { data: BarItem[] }) {
  if (data.length === 0) {
    return (
      <GradientCard>
        <CardContent sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Нет данных
          </Typography>
        </CardContent>
      </GradientCard>
    );
  }

  return (
    <GradientCard>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 3 }}>
          <TitleTypography variant="h6">
            Топ акций
          </TitleTypography>
        </Box>
        
        <Box sx={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height={320}>
          <RechartsBarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(106, 232, 197)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="rgb(106, 232, 197)" stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(163, 163, 163, 0.2)" />
            
            <XAxis 
              dataKey="label" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              fontSize={12}
              stroke="rgb(163, 163, 163)"
              tick={{ fill: 'rgb(163, 163, 163)' }}
            />
            
            <YAxis 
              fontSize={12}
              stroke="rgb(163, 163, 163)"
              tick={{ fill: 'rgb(163, 163, 163)' }}
            />
            
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <CustomTooltip>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgb(106, 232, 197)' }}>
                        Продаж: {payload[0].value}
                      </Typography>
                    </CustomTooltip>
                  );
                }
                return null;
              }}
            />
            
            <Bar 
              dataKey="value" 
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
            />
          </RechartsBarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </GradientCard>
  );
}

export default React.memo(NowUIBarChart);
