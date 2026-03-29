import { Plus } from 'lucide-react';

export default function MealForm({ mealForm, setMealForm, onSubmit }) {
  const updateField = (field, value) => setMealForm((current) => ({ ...current, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white/90 p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-ink-600">Log a meal</h2>
          <p className="mt-1 text-base text-slate-500">Capture calories and macros right after you eat.</p>
        </div>
        <div className="rounded-2xl bg-accent-100 p-3 text-accent-600"><Plus className="h-5 w-5" /></div>
      </div>
      <div className="grid gap-4">
        <label className="block text-sm font-medium text-slate-600">
          Date
          <input type="date" value={mealForm.date} onChange={(e) => updateField('date', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" />
        </label>
        <label className="block text-sm font-medium text-slate-600">
          Meal name
          <input type="text" value={mealForm.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Grilled chicken salad" className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" required />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-600">
            Category
            <select value={mealForm.category} onChange={(e) => updateField('category', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500">
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Time eaten
            <input type="time" value={mealForm.consumedAt} onChange={(e) => updateField('consumedAt', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-600">
            Calories
            <input type="number" min="0" value={mealForm.calories} onChange={(e) => updateField('calories', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" required />
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Protein (g)
            <input type="number" min="0" value={mealForm.protein} onChange={(e) => updateField('protein', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" required />
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Carbs (g)
            <input type="number" min="0" value={mealForm.carbs} onChange={(e) => updateField('carbs', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" required />
          </label>
          <label className="block text-sm font-medium text-slate-600">
            Fat (g)
            <input type="number" min="0" value={mealForm.fat} onChange={(e) => updateField('fat', e.target.value)} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" required />
          </label>
        </div>
        <label className="block text-sm font-medium text-slate-600">
          Notes
          <textarea value={mealForm.notes} onChange={(e) => updateField('notes', e.target.value)} rows="3" placeholder="How did this meal make you feel?" className="mt-2 w-full rounded-2xl border-0 bg-brand-50 px-4 py-3 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" />
        </label>
        <button type="submit" className="min-h-[44px] w-full rounded-2xl bg-ink-600 px-6 py-3 text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98]">Add meal</button>
      </div>
    </form>
  );
}
