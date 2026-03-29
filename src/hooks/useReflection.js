import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nudge-reflection';
const LAST_PROMPTED_KEY = 'nudge-reflection-last-prompted';

const getDateString = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

export function useReflection() {
  const [reflection, setReflection] = useState({
    accomplished: '',
    grateful: '',
    wastedFocus: '',
    improvement: ''
  });
  
  const [hasReflectedToday, setHasReflectedToday] = useState(false);
  const [showReflection, setShowReflection] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        const today = getDateString();
        if (data.date === today && data.completed) {
          setHasReflectedToday(true);
        }
      } catch {
        // Ignore parse errors
      }
    }

    const lastPrompted = localStorage.getItem(LAST_PROMPTED_KEY);
    const today = getDateString();
    
    if (lastPrompted !== today && !hasReflectedToday) {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 4) {
        setShowReflection(true);
        localStorage.setItem(LAST_PROMPTED_KEY, today);
      }
    }
  }, [hasReflectedToday]);

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
