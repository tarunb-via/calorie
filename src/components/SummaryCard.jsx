import clsx from 'clsx';

const tones = {
  brand: 'bg-white text-ink-600',
  accent: 'bg-accent-100/70 text-ink-600',
};

export default function SummaryCard({ icon: Icon, label, value, helper, tone }) {
  return (
    <div className={clsx('rounded-[24px] p-5 shadow-sm', tones[tone])}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{helper}</p>
        </div>
        <div className="rounded-2xl bg-brand-100 p-3 text-brand-700">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
