# Цветовая схема GuestMe

## Основные цвета

### Брендовые цвета
- `--brand`: `rgb(106, 232, 197)` - Основной мятный цвет GuestMe
- `--brand-foreground`: `#292929` - Темный текст на светлом фоне
- `--brand-dark`: `#292929` - Второстепенный цвет
- `--brand-dark-foreground`: `#ffffff` - Белый текст на темном фоне

### Основные цвета
- `--background`: `#ffffff` - Основной фон
- `--foreground`: `#171717` - Основной текст

### Поверхности и карточки
- `--muted`: `#f8fafc` - Приглушенный фон
- `--muted-foreground`: `#64748b` - Приглушенный текст
- `--card-background`: `#ffffff` - Фон карточек
- `--card-border`: `#e2e8f0` - Границы карточек

### Границы и разделители
- `--border`: `#e2e8f0` - Основные границы
- `--border-light`: `#f1f5f9` - Светлые границы
- `--border-muted`: `rgba(163, 163, 163, 0.3)` - Приглушенные границы

### Тени
- `--shadow-light`: `0 1px 3px rgba(0, 0, 0, 0.1)` - Легкие тени
- `--shadow-hover`: `0 8px 25px rgba(106, 232, 197, 0.15)` - Тени при наведении

### Состояния
- `--success`: `#10b981` - Успех
- `--warning`: `#f59e0b` - Предупреждение
- `--danger`: `#ef4444` - Ошибка
- `--info`: `rgb(106, 232, 197)` - Информация (мятный)

### Hover состояния
- `--hover`: `rgba(106, 232, 197, 0.1)` - Основной hover
- `--hover-light`: `rgba(106, 232, 197, 0.05)` - Легкий hover
- `--hover-medium`: `rgba(106, 232, 197, 0.2)` - Средний hover

### Текст
- `--text-primary`: `#171717` - Основной текст
- `--text-secondary`: `#6b7280` - Вторичный текст
- `--text-muted`: `#a3a3a3` - Приглушенный текст

### Фоны для элементов
- `--image-background`: `rgba(163, 163, 163, 0.1)` - Фон изображений
- `--motivation-background`: `rgba(163, 163, 163, 0.05)` - Фон мотивации
- `--motivation-border`: `rgba(163, 163, 163, 0.2)` - Граница мотивации

### KPI цвета
- `--kpi-background`: `#f8fafc` - Темный фон для всех KPI
- `--kpi-text`: `#ffffff` - Белый текст для всех KPI
- `--kpi-success`: `rgb(106, 232, 197)` - Мятный только для активных акций
- `--kpi-success-text`: `#292929` - Темный текст на мятном фоне

### Growth цвета
- `--growth-positive`: `rgb(106, 232, 197)` - Мятный для положительного роста
- `--growth-negative`: `#ef4444` - Красный для отрицательного роста
- `--growth-icon-positive`: `rgb(106, 232, 197)` - Мятный для иконки положительного роста
- `--growth-icon-negative`: `#ef4444` - Красный для иконки отрицательного роста
- `--growth-chip-positive`: `rgb(106, 232, 197)` - Мятный для чипа положительного роста
- `--growth-chip-negative`: `#ef4444` - Красный для чипа отрицательного роста

### Tooltip
- `--tooltip-background`: `#ffffff` - Фон тултипа
- `--tooltip-border`: `#e2e8f0` - Граница тултипа
- `--tooltip-text`: `#171717` - Основной текст тултипа
- `--tooltip-text-secondary`: `#6b7280` - Вторичный текст тултипа

## Темная тема

Все цвета автоматически переключаются в темной теме:

### Основные цвета
- `--background`: `#111111` - Темный фон
- `--foreground`: `#ffffff` - Белый текст

### Поверхности и карточки
- `--card-background`: `#1a1a1a` - Темный фон карточек
- `--card-border`: `#2a2a2a` - Темные границы карточек

### Границы и разделители
- `--border`: `#2a2a2a` - Темные границы
- `--border-light`: `#333333` - Светлые границы

### Тени
- `--shadow-light`: `0 1px 3px rgba(0, 0, 0, 0.5)` - Темные тени

### Текст
- `--text-primary`: `#ffffff` - Белый текст
- `--text-secondary`: `#a3a3a3` - Приглушенный текст
- `--text-muted`: `#a3a3a3` - Мутный текст

### KPI цвета (темная тема)
- `--kpi-background`: `#1a1a1a` - Темный фон для всех KPI
- `--kpi-text`: `#ffffff` - Белый текст остается
- `--kpi-success`: `rgb(106, 232, 197)` - Мятный остается
- `--kpi-success-text`: `#111111` - Темный текст на мятном фоне

### Growth цвета (темная тема)
- `--growth-positive`: `rgb(106, 232, 197)` - Мятный остается
- `--growth-icon-positive`: `rgb(106, 232, 197)` - Мятный остается
- `--growth-chip-positive`: `rgb(106, 232, 197)` - Мятный для чипа положительного роста
- `--growth-chip-negative`: `#ef4444` - Красный для чипа отрицательного роста

### Tooltip (темная тема)
- `--tooltip-background`: `#1a1a1a` - Темный фон тултипа
- `--tooltip-border`: `#2a2a2a` - Темные границы тултипа
- `--tooltip-text`: `#ffffff` - Белый текст тултипа
- `--tooltip-text-secondary`: `#a3a3a3` - Приглушенный текст тултипа

## Использование

### В CSS
```css
.my-component {
  background-color: var(--card-background);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
}

.my-component:hover {
  box-shadow: var(--shadow-hover);
}
```

### В Tailwind CSS
```css
.my-component {
  @apply bg-[var(--card-background)] border border-[var(--card-border)] text-[var(--text-primary)];
}

.my-component:hover {
  @apply shadow-[var(--shadow-hover)];
}
```

### В Material-UI styled компонентах
```typescript
const StyledComponent = styled(Box)({
  backgroundColor: 'var(--card-background)',
  border: '1px solid var(--card-border)',
  color: 'var(--text-primary)',
  '&:hover': {
    boxShadow: 'var(--shadow-hover)',
  },
});
```

### В sx prop
```typescript
<Box sx={{
  backgroundColor: 'var(--card-background)',
  border: '1px solid var(--card-border)',
  color: 'var(--text-primary)',
  '&:hover': {
    boxShadow: 'var(--shadow-hover)',
  },
}} />
```

## Преимущества

1. **Централизованное управление** - все цвета в одном месте
2. **Автоматическое переключение тем** - темная тема работает автоматически
3. **Консистентность** - одинаковые цвета во всех компонентах
4. **Легкость изменений** - изменить цвет в одном месте = изменить везде
5. **Поддержка браузеров** - CSS переменные поддерживаются всеми современными браузерами
