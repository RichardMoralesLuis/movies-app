import { useEffect, useState } from 'react';
import { API } from '../../api/API';
import { Company } from '../../api/companies/models';

interface UseSearchCompaniesResult {
  isSearchingCompanies: boolean;
  companies: Company[];
  totalCompanies: number;
  handleShowMoreCompanies: () => void;
}

export const useSearchCompanies = (query: string): UseSearchCompaniesResult => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isSearchingCompanies, setIsSearchingCompanies] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalCompanies, setTotalCompanies] = useState<number>(0);

  useEffect(() => {
    const doSearchRequests = async () => {
      const { companies, page, totalResults }: any = await API.PRODUCTION_COMPANIES.search(query);
      setPage(page);
      setTotalCompanies(totalResults);
      setCompanies(companies);
      setIsSearchingCompanies(false);
    };

    if (query.length) {
      doSearchRequests().catch(console.error);
    }
  }, [query]);

  const handleShowMoreCompanies = async () => {
    const { companies: newCompanies, page: newPage } = await API.PRODUCTION_COMPANIES.search(query, page + 1);
    setCompanies([...companies, ...newCompanies]);
    setPage(newPage);
  };

  return {
    isSearchingCompanies,
    companies,
    handleShowMoreCompanies,
    totalCompanies
  };

};
