import { useEffect, useState } from 'react';
import { API } from '../api/API';
import { Video } from '../api/movies/models';

interface UseLoadTrailerResults {
  trailerInfo: Video;
}

export const useLoadTrailer = (movieId: number): UseLoadTrailerResults => {
  const [trailerInfo, setTrailerInfo] = useState<Video>({} as Video);

  useEffect(() => {
    const requestTrailer = async () => {
      const trailerInfo = await API.MOVIES.trailer(movieId);
      setTrailerInfo(trailerInfo);
    };

    requestTrailer().catch(console.error);
  }, []);

  return { trailerInfo };

};
