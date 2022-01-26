import { Cast, CastAPI, CastAPIResponse, CastModel } from './model';

const toCast = (cast: CastAPI): Cast => {
  const { profile_path } = cast;
  return {
    ...cast,
    profilePath: profile_path
  };
};

export const toCasts = (moviesResponse: CastAPIResponse): CastModel => {
  const { results, total_pages, page } = moviesResponse;

  return {
    totalPages: total_pages,
    page,
    casts: results.map(toCast)
  };
};
