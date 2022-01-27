import { useState } from 'react';
import { API } from '../api/API';
import dayjs from 'dayjs';
import { MovieModel } from '../api/movies/models';

interface Filters {
  genres?: string[];
  releaseDate?: string;
  rating?: number[];
}


interface UseFilterResponse {
  handleChangeGenres: (genres: string[]) => void;
  handleChangeReleaseDate: (date: string) => void;
  handleChangeRating: (rating: number[]) => void;
  handleFilter: () => void;
  movies: any;
  filters: Filters;
  isFiltering: boolean;
}

export const toUTC = (date: Date): string => dayjs(date, { utc: true }).toISOString();
export const average = (rating: number[]): number => Number(((rating[0] + rating[1]) / 2).toFixed(2));

const toFilterValue = (key: string, value: any) => {
  console.log('ey', key, value);
  if (key === 'genres') {
    return value.join(',');
  }

  if (key === 'rating') {
    return average(value);
  }

  return value;
};

const FILTER_PARAMS: any = {
  genres: 'with_genres',
  releaseDate: 'release_date.gte',
  rating: 'vote_average.gte'
};

const toFilterParams = (filters: Filters) => {
  const params: any = {};
  Object.entries(filters).forEach((entry) => {
    const paramKey = FILTER_PARAMS[entry[0]];
    params[paramKey] = toFilterValue(entry[0], entry[1]);
  });

  return params;
};

export const useFilter = (): UseFilterResponse => {
  const [filters, setFilter] = useState<Filters>({});
  const [isFiltering, setIsFiltering] = useState(false);
  const [movies, setMovies] = useState<MovieModel[] | undefined>();

  const handleChangeGenres = (genres: string[]) => setFilter({ ...filters, genres: genres as any });
  const handleChangeRating = (rating: number[]) => setFilter({ ...filters, rating: rating });
  const handleChangeReleaseDate = (date: string) => {
    const releaseDate = new Date(date);
    setFilter({ ...filters, releaseDate: toUTC(releaseDate) });
  };


  const handleFilter = async () => {
    setIsFiltering(true);
    const paramFilters = toFilterParams(filters);
    const { movies } = await API.DISCOVER.filter(paramFilters);
    setMovies(movies);
    setIsFiltering(false);
  };

  return {
    filters,
    isFiltering,
    movies,
    handleChangeGenres,
    handleChangeReleaseDate,
    handleChangeRating,
    handleFilter
  };

};
