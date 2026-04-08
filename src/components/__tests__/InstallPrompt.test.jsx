import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { InstallPrompt } from '../InstallPrompt';

describe('InstallPrompt', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('hides button when app is in standalone mode', () => {
    const mockMatchMedia = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    render(<InstallPrompt />);
    expect(screen.queryByLabelText('Install App')).not.toBeInTheDocument();
  });

  it('shows button when beforeinstallprompt event fires', async () => {
    const mockMatchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    render(<InstallPrompt />);

    const mockEvent = new Event('beforeinstallprompt');
    Object.defineProperty(mockEvent, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(mockEvent, 'prompt', { value: vi.fn() });
    Object.defineProperty(mockEvent, 'userChoice', { value: Promise.resolve({ outcome: 'dismissed' }) });

    await act(async () => {
      window.dispatchEvent(mockEvent);
      await Promise.resolve();
    });

    expect(screen.getByLabelText('Install App')).toBeInTheDocument();
  });

  it('triggers install prompt on button click', async () => {
    const mockMatchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    const mockPrompt = vi.fn();
    const userChoicePromise = Promise.resolve({ outcome: 'accepted' });

    const mockEvent = new Event('beforeinstallprompt');
    Object.defineProperty(mockEvent, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(mockEvent, 'prompt', { value: mockPrompt });
    Object.defineProperty(mockEvent, 'userChoice', { value: userChoicePromise });

    render(<InstallPrompt />);

    await act(async () => {
      window.dispatchEvent(mockEvent);
      await Promise.resolve();
    });

    const button = screen.getByLabelText('Install App');
    await act(async () => {
      button.click();
      await userChoicePromise;
    });

    expect(mockPrompt).toHaveBeenCalled();
  });

  it('hides button after accepted install', async () => {
    const mockMatchMedia = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    const mockPrompt = vi.fn();
    const userChoicePromise = Promise.resolve({ outcome: 'accepted' });

    const mockEvent = new Event('beforeinstallprompt');
    Object.defineProperty(mockEvent, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(mockEvent, 'prompt', { value: mockPrompt });
    Object.defineProperty(mockEvent, 'userChoice', { value: userChoicePromise });

    render(<InstallPrompt />);

    await act(async () => {
      window.dispatchEvent(mockEvent);
      await Promise.resolve();
    });

    expect(screen.getByLabelText('Install App')).toBeInTheDocument();

    const button = screen.getByLabelText('Install App');
    await act(async () => {
      button.click();
      await userChoicePromise;
    });

    expect(screen.queryByLabelText('Install App')).not.toBeInTheDocument();
  });
});