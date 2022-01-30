import { CompaniesAPIResponse, CompanyResult } from './models';

export const toCompanies = (companiesResponse: CompaniesAPIResponse): CompanyResult => {
  const { results, total_pages, page } = companiesResponse;

  return {
    total_pages,
    page,
    companies: results
  };
};
