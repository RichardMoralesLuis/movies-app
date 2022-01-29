import { act, screen } from '@testing-library/react';
import { renderWithRouter } from '../test/TestHelpers';
import { DiscoverMovies } from './DiscoverMovies';
import { API } from '../api/API';
import { SimpleMovieApiModel } from '../api/movies/models';
import { CastModel } from '../api/cast/model';
import { CompanyModel } from '../api/companies/models';

const MOCK_SEARCH_MOVIE: SimpleMovieApiModel[] = [
  {
    id: 1,
    genre_ids: [],
    title: 'test',
    overview: ''
  },
  {
    id: 2,
    genre_ids: [],
    title: 'test2',
    overview: ''
  }
];
const MOCK_SEARCH_CASTS: CastModel[] = [
  {
    id: 1,
    name: 'Cast1'
  }
];
const MOCK_SEARCH_COMPANIES: CompanyModel[] = [
  {
    id: 1,
    name: 'Company 1'
  },
  {
    id: 2,
    name: 'Company 2'
  },
  {
    id: 3,
    name: 'Company 3'
  }
];

const renderDiscoverMovies = async () => {
  API.MOVIES.search = jest.fn().mockResolvedValue({ movies: MOCK_SEARCH_MOVIE, page: 1, totalPages: 1, totalResults: 2 });
  API.CASTS.search = jest.fn().mockResolvedValue({ casts: MOCK_SEARCH_CASTS, page: 1, totalPages: 1, totalResults: 1 });
  API.PRODUCTION_COMPANIES.search = jest.fn().mockResolvedValue({ companies: MOCK_SEARCH_COMPANIES, page: 1, totalPages: 1, totalResults: 3 });
  API.GENRES.all = jest.fn().mockResolvedValue([{ id: 1, name: 'action' }]);

  await act(async () => {
    await renderWithRouter(<DiscoverMovies/>);
  });

  const getElement = async (query: string) => await screen.queryByText(query);

  return { screen, getElement };
};

describe('Discover Movies', function() {
  describe('render', function() {
    it('should render ok', async function() {
      await renderDiscoverMovies();
    });
  });
  describe('Sections', function() {
    it('should render the sections with the number of totalResults', async function() {
      const { getElement } = await renderDiscoverMovies();

      const moviesTotal = getElement('2');

      expect(moviesTotal).not.toBeNull();
    });
  });
});
