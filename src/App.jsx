import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Flame, GlassWater, Plus, Salad, Target, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import DashboardHero from './components/DashboardHero';
import SummaryCard from './components/SummaryCard';
import MealForm from './components/MealForm';
import EntryForm from './components/EntryForm';
import MealTimeline from './components/MealTimeline';

const emptyMeal = {
  name: '',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
  consumedAt: '12:30',
  category: 'Lunch',
  notes: '',
};

export default function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [entryForm, setEntryForm] = useState({ date: format(new Date(), 'yyyy-MM-dd'), goal: 2100, waterGlasses: 8 });
  const [mealForm, setMealForm] = useState({ ...emptyMeal, date: format(new Date(), 'yyyy-MM-dd') });

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/entries');
      setEntries(response.data);
      setError('');
    } catch (err) {
      setError('We could not load your nutrition log. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const todayEntry = useMemo(() => entries.find((entry) => format(new Date(entry.date), 'yyyy-MM-dd') === entryForm.date), [entries, entryForm.date]);

  const handleEntrySubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/entries', entryForm);
    await fetchEntries();
  };

  const handleMealSubmit = async (event) => {
    event.preventDefault();
    const consumedAt = new Date(`${mealForm.date}T${mealForm.consumedAt}:00`).toISOString();
    await axios.post('/api/meals', { ...mealForm, consumedAt });
    setMealForm({ ...emptyMeal, date: mealForm.date });
    await fetchEntries();
  };

  const summary = todayEntry || { totalCalories: 0, goal: Number(entryForm.goal), totalProtein: 0, totalCarbs: 0, totalFat: 0, waterGlasses: Number(entryForm.waterGlasses), meals: [] };
  const remaining = Math.max(summary.goal - summary.totalCalories, 0);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(47,158,98,0.18),_transparent_45%),linear-gradient(180deg,#eefbf3_0%,#f8fafc_100%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-6 md:py-10">
        <DashboardHero dateLabel={format(new Date(entryForm.date), 'EEEE, MMMM d')} calories={summary.totalCalories} goal={summary.goal} remaining={remaining} />

        {error && <div className="rounded-2xl bg-white/90 p-4 text-base text-red-600 shadow-sm">{error}</div>}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={Flame} label="Calories eaten" value={`${summary.totalCalories}`} helper={`${remaining} left today`} tone="brand" />
          <SummaryCard icon={Target} label="Daily goal" value={`${summary.goal}`} helper="Set a realistic target" tone="accent" />
          <SummaryCard icon={Salad} label="Macros" value={`${summary.totalProtein}P / ${summary.totalCarbs}C / ${summary.totalFat}F`} helper="Protein / carbs / fat grams" tone="brand" />
          <SummaryCard icon={GlassWater} label="Hydration" value={`${summary.waterGlasses} glasses`} helper="Keep sipping through the day" tone="accent" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="rounded-[28px] bg-white/90 p-5 shadow-sm md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-brand-100 p-3 text-brand-700"><TrendingUp className="h-6 w-6" /></div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-ink-600">Today&apos;s rhythm</h2>
                  <p className="text-base text-slate-500">A quick look at how your meals stack up across the day.</p>
                </div>
              </div>
              <MealTimeline meals={summary.meals} loading={loading} />
            </div>
          </motion.div>

          <div className="space-y-6">
            <EntryForm entryForm={entryForm} setEntryForm={setEntryForm} onSubmit={handleEntrySubmit} />
            <MealForm mealForm={mealForm} setMealForm={setMealForm} onSubmit={handleMealSubmit} />
          </div>
        </section>
      </div>
    </main>
  );
}
