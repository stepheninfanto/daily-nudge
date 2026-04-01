import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useReflectionHistory } from "../hooks";

export function ReflectionHistory() {
  const { history, getFormattedDate } = useReflectionHistory();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (date) => {
    setExpandedId(prev => prev === date ? null : date);
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 dark:text-night-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
          No reflections yet
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs">
          Complete your daily reflection to start building your history.
        </p>
      </div>
    );
  }

  const fields = [
    { key: 'accomplished', label: 'Accomplished' },
    { key: 'grateful', label: 'Grateful for' },
    { key: 'wastedFocus', label: 'Drained my focus' },
    { key: 'improvement', label: 'Will do better' }
  ];

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 py-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Reflections
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {history.length} reflection{history.length !== 1 ? "s" : ""}
        </p>
      </header>

      <main className="flex-1 px-4 pb-8">
        <div className="space-y-3">
          {history.map((entry) => {
            const isExpanded = expandedId === entry.date;
            
            return (
              <div
                key={entry.date}
                className="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleExpand(entry.date)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {getFormattedDate(entry.date)}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-100 dark:border-night-700 pt-4">
                    {fields.map((field) => (
                      <div key={field.key}>
                        <p className="text-xs font-medium text-accent-light dark:text-accent-dark uppercase tracking-wide mb-1">
                          {field.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {entry[field.key] || '—'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}