import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from '../useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('initializes favorites from localStorage', () => {
    const storedFavorites = [{ id: 1, text: 'Test quote', source: 'Test' }];
    localStorage.setItem('nudge-favorites', JSON.stringify(storedFavorites));

    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual(storedFavorites);
  });

  it('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites());
    const quote = { id: 1, text: 'Test quote', source: 'Test source' };

    act(() => {
      result.current.addFavorite(quote);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(quote);
    expect(result.current.isFavorite(1)).toBe(true);
  });

  it('does not add duplicate favorite', () => {
    const quote = { id: 1, text: 'Test quote', source: 'Test source' };
    localStorage.setItem('nudge-favorites', JSON.stringify([quote]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite(quote);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it('removes a favorite', () => {
    const quote = { id: 1, text: 'Test quote', source: 'Test source' };
    localStorage.setItem('nudge-favorites', JSON.stringify([quote]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('toggles favorite on/off', () => {
    const quote = { id: 1, text: 'Test quote', source: 'Test source' };
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(quote);
    });
    expect(result.current.isFavorite(1)).toBe(true);

    act(() => {
      result.current.toggleFavorite(quote);
    });
    expect(result.current.isFavorite(1)).toBe(false);
  });
});