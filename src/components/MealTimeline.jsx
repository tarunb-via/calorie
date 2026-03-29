import { format } from 'date-fns';
import { Clock3, Soup } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MealTimeline({ meals, loading }) {
  if (loading) {
    return <div className="rounded-2xl bg-brand-50 p-6 text-base text-slate-500">Loading your meals...</div>;
  }

  if (!meals.length) {
    return <div className="rounded-2xl bg-brand-50 p-6 text-base text-slate-500">No meals logged for this day yet. Add your first meal to start building momentum.</div>;
  }

  return (
    <div className="space-y-4">
      {meals.map((meal, index) => (
        <motion.div key={meal.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[24px] bg-brand-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-white p-3 text-brand-700 shadow-sm"><Soup className="h-5 w-5" /></div>
              <div>
                <p className="text-lg font-semibold text-ink-600">{meal.name}</p>
                <p className="mt-1 text-sm text-slate-500">{meal.category} · {meal.notes || 'No notes added'}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-lg font-bold text-brand-700">{meal.calories} cal</p>
              <p className="mt-1 text-sm text-slate-500">{meal.protein}P / {meal.carbs}C / {meal.fat}F</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Clock3 className="h-4 w-4" />
            {format(new Date(meal.consumedAt), 'p')}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
