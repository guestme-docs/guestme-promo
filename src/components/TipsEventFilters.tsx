"use client";

import { Typography, Box, FormControlLabel, Checkbox, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconRefresh, IconStar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

type EventFilter = {
  types: string[];
  starRating: number | null;
  period: 'all' | 'today' | 'week' | 'month';
};

type TipsEventFiltersProps = {
  filters: EventFilter;
  onFiltersChange: (filters: EventFilter) => void;
  onReset: () => void;
  starCounts: { [key: number]: number };
};

const FilterSection = styled(Box)({
  marginBottom: 20,
  '&:last-child': {
    marginBottom: 0,
  },
});

const FilterTitle = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: 12,
  color: 'var(--text-primary)',
});

const PeriodButton = styled(Button)<{ $active?: string }>(({ $active }) => ({
  borderRadius: 4,
  backgroundColor: $active ? 'var(--brand)' : 'var(--card-background)',
  color: $active ? 'white' : 'var(--text-primary)',
  border: '1px solid var(--border)',
  padding: '8px 16px',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: $active ? 'var(--brand-dark)' : 'var(--hover-light)',
    borderColor: 'var(--brand)',
  },
}));

const StarFilterItem = styled(Box)<{ $active?: string }>(({ $active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 0',
  cursor: 'pointer',
  borderRadius: 4,
  paddingLeft: 8,
  paddingRight: 8,
  '&:hover': {
    backgroundColor: 'var(--hover-light)',
  },
}));

const StarCountText = styled(Typography)<{ $active?: string }>(({ $active }) => ({
  fontSize: '0.875rem',
  color: $active ? 'var(--brand)' : 'var(--text-primary)',
  fontWeight: $active ? 600 : 400,
  cursor: 'pointer',
  '&:hover': {
    color: 'var(--brand)',
  },
}));

const StarContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
});

const StarIcon = styled(Box)({
  width: 16,
  height: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  border: '1px solid var(--border)',
});

const ResetButton = styled(Button)({
  borderRadius: 4,
  backgroundColor: 'transparent',
  color: 'var(--text-secondary)',
  border: '1px solid var(--border)',
  padding: '10px 20px',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'var(--hover-light)',
    borderColor: 'var(--brand)',
    color: 'var(--brand)',
  },
});

const CheckboxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const StarFilterContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const PeriodContainer = styled(Box)({
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
});

const renderStars = (rating: number, size: number = 16) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon key={i}>
        <IconStar 
          size={size} 
          color={i <= rating ? "#FFD700" : "var(--text-secondary)"}
          fill={i <= rating ? "#FFD700" : "none"}
          stroke={i <= rating ? "#FFD700" : "var(--text-secondary)"}
          strokeWidth={1}
        />
      </StarIcon>
    );
  }
  return <StarContainer>{stars}</StarContainer>;
};

export default function TipsEventFilters({ 
  filters, 
  onFiltersChange, 
  onReset,
  starCounts 
}: TipsEventFiltersProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked 
      ? [...filters.types, type]
      : filters.types.filter(t => t !== type);
    
    onFiltersChange({
      ...filters,
      types: newTypes,
    });
  };

  const handleStarRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      starRating: filters.starRating === rating ? null : rating,
    });
  };

  const handlePeriodChange = (period: 'all' | 'today' | 'week' | 'month') => {
    onFiltersChange({
      ...filters,
      period,
    });
  };

  if (!isClient) {
    return (
      <div>
        <div className="p-5">
          <div>Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-5">
        {/* Типы событий */}
        <FilterSection>
          <FilterTitle>Тип события</FilterTitle>
          <CheckboxContainer>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.types.includes('tip_with_review')}
                  onChange={(e) => handleTypeChange('tip_with_review', e.target.checked)}
                  sx={{
                    color: 'var(--text-secondary)',
                    '&.Mui-checked': {
                      color: 'var(--brand)',
                    },
                  }}
                />
              }
              label="Чаевые"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.types.includes('review_only')}
                  onChange={(e) => handleTypeChange('review_only', e.target.checked)}
                  sx={{
                    color: 'var(--text-secondary)',
                    '&.Mui-checked': {
                      color: 'var(--brand)',
                    },
                  }}
                />
              }
              label="Отзывы"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.types.includes('promo_sale')}
                  onChange={(e) => handleTypeChange('promo_sale', e.target.checked)}
                  sx={{
                    color: 'var(--text-secondary)',
                    '&.Mui-checked': {
                      color: 'var(--brand)',
                    },
                  }}
                />
              }
              label="Промо"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                },
              }}
            />
          </CheckboxContainer>
        </FilterSection>

        {/* Фильтр по звездам */}
        <FilterSection>
          <FilterTitle>Оценка</FilterTitle>
          <StarFilterContainer>
            {[5, 4, 3, 2, 1].map((rating) => (
              <StarFilterItem key={rating}>
                {renderStars(rating)}
                <StarCountText
                  $active={filters.starRating === rating ? "true" : undefined}
                  onClick={() => handleStarRatingChange(rating)}
                >
                  ({starCounts[rating] || 0})
                </StarCountText>
              </StarFilterItem>
            ))}
          </StarFilterContainer>
        </FilterSection>

        {/* Период */}
        <FilterSection>
          <FilterTitle>Период</FilterTitle>
          <PeriodContainer>
            <PeriodButton
              $active={filters.period === 'all' ? "true" : undefined}
              onClick={() => handlePeriodChange('all')}
            >
              Все
            </PeriodButton>
            <PeriodButton
              $active={filters.period === 'today' ? "true" : undefined}
              onClick={() => handlePeriodChange('today')}
            >
              Сегодня
            </PeriodButton>
            <PeriodButton
              $active={filters.period === 'week' ? "true" : undefined}
              onClick={() => handlePeriodChange('week')}
            >
              Неделя
            </PeriodButton>
            <PeriodButton
              $active={filters.period === 'month' ? "true" : undefined}
              onClick={() => handlePeriodChange('month')}
            >
              Месяц
            </PeriodButton>
          </PeriodContainer>
        </FilterSection>

        {/* Сброс фильтров */}
        <FilterSection>
          <ResetButton onClick={onReset}>
            <IconRefresh size={16} style={{ marginRight: 8 }} />
            Сбросить
          </ResetButton>
        </FilterSection>
      </div>
    </div>
  );
}