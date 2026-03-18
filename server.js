import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const startOfDay = (value) => {
  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/entries', async (req, res) => {
  try {
    const entries = await prisma.dailyEntry.findMany({
      include: { meals: { orderBy: { consumedAt: 'asc' } } },
      orderBy: { date: 'desc' },
    });

    const payload = entries.map((entry) => ({
      ...entry,
      totalCalories: entry.meals.reduce((sum, meal) => sum + meal.calories, 0),
      totalProtein: entry.meals.reduce((sum, meal) => sum + meal.protein, 0),
      totalCarbs: entry.meals.reduce((sum, meal) => sum + meal.carbs, 0),
      totalFat: entry.meals.reduce((sum, meal) => sum + meal.fat, 0),
    }));

    res.json(payload);
  } catch (error) {
    console.error('Failed to fetch entries', error);
    res.status(500).json({ error: 'Unable to fetch entries' });
  }
});

app.post('/api/entries', async (req, res) => {
  try {
    const { date, goal, waterGlasses = 0 } = req.body;
    const normalizedDate = startOfDay(date);

    const entry = await prisma.dailyEntry.upsert({
      where: { date: normalizedDate },
      update: { goal: Number(goal), waterGlasses: Number(waterGlasses) },
      create: { date: normalizedDate, goal: Number(goal), waterGlasses: Number(waterGlasses) },
      include: { meals: true },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error('Failed to save entry', error);
    res.status(500).json({ error: 'Unable to save entry' });
  }
});

app.post('/api/meals', async (req, res) => {
  try {
    const { date, name, calories, protein, carbs, fat, consumedAt, category, notes } = req.body;
    const normalizedDate = startOfDay(date);

    const entry = await prisma.dailyEntry.upsert({
      where: { date: normalizedDate },
      update: {},
      create: { date: normalizedDate, goal: 2000 },
    });

    const meal = await prisma.meal.create({
      data: {
        name,
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        consumedAt: new Date(consumedAt),
        category,
        notes,
        dailyEntryId: entry.id,
      },
    });

    res.status(201).json(meal);
  } catch (error) {
    console.error('Failed to create meal', error);
    res.status(500).json({ error: 'Unable to create meal' });
  }
});

app.listen(process.env.PORT || 3001, () => {
  console.log('Server listening');
});
