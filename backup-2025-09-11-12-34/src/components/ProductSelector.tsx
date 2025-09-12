"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
  Chip,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconSearch, IconX, IconPlus } from '@tabler/icons-react';
import { products } from '@/mocks/data';

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
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'var(--background)',
    borderRadius: 4,
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: 4,
  border: '1px solid var(--card-border)',
  width: '100%',
  height: '160px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'var(--card-background)',
  boxShadow: 'var(--shadow-light)',
  '&.selected': {
    borderColor: 'var(--brand)',
    backgroundColor: 'var(--hover-light)',
  },
}));

interface ProductSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (productIds: string[]) => void;
  selectedProducts: string[];
  title?: string;
}

export default function ProductSelector({ 
  open, 
  onClose, 
  onSelect, 
  selectedProducts, 
  title = "Выбор товаров" 
}: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelected, setLocalSelected] = useState<string[]>(selectedProducts);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductToggle = (productId: string) => {
    setLocalSelected(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleConfirm = () => {
    onSelect(localSelected);
    onClose();
  };

  const handleCancel = () => {
    setLocalSelected(selectedProducts);
    onClose();
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1,
        backgroundColor: 'var(--background)',
        color: 'var(--text-primary)',
        fontWeight: 600,
        fontSize: '1.25rem'
      }}>
        {title}
        <IconButton onClick={handleCancel} size="small" sx={{ color: 'var(--text-secondary)' }}>
          <IconX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, backgroundColor: 'var(--background)' }}>
        {/* Поиск */}
        <StyledTextField
          fullWidth
          placeholder="Поиск товаров..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <IconSearch size={20} style={{ marginRight: 8, color: '#6b7280' }} />
          }}
          sx={{ mb: 3 }}
        />

        {/* Список товаров */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {filteredProducts.map((product) => (
              <Box key={product.id} sx={{ width: 'calc(32% - 8px)', minWidth: '180px' }}>
                <ProductCard
                  className={localSelected.includes(product.id) ? 'selected' : ''}
                  onClick={() => handleProductToggle(product.id)}
                >
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    {/* Индикатор выбора - в правом верхнем углу */}
                    {localSelected.includes(product.id) && (
                      <Box sx={{ 
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 20, 
                        height: 20, 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                      }}>
                        <IconPlus size={12} color="var(--brand-foreground)" />
                      </Box>
                    )}
                    
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flex: 1 }}>
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
                      <Box sx={{ flex: 1, minWidth: 0, pr: localSelected.includes(product.id) ? 3 : 0 }}>
                        <Typography variant="subtitle2" sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          color: 'var(--text-primary)'
                        }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" sx={{
                          fontSize: '0.75rem',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          color: 'var(--text-secondary)'
                        }}>
                          {product.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </ProductCard>
              </Box>
            ))}
          </Box>
        </Box>

      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, backgroundColor: 'var(--background)' }}>
        <Button onClick={handleCancel} variant="outlined" sx={{ borderRadius: 4 }}>
          Отмена
        </Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          sx={{ 
            borderRadius: 4,
            backgroundColor: 'var(--brand)',
            color: 'var(--brand-foreground)',
            '&:hover': {
              backgroundColor: 'var(--brand-hover)',
            }
          }}
          disabled={localSelected.length === 0}
        >
          Выбрать ({localSelected.length})
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}
