// Тест данных, которые должны отображаться в браузере
const fs = require('fs');

// Читаем data.ts файл
const dataContent = fs.readFileSync('src/mocks/data.ts', 'utf8');

// Извлекаем summary
const summaryMatch = dataContent.match(/export const summary: DashboardSummary = \{([\s\S]*?)\};/);
if (summaryMatch) {
  console.log('=== SUMMARY ДАННЫЕ ===');
  console.log(summaryMatch[1]);
}

// Извлекаем promotions
const promotionsMatch = dataContent.match(/export const promotions: Promotion\[\] = \[([\s\S]*?)\];/);
if (promotionsMatch) {
  console.log('\n=== PROMOTIONS ДАННЫЕ ===');
  // Показываем только активные акции
  const activePromotions = promotionsMatch[1].match(/\{[\s\S]*?status: "active"[\s\S]*?\}/g);
  if (activePromotions) {
    activePromotions.forEach((promotion, index) => {
      console.log(`\nАктивная акция ${index + 1}:`);
      console.log(promotion);
    });
  }
}

// Проверяем, есть ли вызовы calculatePromotionStats
const calculateCalls = dataContent.match(/calculatePromotionStats\([^)]+\)/g);
if (calculateCalls) {
  console.log('\n=== ВЫЗОВЫ calculatePromotionStats ===');
  calculateCalls.forEach((call, index) => {
    console.log(`${index + 1}. ${call}`);
  });
}




