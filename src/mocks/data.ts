import { DashboardSummary, Money, Promotion, PromotionStatus, Restaurant, Product, SaleEvent, SaleItem, Waiter, PaymentBreakdown } from "@/mocks/types";
import { allLiveSales } from "./static_sales_data_new";

// Статические даты без генерации
const ms = (d: number) => `2025-09-09T${String(Math.floor(d / 3600000)).padStart(2, '0')}:${String(Math.floor((d % 3600000) / 60000)).padStart(2, '0')}:00.000Z`;

const rub = (n: number): Money => ({ amount: n, currency: "RUB" });




export const restaurants: Restaurant[] = [
  { id: "r1", name: "Gastropub 12", address: "Москва, ул. Тверская, 12", phone: "+7 495 111-22-33", inn: "7701234567", adminFullName: "Иванов Иван Иванович", adminPhone: "+7 925 000-11-22", adminEmail: "ivanov@gastropub12.ru", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop&crop=center" },
  { id: "r2", name: "Bar&Kitchen", address: "Москва, пр-т Мира, 18", phone: "+7 495 222-33-44", inn: "7707654321", adminFullName: "Петров Пётр Петрович", adminPhone: "+7 926 111-22-33", adminEmail: "petrov@barkitchen.ru", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop&crop=center" },
  { id: "r3", name: "Sky Lounge", address: "Москва, наб. Тараса Шевченко, 23", phone: "+7 495 333-44-55", inn: "7709876543", adminFullName: "Сидорова Анна Сергеевна", adminPhone: "+7 903 222-33-44", adminEmail: "sidorova@skylounge.ru", imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop&crop=center" },
  { id: "r4", name: "Brewery House", address: "Москва, ул. Арбат, 45", phone: "+7 495 444-55-66", inn: "7701111111", adminFullName: "Козлов Алексей Владимирович", adminPhone: "+7 904 333-44-55", adminEmail: "kozlov@breweryhouse.ru", imageUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=400&fit=crop&crop=center" },
  { id: "r5", name: "Wine Bar Elegance", address: "Москва, ул. Кузнецкий мост, 7", phone: "+7 495 555-66-77", inn: "7702222222", adminFullName: "Морозова Елена Дмитриевна", adminPhone: "+7 905 444-55-66", adminEmail: "morozova@winebar.ru", imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=400&fit=crop&crop=center" },
  { id: "r6", name: "Craft Cocktails", address: "Москва, ул. Никольская, 15", phone: "+7 495 666-77-88", inn: "7703333333", adminFullName: "Волков Павел Сергеевич", adminPhone: "+7 906 555-66-77", adminEmail: "volkov@craftcocktails.ru", imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center" },
  { id: "r7", name: "Whiskey Corner", address: "Москва, ул. Петровка, 25", phone: "+7 495 777-88-99", inn: "7704444444", adminFullName: "Новикова Мария Александровна", adminPhone: "+7 907 666-77-88", adminEmail: "novikova@whiskeycorner.ru", imageUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=400&fit=crop&crop=center" },
  { id: "r8", name: "Gin Palace", address: "Москва, ул. Большая Дмитровка, 8", phone: "+7 495 888-99-00", inn: "7705555555", adminFullName: "Соколов Денис Игоревич", adminPhone: "+7 908 777-88-99", adminEmail: "sokolov@ginpalace.ru", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=400&fit=crop&crop=center" },
  { id: "r9", name: "Rum Bar Tropical", address: "Москва, ул. Тверской бульвар, 12", phone: "+7 495 999-00-11", inn: "7706666666", adminFullName: "Лебедева Ольга Владимировна", adminPhone: "+7 909 888-99-00", adminEmail: "lebedeva@rumbar.ru", imageUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=400&fit=crop&crop=center" },
  { id: "r10", name: "Vodka Museum", address: "Москва, ул. Красная площадь, 1", phone: "+7 495 000-11-22", inn: "7707777777", adminFullName: "Федоров Сергей Николаевич", adminPhone: "+7 910 999-00-11", adminEmail: "fedorov@vodkamuseum.ru", imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&crop=center" },
];

export const waiters: Waiter[] = [
  // Ресторан r1 - Gastropub 12
  { id: "w1", name: "Анна Смирнова", restaurantId: "r1" },
  { id: "w2", name: "Дмитрий Козлов", restaurantId: "r1" },
  { id: "w3", name: "Елена Волкова", restaurantId: "r1" },
  
  // Ресторан r2 - Bar&Kitchen
  { id: "w4", name: "Михаил Петров", restaurantId: "r2" },
  { id: "w5", name: "Ольга Сидорова", restaurantId: "r2" },
  { id: "w6", name: "Алексей Морозов", restaurantId: "r2" },
  
  // Ресторан r3 - Sky Lounge
  { id: "w7", name: "Татьяна Лебедева", restaurantId: "r3" },
  { id: "w8", name: "Сергей Новиков", restaurantId: "r3" },
  { id: "w9", name: "Мария Федорова", restaurantId: "r3" },
  
  // Ресторан r4 - Brewery House
  { id: "w10", name: "Игорь Соколов", restaurantId: "r4" },
  { id: "w11", name: "Наталья Попова", restaurantId: "r4" },
  { id: "w12", name: "Владимир Кузнецов", restaurantId: "r4" },
  
  // Ресторан r5 - Wine Bar Elegance
  { id: "w13", name: "Светлана Орлова", restaurantId: "r5" },
  { id: "w14", name: "Андрей Медведев", restaurantId: "r5" },
  { id: "w15", name: "Екатерина Жукова", restaurantId: "r5" },
  
  // Ресторан r6 - Craft Cocktails
  { id: "w16", name: "Павел Степанов", restaurantId: "r6" },
  { id: "w17", name: "Юлия Николаева", restaurantId: "r6" },
  { id: "w18", name: "Роман Васильев", restaurantId: "r6" },
  
  // Ресторан r7 - Whiskey Corner
  { id: "w19", name: "Анастасия Григорьева", restaurantId: "r7" },
  { id: "w20", name: "Артем Романов", restaurantId: "r7" },
  { id: "w21", name: "Дарья Козлова", restaurantId: "r7" },
  
  // Ресторан r8 - Gin Palace
  { id: "w22", name: "Максим Филиппов", restaurantId: "r8" },
  { id: "w23", name: "Валентина Семенова", restaurantId: "r8" },
  { id: "w24", name: "Николай Алексеев", restaurantId: "r8" },
  
  // Ресторан r9 - Rum Bar Tropical
  { id: "w25", name: "Людмила Борисова", restaurantId: "r9" },
  { id: "w26", name: "Владимир Соколов", restaurantId: "r9" },
  { id: "w27", name: "Галина Захарова", restaurantId: "r9" },
  
  // Ресторан r10 - Vodka Museum
  { id: "w28", name: "Виктор Соловьев", restaurantId: "r10" },
  { id: "w29", name: "Тамара Виноградова", restaurantId: "r10" },
  { id: "w30", name: "Борис Карпов", restaurantId: "r10" },
];

export const products: Product[] = [
  { 
    id: "p1", 
    name: "Виски 12 лет",
    imageUrl: "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p2", 
    name: "Джин Премиум",
    imageUrl: "https://images.unsplash.com/photo-1453824979084-c8fd42932378?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p3", 
    name: "Вермут Классик",
    imageUrl: "https://images.unsplash.com/photo-1564957468535-e8e51b0d2f56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p4", 
    name: "Ром Карибский",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p5", 
    name: "Текила Премиум",
    imageUrl: "https://images.unsplash.com/photo-1608635360956-5ebde7952ed6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p6", 
    name: "Коньяк VSOP",
    imageUrl: "https://plus.unsplash.com/premium_photo-1682125792755-40f2c999e884?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p7", 
    name: "Водка Премиум",
    imageUrl: "https://images.unsplash.com/photo-1677159943266-7090e47db05e?q=80&w=1186&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p8", 
    name: "Ликер Амаретто",
    imageUrl: "https://alcomag.ua/upload/medialibrary/f83/f83392a24471b1c6fff36952b5c9c136.jpg"
  },
  { 
    id: "p9", 
    name: "Шампанское Брют",
    imageUrl: "https://images.unsplash.com/photo-1580657274234-7339717f4541?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    id: "p10", 
    name: "Пиво Крафтовое",
    imageUrl: "https://images.unsplash.com/photo-1532635135-630750614081?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

// Статические данные акций с реалистичными датами (относительно 2025-09-09)
export const promotions: Promotion[] = [
  // Активные акции (3 штуки, начались в разные дни, длятся месяц)
  {
    id: "pr1",
    name: "Осенняя дегустация",
    status: "active",
    startsAt: "2025-08-30T00:00:00.000Z", // началась 10 дней назад (30 августа)
    endsAt: "2025-09-30T00:00:00.000Z", // закончится через 20 дней (30 сентября)
    bannerUrl: "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29ja3RhaWx8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000",
    restaurants: ["r1", "r2", "r3", "r4", "r5"], // 5 ресторанов
    motivations: [
      { productId: "p1", type: "fixed", value: 180 }, // Виски 12 лет - 180 руб
      { productId: "p2", type: "fixed", value: 150 }, // Джин Премиум - 150 руб
      { productId: "p3", type: "fixed", value: 120 }, // Вермут Классик - 120 руб
    ],
    salesCount: 1136, // автоматический расчет на основе реальных продаж
    motivationPaid: rub(0), // Выплат по активным акциям не было
    motivationToPay: rub(171740), // автоматический расчет на основе реальных продаж
    waitersCount: 15, // автоматический расчет на основе реальных продаж
    description: "🍂 Осенняя дегустация премиальных напитков! Погрузитесь в мир изысканных вкусов и ароматов осени. Откройте для себя новые грани любимых напитков в уютной атмосфере наших ресторанов.",
    goal: "Увеличить продажи премиальных алкогольных напитков на 25% и привлечь новых клиентов",
    conditions: "🎁 Купите 2 напитка из акции — получите третий в подарок! Акция действует на все позиции: Виски 12 лет, Джин Премиум и Вермут Классик.",
    products: [
      {
        productId: "p1",
        name: "Виски 12 лет",
        description: "Премиальный шотландский виски с выдержкой 12 лет, насыщенный аромат дуба и ванили",
        imageUrl: "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(180), // 180 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      },
      {
        productId: "p2",
        name: "Джин Премиум",
        description: "Лондонский джин премиум-класса с ботаническими нотами можжевельника и цитрусов",
        imageUrl: "https://images.unsplash.com/photo-1453824979084-c8fd42932378?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(150), // 150 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      },
      {
        productId: "p3",
        name: "Вермут Классик",
        description: "Итальянский вермут с травяными экстрактами и легкой горчинкой",
        imageUrl: "https://images.unsplash.com/photo-1564957468535-e8e51b0d2f56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(120), // 120 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      }
    ]
  },
  {
    id: "pr2",
    name: "Виски-марафон",
    status: "active",
    startsAt: "2025-09-04T00:00:00.000Z", // началась 5 дней назад (4 сентября)
    endsAt: "2025-10-04T00:00:00.000Z", // закончится через 25 дней (4 октября)
    bannerUrl: "https://images.unsplash.com/photo-1529264978834-666a0e99f884?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r6", "r7", "r8"], // 3 ресторана
    motivations: [
      { productId: "p1", type: "fixed", value: 200 }, // Виски 12 лет - 200 руб
      { productId: "p6", type: "fixed", value: 180 }, // Коньяк VSOP - 180 руб
    ],
    salesCount: 252, // автоматический расчет на основе реальных продаж
    motivationPaid: rub(0), // Выплат по активным акциям не было
    motivationToPay: rub(47520), // автоматический расчет на основе реальных продаж
    waitersCount: 9, // автоматический расчет на основе реальных продаж
    description: "🥃 Виски-марафон — гонка за лучшими вкусами! Присоединяйтесь к эксклюзивному марафону по дегустации премиальных виски и коньяков. Каждый глоток — это путешествие в мир изысканных ароматов и неповторимых вкусов.",
    goal: "Достичь рекордных продаж виски и коньяка в премиальном сегменте",
    conditions: "💰 Скидка 20% на все виски и коньяки из акции! Специальные цены на Виски 12 лет и Коньяк VSOP. Акция действует на полные бутылки и коктейли с участием этих напитков.",
    products: [
      {
        productId: "p1",
        name: "Виски 12 лет",
        description: "Премиальный шотландский виски с выдержкой 12 лет, насыщенный аромат дуба и ванили",
        imageUrl: "https://images.unsplash.com/photo-1571104508999-893933ded431?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(200), // 200 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      },
      {
        productId: "p6",
        name: "Коньяк VSOP",
        description: "Французский коньяк VSOP с выдержкой 4 года, элегантный вкус с нотами ванили и дуба",
        imageUrl: "https://plus.unsplash.com/premium_photo-1682125792755-40f2c999e884?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(180), // 180 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      }
    ]
  },
  {
    id: "pr3",
    name: "Коктейльная революция",
    status: "active",
    startsAt: "2025-08-20T00:00:00.000Z", // началась 20 дней назад (20 августа)
    endsAt: "2025-09-20T00:00:00.000Z", // закончится через 10 дней (20 сентября)
    bannerUrl: "https://images.unsplash.com/photo-1712247453603-1218368e38f6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r9", "r10"], // 2 ресторана
    motivations: [
      { productId: "p4", type: "fixed", value: 160 }, // Ром Карибский - 160 руб
      { productId: "p5", type: "fixed", value: 130 }, // Текила Премиум - 130 руб
    ],
    salesCount: 576, // автоматический расчет на основе реальных продаж
    motivationPaid: rub(0), // Выплат по активным акциям не было
    motivationToPay: rub(84150), // автоматический расчет на основе реальных продаж
    waitersCount: 6, // автоматический расчет на основе реальных продаж
    description: "🍹 Коктейльная революция начинается! Окунитесь в мир экзотических вкусов и ароматов. Наши бармены создают уникальные коктейли с карибским ромом и мексиканской текилой, которые перевернут ваше представление о коктейльной культуре.",
    goal: "Популяризировать коктейльную культуру и увеличить продажи экзотических спиртных напитков",
    conditions: "🎉 Закажите 3 коктейля — заплатите только за 2! Акция действует на все коктейли с Ромом Карибским и Текилой Премиум. Каждый коктейль — это маленькое путешествие в тропики!",
    products: [
      {
        productId: "p4",
        name: "Ром Карибский",
        description: "Традиционный карибский ром с нотами тростникового сахара и специй",
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(160), // 160 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      },
      {
        productId: "p5",
        name: "Текила Премиум",
        description: "Мексиканская текила премиум-класса из голубой агавы с чистым вкусом",
        imageUrl: "https://images.unsplash.com/photo-1608635360956-5ebde7952ed6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(130), // 130 руб
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      }
    ]
  },
  {
    id: "pr4",
    name: "Летний коктейль-бар",
    status: "finished",
    startsAt: "2025-07-01T00:00:00.000Z", // началась 70 дней назад (1 июля)
    endsAt: "2025-07-31T00:00:00.000Z", // закончилась 40 дней назад (31 июля)
    bannerUrl: "https://images.unsplash.com/photo-1654722658395-b97e84a46152?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r1", "r2", "r3"], // 3 ресторана
    motivations: [
      { productId: "p2", type: "fixed", value: 140 }, // Джин Премиум - 140 руб
      { productId: "p4", type: "fixed", value: 150 }, // Ром Карибский - 150 руб
    ],
    salesCount: 2156, // завершенные продажи (3 ресторана × 3 официанта × ~240 продаж на официанта)
    motivationPaid: rub(63000), // выплачено
    motivationToPay: rub(0), // к выплате 0 (завершена)
    waitersCount: 9, // 3 ресторана * 3 официанта
    description: "🌞 Летний коктейль-бар — освежающие напитки для жарких дней!",
    goal: "Увеличить продажи коктейлей в летний сезон",
    conditions: "🍹 Скидка 15% на все коктейли с джином и ромом",
    products: [
      {
        productId: "p2",
        name: "Джин Премиум",
        description: "Лондонский джин премиум-класса с ботаническими нотами можжевельника и цитрусов",
        imageUrl: "https://images.unsplash.com/photo-1453824979084-c8fd42932378?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(140),
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      },
      {
        productId: "p4",
        name: "Ром Карибский",
        description: "Темный ром с Карибских островов с нотами ванили и корицы",
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        motivationPerSale: rub(150),
        waiterShare: 60,
        adminShare: 10,
        guestmeShare: 30
      }
    ]
  },
  
  // Запланированные акции (2 штуки)
  {
    id: "pr5",
    name: "Новогодний фестиваль",
    status: "scheduled",
    startsAt: "2025-09-19T00:00:00.000Z", // начнется через 10 дней (19 сентября)
    endsAt: "2025-10-19T00:00:00.000Z", // закончится через 40 дней (19 октября)
    bannerUrl: "https://plus.unsplash.com/premium_photo-1698007654461-687358034ec0?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r1", "r3", "r5", "r7", "r9"], // 5 ресторанов
    motivations: [
      { productId: "p1", type: "fixed", value: 200 }, // Виски 12 лет - 200 руб
      { productId: "p6", type: "fixed", value: 180 }, // Коньяк VSOP - 180 руб
      { productId: "p9", type: "fixed", value: 220 }, // Шампанское Брют - 220 руб
      { productId: "p10", type: "fixed", value: 150 }, // Пиво Крафтовое - 150 руб
    ],
    salesCount: 0,
    motivationPaid: rub(0),
    motivationToPay: rub(0),
    waitersCount: 15, // 5 ресторанов * 3 официанта
  },
  {
    id: "pr6",
    name: "Зимние вечера",
    status: "scheduled",
    startsAt: "2025-09-29T00:00:00.000Z", // начнется через 20 дней (29 сентября)
    endsAt: "2025-10-29T00:00:00.000Z", // закончится через 50 дней (29 октября)
    bannerUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center",
    restaurants: ["r2", "r4", "r6", "r8", "r10"], // 5 ресторанов
    motivations: [
      { productId: "p9", type: "fixed", value: 180 }, // Шампанское Брют - 180 руб
      { productId: "p10", type: "fixed", value: 120 }, // Пиво Крафтовое - 120 руб
    ],
    salesCount: 0,
    motivationPaid: rub(0),
    motivationToPay: rub(0),
    waitersCount: 15, // 5 ресторанов * 3 официанта
  },
  
  // Завершенные акции (5 штук)
  {
    id: "pr6",
    name: "Летний фестиваль",
    status: "finished",
    startsAt: "2025-06-01T00:00:00.000Z", // 1 июня 2025
    endsAt: "2025-07-01T00:00:00.000Z", // 1 июля 2025 (месяц длительности)
    bannerUrl: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?q=80&w=1234&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r1", "r2", "r3"], // 3 ресторана
    motivations: [
      { productId: "p1", type: "fixed", value: 160 }, // Виски 12 лет - 160 руб
      { productId: "p2", type: "fixed", value: 140 }, // Джин Премиум - 140 руб
      { productId: "p3", type: "fixed", value: 130 }, // Вермут Классик - 130 руб
    ],
    salesCount: 2847, // завершенные продажи (3 ресторана × 3 официанта × ~316 продаж на официанта)
    motivationPaid: rub(320000),
    motivationToPay: rub(0), // все выплачено
    waitersCount: 9, // 3 ресторана * 3 официанта
  },
  {
    id: "pr7",
    name: "Весенняя коллекция",
    status: "finished",
    startsAt: "2025-04-15T00:00:00.000Z", // 15 апреля 2025
    endsAt: "2025-05-15T00:00:00.000Z", // 15 мая 2025 (месяц длительности)
    bannerUrl: "https://images.unsplash.com/photo-1742973893204-29f180963a17?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r4", "r5", "r6", "r7"], // 4 ресторана
    motivations: [
      { productId: "p4", type: "fixed", value: 150 }, // Ром Карибский - 150 руб
      { productId: "p5", type: "fixed", value: 130 }, // Текила Премиум - 130 руб
      { productId: "p6", type: "fixed", value: 170 }, // Коньяк VSOP - 170 руб
    ],
    salesCount: 4123, // завершенные продажи (4 ресторана × 3 официанта × ~344 продаж на официанта)
    motivationPaid: rub(275000),
    motivationToPay: rub(0), // все выплачено
    waitersCount: 12, // 4 ресторана * 3 официанта
  },
  {
    id: "pr8",
    name: "Зимние вечера",
    status: "finished",
    startsAt: "2025-01-10T00:00:00.000Z", // 10 января 2025
    endsAt: "2025-02-10T00:00:00.000Z", // 10 февраля 2025 (месяц длительности)
    bannerUrl: "https://plus.unsplash.com/premium_photo-1695945389334-cc106a56e9b4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r8", "r9", "r10"], // 3 ресторана
    motivations: [
      { productId: "p7", type: "fixed", value: 180 }, // Водка Премиум - 180 руб
      { productId: "p8", type: "fixed", value: 160 }, // Ликер Амаретто - 160 руб
      { productId: "p9", type: "fixed", value: 190 }, // Шампанское Брют - 190 руб
    ],
    salesCount: 1956, // завершенные продажи (3 ресторана × 3 официанта × ~217 продаж на официанта)
    motivationPaid: rub(214000),
    motivationToPay: rub(0), // все выплачено
    waitersCount: 9, // 3 ресторана * 3 официанта
  },
  {
    id: "pr9",
    name: "Новогодний марафон",
    status: "finished",
    startsAt: "2024-12-01T00:00:00.000Z", // 1 декабря 2024
    endsAt: "2025-01-01T00:00:00.000Z", // 1 января 2025 (месяц длительности)
    bannerUrl: "https://plus.unsplash.com/premium_photo-1697015611955-7c9f281f1564?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r1", "r3", "r5", "r7", "r9"], // 5 ресторанов
    motivations: [
      { productId: "p1", type: "fixed", value: 200 }, // Виски 12 лет - 200 руб
      { productId: "p6", type: "fixed", value: 180 }, // Коньяк VSOP - 180 руб
      { productId: "p9", type: "fixed", value: 220 }, // Шампанское Брют - 220 руб
      { productId: "p10", type: "fixed", value: 150 }, // Пиво Крафтовое - 150 руб
    ],
    salesCount: 5287, // завершенные продажи (5 ресторанов × 3 официанта × ~352 продаж на официанта, новогодний период)
    motivationPaid: rub(487000),
    motivationToPay: rub(0), // все выплачено
    waitersCount: 15, // 5 ресторанов * 3 официанта
  },
  {
    id: "pr10",
    name: "Осенний урожай",
    status: "finished",
    startsAt: "2024-09-01T00:00:00.000Z", // 1 сентября 2024
    endsAt: "2024-10-01T00:00:00.000Z", // 1 октября 2024 (месяц длительности)
    bannerUrl: "https://images.unsplash.com/photo-1759145858937-0f730a20265f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    restaurants: ["r2", "r4", "r6", "r8", "r10"], // 5 ресторанов
    motivations: [
      { productId: "p2", type: "fixed", value: 150 }, // Джин Премиум - 150 руб
      { productId: "p3", type: "fixed", value: 140 }, // Вермут Классик - 140 руб
      { productId: "p4", type: "fixed", value: 160 }, // Ром Карибский - 160 руб
      { productId: "p5", type: "fixed", value: 130 }, // Текила Премиум - 130 руб
    ],
    salesCount: 4632, // завершенные продажи (5 ресторанов × 3 официанта × ~309 продаж на официанта)
    motivationPaid: rub(298000),
    motivationToPay: rub(0), // все выплачено
    waitersCount: 15, // 5 ресторанов * 3 официанта
  },
];

export const liveSales: SaleEvent[] = allLiveSales;

// Функция для подсчета уникальных официантов из реальных данных продаж
function calculateUniqueWaitersCount(): number {
  const activePromotionIds = promotions.filter((p) => p.status === "active").map((p) => p.id);
  const uniqueWaiters = new Set(
    allLiveSales
      .filter((sale) => activePromotionIds.includes(sale.promotionId))
      .map((sale) => sale.waiterId)
  );
  return uniqueWaiters.size;
}

// Правильная структура официантов по ресторанам (один официант = один ресторан)
// Уменьшено в 2 раза для реалистичности
const waiterToRestaurant: Record<string, string> = {
  // pr1: r1-r5 (13 официантов)
  'w1': 'r1', 'w2': 'r1', 'w3': 'r1',
  'w4': 'r2', 'w5': 'r2', 'w6': 'r2',
  'w7': 'r3', 'w8': 'r3', 'w9': 'r3',
  'w10': 'r4', 'w11': 'r4', 'w12': 'r4',
  'w13': 'r5',
  // pr2: r6-r8 (12 официантов)
  'w14': 'r6', 'w15': 'r6', 'w16': 'r6', 'w17': 'r6',
  'w18': 'r7', 'w19': 'r7', 'w20': 'r7', 'w21': 'r7',
  'w22': 'r8', 'w23': 'r8', 'w24': 'r8', 'w25': 'r8',
  // pr3: r9-r10 (9 официантов)
  'w26': 'r9', 'w27': 'r9', 'w28': 'r9', 'w29': 'r9',
  'w30': 'r10', 'w31': 'r10', 'w32': 'r10', 'w33': 'r10', 'w34': 'r10'
};

// Функция для подсчета уникальных ресторанов из реальных данных продаж
function calculateUniqueRestaurantsCount(): number {
  const activePromotionIds = promotions.filter((p) => p.status === "active").map((p) => p.id);
  const uniqueRestaurants = new Set(
    allLiveSales
      .filter((sale) => activePromotionIds.includes(sale.promotionId))
      .map((sale) => sale.restaurantId)
  );
  return uniqueRestaurants.size;
}

export const summary: DashboardSummary = {
  activePromotions: promotions.filter((p) => p.status === "active").length,
  scheduledPromotions: promotions.filter((p) => p.status === "scheduled").length,
  finishedPromotions: promotions.filter((p) => p.status === "finished").length,
  totalSalesCount: 1964, // автоматический расчет на основе реальных продаж
  motivationPaid: rub(0), // Выплат по активным акциям не было
  motivationToPay: rub(303410), // автоматический расчет на основе реальных продаж
  restaurantsInPromotions: 10, // автоматический расчет на основе реальных продаж
  waitersInPromotions: 30, // автоматический расчет на основе реальных продаж
  salesGrowth: 4.2, // прирост продаж за день (в процентах)
  restaurantsGrowth: 0, // убрана динамика по ресторанам
  waitersGrowth: 0, // убрана динамика по официантам
};

// ---------- Static data for charts ----------

export type TimePoint = { x: number; y: number };
export type PieSlice = { label: string; value: number; color: string };
export type BarItem = { label: string; value: number };

// Статические данные для графиков - динамика продаж за последние 7 дней
const STATIC_TIME_SERIES: TimePoint[] = [
  // Последние 7 дней (неделя) - фиксированные timestamp'ы
  { x: 1757030400000, y: 82 }, // 2025-09-03
  { x: 1757116800000, y: 79 }, // 2025-09-04
  { x: 1757203200000, y: 85 }, // 2025-09-05
  { x: 1757289600000, y: 88 }, // 2025-09-06
  { x: 1757376000000, y: 84 }, // 2025-09-07
  { x: 1757462400000, y: 91 }, // 2025-09-08
  { x: 1757548800000, y: 87 }, // 2025-09-09
];

// Статические данные для pie chart (соответствуют активным акциям)
const STATIC_PIE_DATA: PieSlice[] = [
  { label: "Осенняя дегустация", value: 420, color: "#0ea5e9" },
  { label: "Виски-марафон", value: 380, color: "#10b981" },
  { label: "Коктейльная революция", value: 350, color: "#f59e0b" }
];

// Статические данные для bar chart (топ акции)
const STATIC_BAR_DATA: BarItem[] = [
  { label: "Осенняя дегустация", value: 420 },
  { label: "Виски-марафон", value: 380 },
  { label: "Коктейльная революция", value: 350 }
];

// Экспортируем статические данные напрямую
export const salesTimeSeries = STATIC_TIME_SERIES;
export const salesByPromotion = STATIC_PIE_DATA;
export const topPromotions = STATIC_BAR_DATA;
