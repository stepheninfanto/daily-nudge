import { Flame } from 'lucide-react';

export function StreakBadge({ streak, showAlways = false }) {
  if (!showAlways && streak === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-light/10 dark:bg-accent-dark/10">
      <Flame className="w-4 h-4 text-accent-light dark:text-accent-dark" />
      <span className="text-sm font-semibold text-accent-light dark:text-accent-dark">
        {streak}
      </span>
    </div>
  );
}
