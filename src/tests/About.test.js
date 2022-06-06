import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import { About } from '../pages';

describe('Verifica o componente About.js', () => {
  it('Verifica se a página possui as informações sobre Pokédex', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se existem dois paragrafos sobre a pokédex', () => {
    renderWithRouter(<About />);

    const p1 = screen.getByText(/This application/i);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/One can filter/i);
    expect(p2).toBeInTheDocument();
  });

  it('Verifica se a página contém a de uma pokédex', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', url);
  });
});
