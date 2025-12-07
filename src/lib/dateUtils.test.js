import { describe, it, expect } from 'vitest';
import { tryParseToISO, isISOInRange } from './dateUtils';

describe('dateUtils', () => {
  it('parses ISO dates unchanged', () => {
    expect(tryParseToISO('2025-11-24')).toBe('2025-11-24');
  });

  it('parses short spanish date like "24 Nov" to ISO (current year)', () => {
    const iso = tryParseToISO('24 Nov');
    expect(iso).toMatch(/\d{4}-11-24/);
  });

  it('parses month+year like "Ene 2025" to first day', () => {
    expect(tryParseToISO('Ene 2025')).toBe('2025-01-01');
  });

  it('checks if ISO is in range', () => {
    expect(isISOInRange('2025-11-24', '2025-11-01', '2025-11-30')).toBe(true);
    expect(isISOInRange('2025-10-24', '2025-11-01', '2025-11-30')).toBe(false);
  });
});
