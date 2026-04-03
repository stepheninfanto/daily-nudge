import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../ThemeToggle';

describe('ThemeToggle', () => {
  it('renders moon icon in light mode', () => {
    render(<ThemeToggle isDark={false} onToggle={() => {}} />);
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  it('renders sun icon in dark mode', () => {
    render(<ThemeToggle isDark={true} onToggle={() => {}} />);
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', () => {
    const onToggle = vi.fn();
    render(<ThemeToggle isDark={false} onToggle={onToggle} />);
    
    fireEvent.click(screen.getByLabelText('Switch to dark mode'));
    
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});