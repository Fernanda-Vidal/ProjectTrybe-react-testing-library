import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Verifica o componente App.js', () => {
  it('Verifica se existe um link Home e se redireciona para "/" ', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se existe um link About e se redireciona para "/about" ', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se existe Favorite Pokémons e se redireciona para "/favorites" ', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
