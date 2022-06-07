import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Verifica o componente NotFound.js', () => {
  it('Verifica se a página possui o testo de Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe');
    const notFound = screen.getByRole('heading', { name: /not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se a página renderiza a imagem', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe');
    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
