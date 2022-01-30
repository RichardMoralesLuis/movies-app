export interface Cast {
  id: number;
  profile_path?: string;
  name: string;
}

export interface CastAPIResponse {
  results: Cast[];
  page: number;
  total_pages: number;
}

export interface CastResult {
  casts: Cast[];
  page: number;
  total_pages: number;
}
