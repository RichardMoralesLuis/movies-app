import { renderWithRouter } from '../../test/TestHelpers';
import { MovieDetails } from './MovieDetails';
import { API } from '../../api/API';
import { MovieDetailModel } from '../../api/movies/models';
import { act, screen } from '@testing-library/react';

const MOVIE_MOCK: MovieDetailModel = {
  id: 1,
  production_companies: [{ id: 1, name: 'company 1', logoPath: '' }, { id: 2, name: 'company 2', logoPath: '' }],
  overview: 'Test overview',
  budget: 2000000,
  revenue: 3000,
  status: 'canceled',
  vote_average: 89,
  genres: [{ id: 1, name: 'action' }, { id: 2, name: 'Comedy' }],
  release_date: '2022-28-1',
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
  API.MOVIES.favorites = jest.fn().mockResolvedValue({ movies: [], page: 1, totalPages: 1 });

  await act(async () => {
    await renderWithRouter(<MovieDetails/>, { route: '/' }, { withUser: true });
  });

  const getElement = (query: string) => screen.queryByText(query);

  return { screen, getElement };

};

describe('MovieDetails', function() {
  describe('render', function() {
    it('should render ok', async function() {
      await renderMovieDetails();
    });

    it('should render ok the sub information of the header', async function() {
      const { getElement } = await renderMovieDetails();

      const subInformation = getElement('28/01/2022 - Action, Comedy');

      expect(subInformation).toBeDefined();
    });

    it('should render ok the companies', async function() {
      const { getElement } = await renderMovieDetails();

      const companiesInformation = getElement('company 1, company 2');

      expect(companiesInformation).toBeDefined();
    });

    it('should render ok the budget as a dollars', async function() {
      const { getElement } = await renderMovieDetails();

      const budget = getElement('$2,000,000.00');

      expect(budget).toBeDefined();
    });

    it('should render ok the revenue as a dollars', async function() {
      const { getElement } = await renderMovieDetails();

      const revenue = getElement('$3,000.00');

      expect(revenue).toBeDefined();
    });
  });
});
