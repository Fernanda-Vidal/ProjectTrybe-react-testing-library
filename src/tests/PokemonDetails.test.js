import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Verifica o componente PokemonDetails.js', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Verifica se existem informações detalhadas do pokémon', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const detailsPokemon = screen.getByText(/pikachu details/i);
    expect(detailsPokemon).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(h2).toBeInTheDocument();

    const paragrafo = screen.getByText(/This intelligent Pokémon roasts/i);
    expect(paragrafo).toBeInTheDocument();
  });

  it('Verifica se existem mapas', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const h2 = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(h2).toBeInTheDocument();

    const img = screen.getAllByAltText(/pikachu location/i);
    expect(img).toHaveLength(2);
    expect(img[0]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(img[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
  });

  it('Verifica se é possível favoritar o pokémon na tela de detalhes', () => {
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkFavorite = screen.getByRole('checkbox');
    expect(checkFavorite).toBeEnabled();

    const labelCheckBox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(labelCheckBox).toBeInTheDocument();
  });
});
