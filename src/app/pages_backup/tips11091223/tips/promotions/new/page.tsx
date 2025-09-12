"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Chip,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconCheck,
  IconX
} from '@tabler/icons-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { products } from '@/mocks/data';
import { formatMoneyRUB } from '@/mocks/types';
import ProductSelector from '@/components/ProductSelector';

// Стилизованные компоненты
const HeaderCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'var(--card-background)',
  borderRadius: 4,
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  marginBottom: 24,
}));

const FormCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'var(--card-background)',
  borderRadius: 4,
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  marginBottom: 24,
}));

const ProductCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'var(--muted)',
  borderRadius: 4,
  border: 'none',
  marginBottom: 16,
  boxShadow: 'none',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 4,
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 24px',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    backgroundColor: 'var(--muted)',
    border: '1px solid var(--border)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--hover-light)',
      borderColor: 'var(--border-light)',
    },
    '&.Mui-focused': {
      backgroundColor: 'var(--card-background)',
      boxShadow: '0 0 0 3px var(--hover-light)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px',
    },
    '& input[type="number"]': {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
      },
      '&[type="number"]': {
        MozAppearance: 'textfield',
      },
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--text-secondary)',
  },
  '& .MuiInputBase-input': {
    color: 'var(--text-primary)',
    '&::placeholder': {
      color: 'var(--text-secondary)',
      opacity: 1,
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'var(--text-secondary)',
    '&.Mui-error': {
      color: 'var(--danger)',
    },
  },
}));

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    backgroundColor: 'var(--muted)',
    border: '1px solid var(--border)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--hover-light)',
      borderColor: 'var(--border-light)',
    },
    '&.Mui-focused': {
      backgroundColor: 'var(--card-background)',
      boxShadow: '0 0 0 3px var(--hover-light)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 14px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--text-secondary)',
  },
  '& .MuiInputBase-input': {
    color: 'var(--text-primary)',
  },
  '& .MuiFormHelperText-root': {
    color: 'var(--text-secondary)',
    '&.Mui-error': {
      color: 'var(--danger)',
    },
  },
}));

const FileUploadField = styled(Box)(({ theme }) => ({
  position: 'relative',
  '& input[type="file"]': {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  '& .upload-area': {
    border: '2px dashed var(--border)',
    borderRadius: 4,
    padding: '24px',
    textAlign: 'center',
    backgroundColor: 'var(--muted)',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'var(--brand)',
      backgroundColor: 'var(--hover-light)',
    },
  },
}));

// Типы
interface ProductMotivation {
  productId: string;
  motivation: number; // в рублях
  waiterShare: number; // процент
  adminShare: number; // процент
}

interface FormData {
  name: string;
  description: string;
  startsAt: dayjs.Dayjs | null;
  endsAt: dayjs.Dayjs | null;
  products: ProductMotivation[];
  bannerUrl: string;
}

export default function CreatePromotionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    startsAt: null,
    endsAt: null,
    products: [],
    bannerUrl: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);

  // Автосохранение
  useEffect(() => {
    const savedData = localStorage.getItem('promotion-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Конвертируем строки дат обратно в dayjs объекты
        if (parsed.startsAt && typeof parsed.startsAt === 'string') {
          parsed.startsAt = dayjs(parsed.startsAt);
        } else if (parsed.startsAt === null) {
          parsed.startsAt = null;
        }
        if (parsed.endsAt && typeof parsed.endsAt === 'string') {
          parsed.endsAt = dayjs(parsed.endsAt);
        } else if (parsed.endsAt === null) {
          parsed.endsAt = null;
        }
        setFormData(parsed);
      } catch (e) {
        console.error('Ошибка загрузки черновика:', e);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Конвертируем dayjs объекты в строки для сохранения
      const dataToSave = {
        ...formData,
        startsAt: formData.startsAt ? formData.startsAt.format('YYYY-MM-DD') : null,
        endsAt: formData.endsAt ? formData.endsAt.format('YYYY-MM-DD') : null,
      };
      localStorage.setItem('promotion-draft', JSON.stringify(dataToSave));
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Валидация
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Название акции обязательно';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Название не должно превышать 100 символов';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Описание не должно превышать 1000 символов';
    }

    if (!formData.startsAt) {
      newErrors.startsAt = 'Дата начала обязательна';
    } else if (formData.startsAt.isBefore(dayjs(), 'day')) {
      newErrors.startsAt = 'Дата начала не может быть в прошлом';
    }

    if (!formData.endsAt) {
      newErrors.endsAt = 'Дата окончания обязательна';
    } else if (formData.startsAt && formData.endsAt.isSameOrBefore(formData.startsAt, 'day')) {
      newErrors.endsAt = 'Дата окончания должна быть больше даты начала';
    }

    if (formData.products.length === 0) {
      newErrors.products = 'Необходимо выбрать хотя бы один товар';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчики
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // В реальном приложении здесь будет загрузка файла на сервер
      // Пока что просто показываем имя файла
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, bannerUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addProducts = (productIds: string[]) => {
    const newProducts = productIds
      .filter(productId => !formData.products.find(p => p.productId === productId))
      .map(productId => ({
        productId,
        motivation: 100, // 100 рублей
        waiterShare: 60,
        adminShare: 10,
      }));

    setFormData(prev => ({
      ...prev,
      products: [...prev.products, ...newProducts]
    }));
  };

  const removeProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== productId)
    }));
  };

  const updateProductMotivation = (productId: string, field: keyof ProductMotivation, value: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(p => {
        if (p.productId !== productId) return p;
        
        const updated = { ...p, [field]: value };
        
        // Валидация процентов
        if (field === 'waiterShare' || field === 'adminShare') {
          const total = field === 'waiterShare' 
            ? value + updated.adminShare 
            : updated.waiterShare + value;
          
          if (total > 70) {
            // Если сумма превышает 70%, корректируем другой процент
            if (field === 'waiterShare') {
              updated.adminShare = Math.max(0, 70 - value);
            } else {
              updated.waiterShare = Math.max(0, 70 - value);
            }
          }
        }
        
        return updated;
      })
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Пожалуйста, исправьте ошибки в форме',
        severity: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Здесь будет API вызов для создания акции
      const submissionData = {
        ...formData,
        startsAt: formData.startsAt?.format('YYYY-MM-DD'),
        endsAt: formData.endsAt?.format('YYYY-MM-DD'),
        status: 'scheduled'
      };
      console.log('Создание акции:', submissionData);
      
      // Очищаем черновик
      localStorage.removeItem('promotion-draft');
      
      setSnackbar({
        open: true,
        message: 'Акция создана успешно',
        severity: 'success'
      });
      
      setTimeout(() => {
        router.push('/supplier/promotions');
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Ошибка при создании акции',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Заголовок */}
      <HeaderCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={() => router.back()}>
              <IconArrowLeft size={20} />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              Создание акции
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Заполните форму для создания новой акции. Все поля с * обязательны для заполнения.
          </Typography>
        </CardContent>
      </HeaderCard>

      {/* Блок 1: Основная информация */}
      <FormCard>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--text-primary)' }}>
            Основная информация
          </Typography>
          
          <Box sx={{ display: 'grid', gap: 3 }}>
            {/* Название акции */}
            <StyledTextField
              label="Название акции *"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name || `${formData.name.length}/100 символов`}
              fullWidth
              placeholder="Например: Осенняя дегустация виски"
            />

            {/* Описание акции */}
            <StyledTextField
              label="Описание акции"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description || `${formData.description.length}/1000 символов`}
              fullWidth
              multiline
              rows={4}
              placeholder="Опишите детали акции, условия участия, особенности..."
            />

            {/* Фото акции */}
            <FileUploadField>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <div className="upload-area">
                {formData.bannerUrl ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img 
                      src={formData.bannerUrl} 
                      alt="Превью" 
                      style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <Typography variant="body2" sx={{ color: 'var(--text-primary)' }}>
                      Фото загружено. Нажмите для изменения.
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" sx={{ color: 'var(--text-primary)', mb: 1 }}>
                      Загрузить фото акции
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                      Нажмите для выбора файла или перетащите изображение
                    </Typography>
                  </Box>
                )}
        </div>
            </FileUploadField>

            {/* Даты проведения */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <StyledDatePicker
                label="Дата начала *"
                value={formData.startsAt || null}
                onChange={(newValue) => handleInputChange('startsAt', newValue)}
                slotProps={{
                  textField: {
                    error: !!errors.startsAt,
                    helperText: errors.startsAt,
                  },
                }}
                format="DD.MM.YYYY"
              />
              <StyledDatePicker
                label="Дата окончания *"
                value={formData.endsAt || null}
                onChange={(newValue) => handleInputChange('endsAt', newValue)}
                slotProps={{
                  textField: {
                    error: !!errors.endsAt,
                    helperText: errors.endsAt,
                  },
                }}
                format="DD.MM.YYYY"
              />
            </Box>
          </Box>
        </CardContent>
      </FormCard>

      {/* Блок 2: Продвигаемые товары */}
      <FormCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              Продвигаемые товары
            </Typography>
            <Button
              variant="outlined"
              startIcon={<IconPlus size={16} />}
              onClick={() => setProductSelectorOpen(true)}
              sx={{ borderRadius: 4 }}
            >
              Добавить товар
            </Button>
          </Box>

          {errors.products && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.products}
            </Alert>
          )}

          {formData.products.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 4, 
              color: 'text.secondary',
              border: '2px dashed var(--border)',
              borderRadius: 4
            }}>
              <Typography variant="body2">
                Выберите товары для продвижения в акции
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gap: 2 }}>
              {formData.products.map((productMotivation) => {
                const product = products.find(p => p.id === productMotivation.productId);
                if (!product) return null;

                return (
                  <ProductCard key={productMotivation.productId}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                        {/* Фото товара */}
                        <Box sx={{ 
                          width: 80, 
                          height: 80, 
                          borderRadius: 4,
                          overflow: 'hidden',
                          flexShrink: 0,
                          backgroundColor: 'var(--image-background)'
                        }}>
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>

                        {/* Информация о товаре */}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {product.name}
                          </Typography>
                          
                          {/* Мотивация */}
                          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mt: 2 }}>
                            <StyledTextField
                              label="Мотивация (руб.)"
                              type="number"
                              value={productMotivation.motivation || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '') {
                                  updateProductMotivation(productMotivation.productId, 'motivation', 0);
                                } else {
                                  const numValue = parseFloat(value);
                                  if (!isNaN(numValue) && numValue >= 0) {
                                    updateProductMotivation(productMotivation.productId, 'motivation', numValue);
                                  }
                                }
                              }}
                              size="small"
                              InputProps={{ startAdornment: '₽' }}
                            />
                            <StyledTextField
                              label="Официанту (%)"
                              type="number"
                              value={productMotivation.waiterShare || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '') {
                                  updateProductMotivation(productMotivation.productId, 'waiterShare', 0);
                                } else {
                                  const numValue = parseInt(value);
                                  if (!isNaN(numValue) && numValue >= 0 && numValue <= 70) {
                                    updateProductMotivation(productMotivation.productId, 'waiterShare', numValue);
                                  }
                                }
                              }}
                              size="small"
                              InputProps={{ endAdornment: '%' }}
                              inputProps={{ min: 0, max: 70 }}
                            />
                            <StyledTextField
                              label="Администратору (%)"
                              type="number"
                              value={productMotivation.adminShare || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '') {
                                  updateProductMotivation(productMotivation.productId, 'adminShare', 0);
                                } else {
                                  const numValue = parseInt(value);
                                  if (!isNaN(numValue) && numValue >= 0 && numValue <= 70) {
                                    updateProductMotivation(productMotivation.productId, 'adminShare', numValue);
                                  }
                                }
                              }}
                              size="small"
                              InputProps={{ endAdornment: '%' }}
                              inputProps={{ min: 0, max: 70 }}
                            />
                          </Box>

                          {/* Итоговая информация */}
                          <Box sx={{ mt: 2, p: 2, backgroundColor: 'var(--motivation-background)', borderRadius: 4 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Распределение мотивации:
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                              <span>Официанту: <strong>{formatMoneyRUB({ amount: productMotivation.motivation * productMotivation.waiterShare / 100, currency: 'RUB' })}</strong></span>
                              <span>Администратору: <strong>{formatMoneyRUB({ amount: productMotivation.motivation * productMotivation.adminShare / 100, currency: 'RUB' })}</strong></span>
                              <span>GuestMe: <strong>{formatMoneyRUB({ amount: productMotivation.motivation * 0.3, currency: 'RUB' })}</strong></span>
                            </Box>
                            <Box sx={{ mt: 1, pt: 1, borderTop: '1px solid var(--motivation-border)' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'center' }}>
                                Общая мотивация: {formatMoneyRUB({ amount: productMotivation.motivation, currency: 'RUB' })}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                        {/* Кнопка удаления */}
                        <IconButton 
                          onClick={() => removeProduct(productMotivation.productId)}
                          sx={{ color: 'error.main' }}
                        >
                          <IconTrash size={20} />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </ProductCard>
                );
              })}
            </Box>
          )}
        </CardContent>
      </FormCard>

      {/* Блок 3: Подтверждение и публикация */}
      <FormCard>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'var(--text-primary)' }}>
            Подтверждение и публикация
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <ActionButton
              variant="outlined"
              onClick={() => router.back()}
              disabled={isSubmitting}
              startIcon={<IconX size={16} />}
            >
              Отмена
            </ActionButton>
            <ActionButton
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={<IconCheck size={16} />}
            >
              Создать акцию
            </ActionButton>
          </Box>
        </CardContent>
      </FormCard>

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Модальное окно выбора товаров */}
      <ProductSelector
        open={productSelectorOpen}
        onClose={() => setProductSelectorOpen(false)}
        onSelect={addProducts}
        selectedProducts={formData.products.map(p => p.productId)}
        title="Выбор товаров для акции"
      />
      </div>
    </LocalizationProvider>
  );
}
