import { useState, useEffect, useCallback } from "react";
import {
  QuoteCard,
  StreakBadge,
  ThemeToggle,
  DailyReflection,
} from "../components";
import { useFavorites, useStreak, useReflection, useTheme } from "../hooks";
import { getRandomQuote } from "../data/quotes";

export function Home() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [viewedIds, setViewedIds] = useState([]);

  const { isFavorite, toggleFavorite } = useFavorites();
  const {
    streak,
    hasCompletedToday,
    justReset,
    resetMessage,
    incrementStreak,
    clearResetMessage,
  } = useStreak();
  const {
    reflection,
    showReflection,
    updateReflection,
    saveReflection,
    skipReflection,
    triggerReflection,
  } = useReflection();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (!currentQuote) {
      const quote = getRandomQuote();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentQuote(quote);
    }
  }, [currentQuote]);

  useEffect(() => {
    if (!hasCompletedToday) {
      incrementStreak();
    }
  }, [hasCompletedToday, incrementStreak]);

  const handleNewQuote = useCallback(() => {
    const quote = getRandomQuote(viewedIds);
    setCurrentQuote(quote);
    setViewedIds((prev) => [...prev.slice(-20), quote.id]);
  }, [viewedIds]);

  const handleShare = useCallback(async (quote) => {
    const shareText = `"${quote.text}"\n— ${quote.source}\n\nSent via Nudge 💭`;

    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      // Clipboard API not available
    }
  }, []);

  const handleSaveReflection = useCallback(() => {
    saveReflection();
  }, [saveReflection]);

  const handleReflectionClosed = useCallback(() => {
    if (justReset) {
      clearResetMessage();
    }
  }, [justReset, clearResetMessage]);

  if (!currentQuote) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-3 border-accent-light dark:border-accent-dark border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <StreakBadge streak={streak} showAlways />
        </div>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </header>

      <QuoteCard
        quote={currentQuote}
        isFavorite={isFavorite(currentQuote.id)}
        onToggleFavorite={toggleFavorite}
        onNewQuote={handleNewQuote}
        onShare={handleShare}
        onStartReflection={triggerReflection}
      />

      <footer className="pb-32 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500 px-4">
          Take a moment. Then get back to what matters.
        </p>
      </footer>

      <DailyReflection
        isOpen={showReflection}
        reflection={reflection}
        onUpdate={updateReflection}
        onSave={handleSaveReflection}
        onSkip={skipReflection}
        streak={streak}
      />

      {justReset && resetMessage && (
        <div className="fixed bottom-24 left-4 right-4 mx-auto max-w-sm p-4 bg-accent-light/10 dark:bg-accent-dark/10 rounded-xl text-center animate-fade-in">
          <p className="text-sm text-accent-light dark:text-accent-dark">
            {resetMessage}
          </p>
          <button
            onClick={handleReflectionClosed}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
