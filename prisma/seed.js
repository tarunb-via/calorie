import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const days = [
  {
    date: new Date('2026-03-18T00:00:00.000Z'),
    goal: 2100,
    waterGlasses: 6,
    meals: [
      { name: 'Greek Yogurt Berry Bowl', calories: 320, protein: 24, carbs: 38, fat: 8, consumedAt: new Date('2026-03-18T08:00:00.000Z'), category: 'Breakfast', notes: 'Chia seeds and honey drizzle' },
      { name: 'Chicken Burrito Bowl', calories: 640, protein: 42, carbs: 58, fat: 24, consumedAt: new Date('2026-03-18T13:00:00.000Z'), category: 'Lunch', notes: 'Extra fajita veggies' },
      { name: 'Almond Butter Banana Toast', calories: 280, protein: 9, carbs: 31, fat: 14, consumedAt: new Date('2026-03-18T16:30:00.000Z'), category: 'Snack', notes: 'Post-workout snack' },
      { name: 'Salmon with Herbed Rice', calories: 710, protein: 46, carbs: 52, fat: 30, consumedAt: new Date('2026-03-18T19:30:00.000Z'), category: 'Dinner', notes: 'Roasted asparagus on the side' }
    ]
  },
  {
    date: new Date('2026-03-17T00:00:00.000Z'),
    goal: 2100,
    waterGlasses: 8,
    meals: [
      { name: 'Spinach Feta Omelet', calories: 410, protein: 29, carbs: 12, fat: 26, consumedAt: new Date('2026-03-17T07:45:00.000Z'), category: 'Breakfast', notes: 'Whole grain toast' },
      { name: 'Turkey Pesto Wrap', calories: 560, protein: 35, carbs: 44, fat: 26, consumedAt: new Date('2026-03-17T12:15:00.000Z'), category: 'Lunch', notes: 'Side of grapes' },
      { name: 'Trail Mix', calories: 230, protein: 7, carbs: 18, fat: 15, consumedAt: new Date('2026-03-17T15:30:00.000Z'), category: 'Snack', notes: 'Handful before meetings' },
      { name: 'Turkey Chili', calories: 690, protein: 48, carbs: 54, fat: 22, consumedAt: new Date('2026-03-17T19:00:00.000Z'), category: 'Dinner', notes: 'Topped with avocado' }
    ]
  }
];

async function main() {
  for (const day of days) {
    await prisma.dailyEntry.upsert({
      where: { date: day.date },
      update: {
        goal: day.goal,
        waterGlasses: day.waterGlasses,
        meals: {
          deleteMany: {},
          create: day.meals,
        },
      },
      create: {
        date: day.date,
        goal: day.goal,
        waterGlasses: day.waterGlasses,
        meals: {
          create: day.meals,
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
