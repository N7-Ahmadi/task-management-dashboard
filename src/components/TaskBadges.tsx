import type { Priority } from '../types/task';

export const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const colors = {
    low: 'bg-slate-100 text-slate-700 border-slate-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-md font-medium border capitalize ${colors[priority]}`}>
      {priority} priority
    </span>
  );
};

export const CategoryBadge = ({ category }: { category: string }) => (
  <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
    {category}
  </span>
);