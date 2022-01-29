import { renderWithRouter } from '../../../test/TestHelpers';
import { MovieDetails } from '../MovieDetails';
import { API } from '../../../api/API';
import { MovieDetailModel } from '../../../api/movies/models';
import { act, screen } from '@testing-library/react';

const MOVIE_MOCK: MovieDetailModel = {
  id: 1,
  production_companies: [{ id: 1, name: 'Company 1', logoPath: '' }, { id: 2, name: 'Company 2', logoPath: '' }],
  overview: 'Test overview',
  budget: 2000000,
  revenue: 3000,
  status: 'canceled',
  vote_average: 89,
  genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }],
  release_date: '2022-01-28',
  original_title: 'Test',
  title: 'test',
  video: false
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ movieId: 1 })
}));

const renderMovieDetails = async () => {
  API.MOVIES.byId = jest.fn().mockResolvedValue(MOVIE_MOCK);
  API.MOVIES.credits = jest.fn().mockResolvedValue({ credits: [] });
  API.MOVIES.favorites = jest.fn().mockResolvedValue({ movies: [], page: 1, totalPages: 1 });

  let utils: any;
  await act(async () => {
    utils = await renderWithRouter(<MovieDetails/>, { route: '/' }, { withUser: true });
  });

  const getElement = (query: string) => utils.getByText(query);

  return { utils, getElement };
};

describe('MovieDetails', function () {
  describe('render', function () {
    it('should render ok', async function () {
      await renderMovieDetails();
    });
  });
  describe('render sections', function () {
    it('should render ok the release date formatted', async function () {
      const { getElement } = await renderMovieDetails();

      const releaseDate = getElement('28/01/2022');

      expect(releaseDate).toBeInTheDocument();
    });

    it('should render ok the genres formatted', async function () {
      const { getElement } = await renderMovieDetails();

      const genres = getElement('Action, Comedy');

      expect(genres).toBeInTheDocument();
    });

    it('should render ok the production companies formatted', async function () {
      const { getElement } = await renderMovieDetails();

      const companies = getElement('Company 1, Company 2');

      expect(companies).toBeInTheDocument();
    });

    it('should render ok the budget formatted', async function () {
      const { getElement } = await renderMovieDetails();

      const budget = getElement('$2,000,000.00');

      expect(budget).toBeInTheDocument();
    });

    it('should render ok the revenue formatted', async function () {
      const { getElement } = await renderMovieDetails();

      const revenue = getElement('$3,000.00');

      expect(revenue).toBeInTheDocument();
    });
  });
});
