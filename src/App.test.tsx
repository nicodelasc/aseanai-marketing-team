import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the start node initially', () => {
    render(<App />);

    expect(screen.getByText('Explore a starting point')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Live activity' })).toBeInTheDocument();
  });

  it('shows a thinking state before navigating to the next node', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(
      screen.getByRole('button', {
        name: 'Information and guidance'
      })
    );

    expect(screen.getByText('Reading the clues...')).toBeInTheDocument();

    expect(await screen.findByText('Explore the focus', undefined, { timeout: 2000 })).toBeInTheDocument();
  });

  it('renders result content and CTAs when a result node is reached', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Live activity' }));
    await screen.findByText('What does this solution mainly work with?', undefined, { timeout: 2000 });
    await user.click(screen.getByRole('button', { name: 'Visuals or scans' }));

    expect(await screen.findByText('Port Sentinel Vision', undefined, { timeout: 2000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View case study' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play Again' })).toBeInTheDocument();
  });

  it('resets the game when Play Again is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Live activity' }));
    await screen.findByText('What does this solution mainly work with?', undefined, { timeout: 2000 });
    await user.click(screen.getByRole('button', { name: 'Visuals or scans' }));
    await screen.findByRole('button', { name: 'Play Again' }, { timeout: 2000 });
    await user.click(screen.getByRole('button', { name: 'Play Again' }));

    expect(screen.getByText('Explore a starting point')).toBeInTheDocument();
  });
});
