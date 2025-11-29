import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect } from 'vitest';

describe('SearchBar', () => {
  it('renders inputs and select', () => {
    render(<SearchBar provinces={[{slug: 'cordoba', nombre: 'Córdoba'}]} onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/Buscar por título/i)).toBeTruthy();
    expect(screen.getByRole('combobox')).toBeTruthy();
    // two date inputs
    const dateInputs = screen.getAllByLabelText(/Fecha/);
    expect(dateInputs.length).toBe(2);
  });
});
