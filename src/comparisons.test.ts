import { describe, expect, it } from 'vitest';
import { COMPARISONS, describeComparison, pickComparisons } from './comparisons';

describe('comparisons', () => {
  it('are kept in price order', () => {
    const prices = COMPARISONS.map((c) => c.czk);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
  it('have unique IDs and text in both languages', () => {
    expect(new Set(COMPARISONS.map((c) => c.id)).size).toBe(COMPARISONS.length);
    for (const c of COMPARISONS) {
      expect(describeComparison(c, 1, 'en')).toBeTruthy();
      expect(describeComparison(c, 3, 'en')).toContain('3');
      expect(describeComparison(c, 3, 'cs')).toContain('3×');
    }
  });
});

describe('pickComparisons', () => {
  it('shows nothing before the first coins', () => {
    expect(pickComparisons(30, 'CZK', 0)).toEqual([]);
  });
  it('picks everything at random, so no item stays put when the player shuffles', () => {
    for (const amount of [500, 5000, 50000]) {
      const always = new Set(pickComparisons(amount, 'CZK', 0).map((c) => c.id));
      for (let seed = 1; seed < 20; seed++) {
        const ids = new Set(pickComparisons(amount, 'CZK', seed).map((c) => c.id));
        for (const id of [...always]) if (!ids.has(id)) always.delete(id);
      }
      expect([...always], `${amount} Kč`).toEqual([]);
    }
  });
  it('only lists things the player can afford', () => {
    for (let seed = 0; seed < 20; seed++) {
      for (const c of pickComparisons(500, 'CZK', seed)) expect(c.czk).toBeLessThanOrEqual(500);
    }
  });
  it('lists up to three different things', () => {
    for (const amount of [30, 350, 5000, 50000]) {
      for (let seed = 0; seed < 50; seed++) {
        const picks = pickComparisons(amount, 'CZK', seed);
        expect(picks.length).toBeLessThanOrEqual(3);
        expect(new Set(picks).size).toBe(picks.length);
        if (amount >= 350) expect(picks).toHaveLength(3);
      }
    }
  });
  it('does not change for the same seed, so the list stays put while the counter ticks', () => {
    expect(pickComparisons(5000, 'CZK', 7)).toEqual(pickComparisons(5000.5, 'CZK', 7));
  });
  it('shows different things as the seed changes', () => {
    const seen = new Set<string>();
    for (let seed = 0; seed < 50; seed++) for (const c of pickComparisons(5000, 'CZK', seed)) seen.add(c.id);
    expect(seen.size).toBeGreaterThan(3);
  });
});
