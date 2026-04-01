import { useState, useCallback } from 'react';

const STORAGE_KEY = 'nudge-reflection-history';
const MAX_DAYS = 30;

const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

const getDateDisplay = (dateString) => {
  const date = new Date(dateString + 'T00:00:00');
  const today = getDateString();
  const yesterday = getYesterdayString();
  
  if (dateString === today) {
    return 'Today';
  }
  if (dateString === yesterday) {
    return 'Yesterday';
  }
  
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

const getYesterdayString = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getDateString(yesterday);
};

const pruneOldEntries = (history) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - MAX_DAYS);
  const cutoffString = cutoffDate.toISOString().split('T')[0];
  
  return history.filter(entry => entry.date >= cutoffString);
};

const getInitialHistory = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      const pruned = pruneOldEntries(data);
      if (pruned.length !== data.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
      }
      return pruned.sort((a, b) => b.date.localeCompare(a.date));
    } catch {
      return [];
    }
  }
  return [];
};

export function useReflectionHistory() {
  const [history, setHistory] = useState(getInitialHistory);

  const addReflection = useCallback((reflection) => {
    const newEntry = {
      date: reflection.date,
      accomplished: reflection.accomplished,
      grateful: reflection.grateful,
      wastedFocus: reflection.wastedFocus,
      improvement: reflection.improvement
    };

    setHistory(prev => {
      const filtered = prev.filter(entry => entry.date !== reflection.date);
      const updated = [newEntry, ...filtered];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getFormattedDate = useCallback((dateString) => {
    return getDateDisplay(dateString);
  }, []);

  return {
    history,
    addReflection,
    getFormattedDate
  };
}