import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nudge-streak';

const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

const getYesterdayString = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getDateString(yesterday);
};

const encouragingMessages = [
  "A new beginning awaits. Let's start fresh!",
  "Every day is a new opportunity. Welcome back!",
  "The journey continues. One step at a time.",
  "Welcome back! Your future self is cheering you on.",
  "Another day, another chance to make it count."
];

export function useStreak() {
  const [streakData, setStreakData] = useState({
    count: 0,
    lastCompletionDate: null,
    totalCompletions: 0,
    justReset: false,
    resetMessage: null
  });

  const checkAndReset = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const today = getDateString();
        const yesterday = getYesterdayString();
        
        if (data.lastCompletionDate && data.lastCompletionDate !== today) {
          if (data.lastCompletionDate !== yesterday) {
            data.justReset = true;
            data.resetMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
            data.count = 0;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          }
        }
        
        setStreakData(data);
        return data;
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  useEffect(() => {
    checkAndReset();
  }, [checkAndReset]);

  const incrementStreak = useCallback(() => {
    const today = getDateString();
    
    setStreakData(prev => {
      if (prev.lastCompletionDate === today) {
        return prev;
      }
      
      const yesterday = getYesterdayString();
      let newCount = prev.count;
      
      if (prev.lastCompletionDate === yesterday) {
        newCount = prev.count + 1;
      } else {
        newCount = 1;
      }
      
      const newData = {
        count: newCount,
        lastCompletionDate: today,
        totalCompletions: prev.totalCompletions + 1,
        justReset: false,
        resetMessage: null
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
    
    return true;
  }, []);

  const clearResetMessage = useCallback(() => {
    setStreakData(prev => ({
      ...prev,
      justReset: false,
      resetMessage: null
    }));
  }, []);

  const hasCompletedToday = streakData.lastCompletionDate === getDateString();

  return {
    streak: streakData.count,
    totalCompletions: streakData.totalCompletions,
    hasCompletedToday,
    justReset: streakData.justReset,
    resetMessage: streakData.resetMessage,
    incrementStreak,
    clearResetMessage
  };
}
