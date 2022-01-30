import { CastAPIResponse, CastResult } from './model';

export const toCasts = (moviesResponse: CastAPIResponse): CastResult => {
  const { results, total_pages, page } = moviesResponse;

  return {
    total_pages,
    page,
    casts: results
  };
};
