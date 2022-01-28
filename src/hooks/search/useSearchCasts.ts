import { useEffect, useState } from 'react';
import { API } from '../../api/API';
import { CastModel } from '../../api/cast/model';

interface UseSearchCastsResult {
  isSearchingCast: boolean;
  casts: CastModel[];
  totalCasts: number;
  handleShowMoreCasts: () => void;
}

export const useSearchCasts = (query: string): UseSearchCastsResult => {
  const [casts, setCasts] = useState<CastModel[]>([]);
  const [isSearchingCast, setIsSearchingCast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalCasts, setTotalMovies] = useState<number>(0);

  useEffect(() => {
    const doSearchRequests = async () => {
      const { casts, page, totalResults } = await API.CASTS.search(query);
      setPage(page);
      setTotalMovies(totalResults);
      setCasts(casts);
      setIsSearchingCast(false);
    };

    if (query.length) {
      doSearchRequests().catch(console.error);
    }
  }, [query]);

  const handleShowMoreCasts = async () => {
    const { casts: newCasts, page: newPage } = await API.CASTS.search(query, page + 1);
    setCasts([...casts, ...newCasts]);
    setPage(newPage);
  };

  return {
    isSearchingCast,
    casts,
    handleShowMoreCasts,
    totalCasts
  };

};
