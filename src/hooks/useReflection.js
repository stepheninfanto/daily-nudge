import { useState, useCallback } from 'react';

const STORAGE_KEY = 'nudge-reflection';
const HISTORY_KEY = 'nudge-reflection-history';
const LAST_PROMPTED_KEY = 'nudge-reflection-last-prompted';
const MAX_DAYS = 30;

const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

const checkHasReflectedToday = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      const today = getDateString();
      return data.date === today && data.completed;
    } catch {
      return false;
    }
  }
  return false;
};

const shouldShowReflection = () => {
  const lastPrompted = localStorage.getItem(LAST_PROMPTED_KEY);
  const today = getDateString();
  const hour = new Date().getHours();
  
  if (lastPrompted !== today && hour >= 18) {
    localStorage.setItem(LAST_PROMPTED_KEY, today);
    return true;
  }
  return false;
};

export function useReflection() {
  const [reflection, setReflection] = useState({
    accomplished: '',
    grateful: '',
    wastedFocus: '',
    improvement: ''
  });
  
  const [hasReflectedToday, setHasReflectedToday] = useState(checkHasReflectedToday);
  const [showReflection, setShowReflection] = useState(shouldShowReflection);

  const updateReflection = useCallback((field, value) => {
    setReflection(prev => ({ ...prev, [field]: value }));
  }, []);

  const saveReflection = useCallback(() => {
    const today = getDateString();
    const data = {
      date: today,
      accomplished: reflection.accomplished,
      grateful: reflection.grateful,
      wastedFocus: reflection.wastedFocus,
      improvement: reflection.improvement,
      completed: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    const historyStored = localStorage.getItem(HISTORY_KEY);
    let history = [];
    if (historyStored) {
      try {
        history = JSON.parse(historyStored);
      } catch {
        history = [];
      }
    }
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_DAYS);
    const cutoffString = cutoffDate.toISOString().split('T')[0];
    
    history = history.filter(entry => entry.date >= cutoffString && entry.date !== today);
    history.unshift({
      date: today,
      accomplished: reflection.accomplished,
      grateful: reflection.grateful,
      wastedFocus: reflection.wastedFocus,
      improvement: reflection.improvement
    });
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    
    setHasReflectedToday(true);
    setShowReflection(false);
    return data;
  }, [reflection]);

  const skipReflection = useCallback(() => {
    setShowReflection(false);
  }, []);

  const triggerReflection = useCallback(() => {
    setShowReflection(true);
  }, []);

  const resetReflection = useCallback(() => {
    setReflection({
      accomplished: '',
      grateful: '',
      wastedFocus: '',
      improvement: ''
    });
  }, []);

  return {
    reflection,
    hasReflectedToday,
    showReflection,
    updateReflection,
    saveReflection,
    skipReflection,
    triggerReflection,
    resetReflection
  };
}
