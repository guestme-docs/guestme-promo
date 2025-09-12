"use client";

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

type MaterialStatCardProps = {
  title: string;
  value: string | number;
  growth?: number;
  tone?: "default" | "success" | "warning" | "muted";
  onClick?: () => void;
  hoverable?: boolean;
};

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone?: string }>(({ theme, tone }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  },
  ...(tone === 'success' && {
    borderLeft: `4px solid ${theme.palette.success.main}`,
  }),
  ...(tone === 'warning' && {
    borderLeft: `4px solid ${theme.palette.warning.main}`,
  }),
}));

const ValueTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone?: string }>(({ theme, tone }) => ({
  fontWeight: 'bold',
  ...(tone === 'success' && {
    color: theme.palette.success.main,
  }),
  ...(tone === 'warning' && {
    color: theme.palette.warning.main,
  }),
}));

export default function MaterialStatCard({ 
  title, 
  value, 
  growth,
  tone = "default", 
  onClick,
  hoverable = false 
}: MaterialStatCardProps) {
  return (
    <StyledCard 
      tone={tone}
      onClick={onClick}
      sx={{ 
        cursor: hoverable || onClick ? 'pointer' : 'default',
        '&:hover': hoverable || onClick ? {} : { transform: 'none', boxShadow: 'none' }
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 1 }}>
          <ValueTypography variant="h4" tone={tone}>
            {value}
          </ValueTypography>
          
          {growth !== undefined && (
            <Chip
              label={`${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`}
              size="small"
              color={growth >= 0 ? 'success' : 'error'}
              sx={{ fontSize: '0.75rem' }}
            />
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
}


