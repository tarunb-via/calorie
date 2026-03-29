export default function EntryForm({ entryForm, setEntryForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="rounded-[28px] bg-white/90 p-5 shadow-sm md:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight text-ink-600">Daily target</h2>
        <p className="mt-1 text-base text-slate-500">Choose the day you want to track and set your calorie goal.</p>
      </div>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-600">
          Date
          <input type="date" value={entryForm.date} onChange={(e) => setEntryForm((current) => ({ ...current, date: e.target.value }))} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" />
        </label>
        <label className="block text-sm font-medium text-slate-600">
          Calorie goal
          <input type="number" min="1200" step="50" value={entryForm.goal} onChange={(e) => setEntryForm((current) => ({ ...current, goal: e.target.value }))} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" />
        </label>
        <label className="block text-sm font-medium text-slate-600">
          Water glasses
          <input type="number" min="0" max="20" value={entryForm.waterGlasses} onChange={(e) => setEntryForm((current) => ({ ...current, waterGlasses: e.target.value }))} className="mt-2 min-h-[44px] w-full rounded-2xl border-0 bg-brand-50 px-4 text-base outline-none ring-1 ring-brand-100 focus:ring-2 focus:ring-brand-500" />
        </label>
        <button type="submit" className="min-h-[44px] w-full rounded-2xl bg-brand-600 px-6 py-3 text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98]">Save daily target</button>
      </div>
    </form>
  );
}
