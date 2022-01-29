export interface CompaniesAPIResponse {
  results: CompanyAPI[];
  total_pages: number;
  page: number;
}

export interface CompanyAPI {
  id: number;
  logo_path: string;
  name: string;
}

export interface CompanyModel {
  id: number;
  logoPath?: string;
  name: string;
}

export interface CompanyResult {
  companies: CompanyModel[];
  page: number;
  totalPages: number;
}
