import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

const averageWeight = { measurementUnit: 'kg', value: '6.0' };
const { measurementUnit, value } = averageWeight;

describe('Verifica o component Pokemon.js', () => {
  it('Verifica se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const electric = screen.getAllByText(/electric/i);
    expect(electric).toHaveLength(2);

    const divPikachu = screen.getByTestId('pokemon-type');
    expect(divPikachu).toHaveTextContent(/electric/i);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    const url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', url);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
  });

  it('Verifica se o card renderizado contém um link para navegação', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);
    const pikachuDetails = screen.getByRole('heading',
      { name: /pikachu details/i, level: 2 });
    expect(pikachuDetails).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe os pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.type(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const checkFavorite = screen.getByRole('checkbox');
    userEvent.click(checkFavorite);
    expect(checkFavorite).toBeChecked();

    const iconFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
