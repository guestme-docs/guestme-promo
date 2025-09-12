#!/usr/bin/env node

/**
 * Скрипт проверки целостности портала поставщика
 * Запускайте перед любыми изменениями проекта
 */

const fs = require('fs');
const path = require('path');

const SUPPLIER_PORTAL_PATH = 'src/app/supplier';
const BACKUP_PATH = 'backup-supplier-portal';

console.log('🛡️ Проверка целостности портала поставщика...\n');

// Проверяем существование папки портала
if (!fs.existsSync(SUPPLIER_PORTAL_PATH)) {
  console.error('❌ ОШИБКА: Папка портала поставщика не найдена!');
  console.log('💡 Восстановите из бекапа: backup-supplier-portal/');
  process.exit(1);
}

// Проверяем существование бекапа
if (!fs.existsSync(BACKUP_PATH)) {
  console.error('❌ ОШИБКА: Бекап портала поставщика не найден!');
  console.log('💡 Создайте бекап перед продолжением работы');
  process.exit(1);
}

// Проверяем ключевые файлы
const criticalFiles = [
  'src/app/supplier/page.tsx',
  'src/app/supplier/layout.tsx',
  'src/app/supplier/promotions/page.tsx',
  'src/components/AppShell.tsx',
  'src/components/Dashboard.tsx',
  'src/mocks/data.ts'
];

let allFilesExist = true;

criticalFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Отсутствует критический файл: ${file}`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n💡 Восстановите недостающие файлы из бекапа!');
  process.exit(1);
}

console.log('✅ Портал поставщика в порядке');
console.log('✅ Все критические файлы на месте');
console.log('✅ Бекап доступен для восстановления');
console.log('\n🛡️ Портал поставщика защищен!');
console.log('📝 Не изменяйте файлы без разрешения пользователя');




