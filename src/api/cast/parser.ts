import { CastAPI, CastAPIResponse, CastModel, CastResult } from './model';

const toCast = (cast: CastAPI): CastModel => {
  const { profile_path } = cast;
  return {
    ...cast,
    profilePath: profile_path
  };
};

export const toCasts = (moviesResponse: CastAPIResponse): CastResult => {
  const { results, total_pages, page } = moviesResponse;

  return {
    totalPages: total_pages,
    page,
    casts: results.map(toCast)
  };
};
