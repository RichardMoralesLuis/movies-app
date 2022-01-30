export interface Company {
  id: number;
  logo_path: string;
  name: string;
}

export interface CompaniesAPIResponse {
  results: Company[];
  total_pages: number;
  page: number;
}

export interface CompanyResult {
  companies: Company[];
  page: number;
  total_pages: number;
}
