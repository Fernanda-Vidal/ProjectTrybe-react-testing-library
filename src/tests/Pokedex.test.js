import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { Pokedex } from '../pages';

const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://pwo-wiki.info/images/5/5b/Pp.gif',
      },
    ],
    summary:
        'This intelligent Pokémon roasts ... to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://pwo-wiki.info/images/5/5b/Pp.gif',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://pwo-wiki.info/images/f/f4/Route_3.gif',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://pwo-wiki.info/images/7/7d/Route_4.gif',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://pwo-wiki.info/images/1/1d/Rocktunnel.gif',
      },
    ],
    summary: 'The flame on its tail shows the strength of it... flame also burns weakly.',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://pwo-wiki.info/images/4/49/R45.gif',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://pwo-wiki.info/images/1/13/R42.gif',
      },
    ],
    summary: 'They say that if it emits an ... weather will begin to change instantly.',
  },
];

const isPokemonFavoriteById = {
  25: false,
  4: false,
  148: false,
};

describe('Verifica o component Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
  });

  it('Verifica se a página possui um h2', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica se, ao clicar o botão próximo, um novo pokémon é renderizado', () => {
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNext).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);

    userEvent.click(btnNext);
    expect(pokemonName).toHaveTextContent(/charmander/i);

    userEvent.click(btnNext);
    userEvent.click(btnNext);

    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });

  it('Verifica se apenas um pokémon é mostrado por vez', () => {
    const img = screen.getAllByRole('img');
    expect(img).toHaveLength(1);
  });

  it('Verifica existência e funcionalidade dos botões de filtro', () => {
    const btn = screen.getAllByTestId('pokemon-type-button');
    const number = 3;
    expect(btn).toHaveLength(number);

    pokemons.forEach(({ type }) => {
      const btnFilter = screen.getByRole('button', { name: type });
      expect(btnFilter).toBeInTheDocument();
    });
  });

  it('Verifica se existe um botão para resetar o filtro', () => {
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
  });
});
