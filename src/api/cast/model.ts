export interface CastAPI {
  id: number;
  profile_path?: string;
  title: string;
}

export interface CastAPIResponse {
  results: CastAPI;
  page: number;
}

export interface Cast {
  id: number;
  profilePath?: string;
  knownFor: {
    overview: string;
  };
}

export interface CastModel {
  casts: Cast[];
  page: number;
  totalResults: number;
}
