import { ChangeEvent, useState } from 'react';
import { API } from '../api/API';
import dayjs from 'dayjs';

interface UseFilterResponse {
  handleChangeGenres: (genres: string[]) => void;
  handleChangeReleaseDate: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeRating: (rating: number[]) => void;
  handleFilter: () => void;
  movies: any;
  filters: any;
  isFiltering: boolean;
}

interface Filters {
  genres?: string[];
  releaseDate?: string;
  rating?: number[];
}

export const toUTC = (date: Date): string => dayjs(date, { utc: true }).toISOString();
export const average = (rating: number[]): number => Number(((rating[0] + rating[1]) / 2).toFixed(2));
const toFilterValue = (key: string, value: any) => {
  if (key === 'genres') {
    return value.join(',');
  }

  if (key === 'rating') {
    return average(value);
  }

  return value;
};

const FILTER_PARAMS: any = {
  genres: 'genres',
  releaseDate: 'release_date.gte',
  rating: 'vote_average.gt'
};

const toFilterParams = (filters: any) => {
  const params: any = {};
  Object.entries(filters).forEach((entry) => {
    const paramKey = FILTER_PARAMS[entry[0]];
    params[paramKey] = toFilterValue(paramKey, entry[1]);
  });

  return params;
};

export const useFilter = (): UseFilterResponse => {
  const [filters, setFilter] = useState<Filters>({});
  const [isFiltering, setIsFiltering] = useState(false);
  const [movies, setMovies] = useState([]);

  const handleChangeGenres = (genres: string[]) => setFilter({ ...filters, genres: genres as any });
  const handleChangeRating = (rating: number[]) => setFilter({ ...filters, rating: rating });
  const handleChangeReleaseDate = (event: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setFilter({ ...filters, releaseDate: toUTC(date) });
  };


  const handleFilter = async () => {
    setIsFiltering(true);
    const paramFilters = toFilterParams(filters);
    const { results: movies }: any = await API.DISCOVER.filter(paramFilters);
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
