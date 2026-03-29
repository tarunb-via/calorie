import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';

export default function DashboardHero({ dateLabel, calories, goal, remaining }) {
  const progress = Math.min((calories / goal) * 100, 100);

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-600 via-brand-500 to-accent-500 p-6 text-white shadow-lg md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            <Sparkles className="h-4 w-4" /> Calorie Compass
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/75">{dateLabel}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">Stay in tune with every bite.</h1>
            <p className="mt-3 max-w-xl text-base text-white/85 md:text-lg">Track meals, monitor macros, and keep your daily calorie goal within reach with a calm, motivating dashboard.</p>
          </div>
        </div>
        <div className="rounded-[28px] bg-white/15 p-5 backdrop-blur md:min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/20 p-3"><Flame className="h-6 w-6" /></div>
            <div>
              <p className="text-sm text-white/75">Consumed today</p>
              <p className="text-3xl font-bold">{calories} cal</p>
            </div>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-white/80">
            <span>Goal {goal}</span>
            <span>{remaining} remaining</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
