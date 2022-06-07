import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('Verifica o componente FavoritePokemon.js', () => {
  it('Verifica se a mensagem de Not Found é exibida na tela', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/no favorite/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    const checkBoxFavorite = screen.getByRole('checkbox');
    expect(checkBoxFavorite).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(checkBoxFavorite);
    expect(checkBoxFavorite).toBeChecked();

    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const img = screen.getByRole('img', { name: /favorite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
