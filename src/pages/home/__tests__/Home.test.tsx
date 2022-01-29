import { Home } from '../Home';
import { renderWithRouter } from '../../../test/TestHelpers';
import { SimpleMovieApiModel } from '../../../api/movies/models';
import { API } from '../../../api/API';
import { act } from '@testing-library/react';


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
  const mockPopularFilms = jest.fn().mockResolvedValue({ movies: MOVIES_MOCK, page: 1, totalPages: 1 });
  const mockNowPlayingFilms = jest.fn().mockResolvedValue({ movies: MOVIES_MOCK, page: 1, totalPages: 1 });

  API.MOVIES.popular = mockPopularFilms;
  API.MOVIES.nowPlaying = mockNowPlayingFilms;

  let utils: any;
  await act(async () => {
    utils = await renderWithRouter(<Home/>);
  });

  return { utils };
};

describe('Home', function () {
  describe('Popular films', function () {
    it('should render ok', async function () {
      await renderHome();
    });
  });

  describe('sections', function () {
    it('should render ok the section', async function () {
      const { utils } = await renderHome();

      const popularSection = utils.getByText(/Popular movies/);

      expect(popularSection).toBeInTheDocument();
    });

    it('should render ok the section', async function () {
      const { utils } = await renderHome();

      const noPlayingSection = utils.getByText(/Now playing/);

      expect(noPlayingSection).toBeInTheDocument();
    });
  });
});
