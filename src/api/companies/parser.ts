import { CompaniesAPIResponse, CompanyAPI, CompanyModel, CompanyResult } from './models';

const toCompany = (company: CompanyAPI): CompanyModel => {
  const { logo_path } = company;

  return {
    ...company,
    logoPath: logo_path
  };
};

export const toCompanies = (companiesResponse: CompaniesAPIResponse): CompanyResult => {
  const { results, total_pages, page } = companiesResponse;

  return {
    totalPages: total_pages,
    page,
    companies: results.map(toCompany)
  };
};
