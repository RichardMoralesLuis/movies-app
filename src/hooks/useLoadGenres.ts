import { useEffect, useState } from 'react';
import { API } from '../api/API';

interface UseLoadGenresResult {
  isLoadingGenres: boolean;
  genres: any;
}

export const useLoadGenres = (): UseLoadGenresResult => {
  const [isLoadingGenres, setIsLoadingGenres] = useState(false);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    const loadGenresRequest = async () => {
      setIsLoadingGenres(true);
      const { genres }: any = await API.GENRES.all();
      setGenres(genres);
      setIsLoadingGenres(false);
    };

    loadGenresRequest().catch(console.error);
  }, []);


  return {
    isLoadingGenres,
    genres
  };
};
