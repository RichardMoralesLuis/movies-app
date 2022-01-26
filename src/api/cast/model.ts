export interface CastAPI {
  id: number;
  profile_path?: string;
  name:string;
}

export interface CastAPIResponse {
  results: CastAPI[];
  page: number;
  total_pages: number;
}

export interface Cast {
  id: number;
  profilePath?: string;
  name: string;
}

export interface CastModel {
  casts: Cast[];
  page: number;
  totalPages: number;
}
