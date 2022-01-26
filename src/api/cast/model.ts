export interface CastAPI {
  id: number;
  profile_path?: string;
  name: string;
}

export interface CastAPIResponse {
  results: CastAPI[];
  page: number;
  total_pages: number;
}

export interface CastModel {
  id: number;
  profilePath?: string;
  name: string;
}

export interface CastResult {
  casts: CastModel[];
  page: number;
  totalPages: number;
}
