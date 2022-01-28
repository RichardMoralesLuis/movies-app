import { Home } from '../Home';
import { renderWithRouter } from '../../../test/TestHelpers';
import { SimpleMovieApiModel } from '../../../api/movies/models';
import { API } from '../../../api/API';
import { act, screen } from '@testing-library/react';


const MOVIES_MOCK: SimpleMovieApiModel[] = [
  {
    id: 1,
    genre_ids: [],
    title: 'Movie test',
    overview: 'test',
    video: false
  }
];

const renderHome = async () => {
  const mockPopularFilms = jest.fn().mockResolvedValue(() => ({ movies: MOVIES_MOCK, page: 1, totalPages: 1 }));
  const mockNowPlayingFilms = jest.fn().mockResolvedValue({ movies: MOVIES_MOCK, page: 1, totalPages: 1 });

  API.MOVIES.popular = mockPopularFilms;
  API.MOVIES.nowPlaying = mockNowPlayingFilms;

  await act(async () => {
    await renderWithRouter(<Home/>);
  });

  return { screen };
};

describe('Home', function() {
  describe('Popular films', function() {
    it('should render ok', function() {
      renderHome();
    });
  });
});
