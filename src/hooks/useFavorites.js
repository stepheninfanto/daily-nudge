import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'nudge-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const saveToStorage = useCallback((newFavorites) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  }, []);

  const addFavorite = useCallback((quote) => {
    setFavorites(prev => {
      if (prev.some(q => q.id === quote.id)) return prev;
      const newFavorites = [...prev, quote];
      saveToStorage(newFavorites);
      return newFavorites;
    });
  }, [saveToStorage]);

  const removeFavorite = useCallback((quoteId) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(q => q.id !== quoteId);
      saveToStorage(newFavorites);
      return newFavorites;
    });
  }, [saveToStorage]);

  const isFavorite = useCallback((quoteId) => {
    return favorites.some(q => q.id === quoteId);
  }, [favorites]);

  const toggleFavorite = useCallback((quote) => {
    if (isFavorite(quote.id)) {
      removeFavorite(quote.id);
    } else {
      addFavorite(quote);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}
