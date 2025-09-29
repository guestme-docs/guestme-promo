"use client";

import { useState } from 'react';
import { Box, Typography, Card, CardContent, Avatar, Button, TextField, Chip, Divider } from '@mui/material';
import { 
  IconEdit, 
  IconDeviceFloppy, 
  IconX,
  IconPhone,
  IconMail,
  IconMapPin,
  IconTarget,
  IconCalendar
} from '@tabler/icons-react';
import { tipsData } from '@/mocks/tips-data';

export default function TipsProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(tipsData.profile);

  const handleSave = () => {
    // Здесь будет логика сохранения
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(tipsData.profile);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Кнопки управления */}
      <div className="flex justify-end">
        {!isEditing ? (
          <Button
            variant="outlined"
            startIcon={<IconEdit size={16} />}
            onClick={() => setIsEditing(true)}
            sx={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              '&:hover': {
                borderColor: 'var(--primary-color)',
                backgroundColor: 'var(--hover-light)',
              }
            }}
          >
            Редактировать
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outlined"
              startIcon={<IconX size={16} />}
              onClick={handleCancel}
              sx={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
                '&:hover': {
                  borderColor: 'var(--error-color)',
                  backgroundColor: 'var(--hover-light)',
                }
              }}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              startIcon={<IconDeviceFloppy size={16} />}
              onClick={handleSave}
              sx={{
                backgroundColor: 'var(--primary-color)',
                '&:hover': {
                  backgroundColor: 'var(--primary-color-hover)',
                }
              }}
            >
              Сохранить
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - Основная информация */}
        <div className="lg:col-span-2 space-y-6">
          {/* Личная информация */}
          <Card sx={{ backgroundColor: 'var(--card-background)', border: '1px solid var(--card-border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Личная информация
              </Typography>
              
              <div className="space-y-4">
                {/* Аватар и имя */}
                <div className="flex items-center gap-4">
                  <Avatar 
                    src={editedProfile.avatar} 
                    alt={`${editedProfile.name} ${editedProfile.surname}`}
                    sx={{ 
                      width: 80, 
                      height: 80,
                      fontSize: '1.5rem'
                    }}
                  />
                  <div>
                    <Typography 
                      variant="h5" 
                      className="font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {editedProfile.name} {editedProfile.surname}
                    </Typography>
                    <Chip 
                      label={editedProfile.selfEmployedStatus === 'active' ? 'Самозанятый' : 'Неактивен'} 
                      color={editedProfile.selfEmployedStatus === 'active' ? 'success' : 'default'} 
                      size="small"
                      sx={{ marginTop: 1 }}
                    />
                  </div>
                </div>

                <Divider sx={{ borderColor: 'var(--border-color)' }} />

                {/* Контактная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <IconPhone size={20} color="var(--text-secondary)" />
                    <div>
                      <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                        Телефон
                      </Typography>
                      {isEditing ? (
                        <TextField
                          value={editedProfile.phone}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                          size="small"
                          fullWidth
                          sx={{
                            marginTop: 1,
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'var(--background)',
                              borderColor: 'var(--border-color)',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" style={{ color: 'var(--text-primary)' }}>
                          {editedProfile.phone}
                        </Typography>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <IconMail size={20} color="var(--text-secondary)" />
                    <div>
                      <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                        Email
                      </Typography>
                      {isEditing ? (
                        <TextField
                          value={editedProfile.email || ''}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                          size="small"
                          fullWidth
                          sx={{
                            marginTop: 1,
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'var(--background)',
                              borderColor: 'var(--border-color)',
                            }
                          }}
                        />
                      ) : (
                        <Typography variant="body1" style={{ color: 'var(--text-primary)' }}>
                          {editedProfile.email || 'Не указан'}
                        </Typography>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рестораны */}
          <Card sx={{ backgroundColor: 'var(--card-background)', border: '1px solid var(--card-border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Мои рестораны
              </Typography>
              
              <div className="space-y-3">
                {editedProfile.restaurants.map((restaurant) => (
                  <div key={restaurant.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                    <div className="flex items-center gap-3">
                      <IconMapPin size={20} color="var(--text-secondary)" />
                      <Typography style={{ color: 'var(--text-primary)' }}>
                        {restaurant.name}
                      </Typography>
                    </div>
                    <Chip 
                      label={restaurant.status === 'active' ? 'Активен' : 'Неактивен'} 
                      color={restaurant.status === 'active' ? 'success' : 'default'} 
                      size="small"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Правая колонка - Цели */}
        <div className="space-y-6">
          <Card sx={{ backgroundColor: 'var(--card-background)', border: '1px solid var(--card-border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Мои цели
              </Typography>
              
              <div className="space-y-4">
                {editedProfile.goals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Typography 
                        variant="body2" 
                        className="font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {goal.title}
                      </Typography>
                      <Chip 
                        label={goal.active ? 'Активна' : 'Завершена'} 
                        color={goal.active ? 'primary' : 'default'} 
                        size="small"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span>₽{goal.current.toLocaleString()} из ₽{goal.target.toLocaleString()}</span>
                        <span>{Math.round((goal.current / goal.target) * 100)}%</span>
                      </div>
                      
                      <div 
                        className="h-2 rounded-full"
                        style={{ backgroundColor: 'var(--muted)' }}
                      >
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: 'var(--primary-color)',
                            width: `${Math.min((goal.current / goal.target) * 100, 100)}%`
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <IconCalendar size={12} />
                        <span>до {formatDate(goal.deadline)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Статистика */}
          <Card sx={{ backgroundColor: 'var(--card-background)', border: '1px solid var(--card-border)' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography 
                variant="h6" 
                className="font-semibold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                Статистика
              </Typography>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Всего чаевых</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    ₽{tipsData.stats.tips.total.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Количество чаевых</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {tipsData.stats.tips.count}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Средний размер</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    ₽{tipsData.stats.tips.averageAmount}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Рейтинг</span>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {tipsData.stats.reviews.averageRating.toFixed(1)}⭐
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
