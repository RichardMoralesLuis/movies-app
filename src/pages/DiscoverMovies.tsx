import React, { FC } from 'react';
import { useLoadGenres } from '../hooks/useLoadGenres';
import { GenresSelector } from '../components/select/GenresSelector';
import styled from '@emotion/styled';
import { useFilter } from '../hooks/useFilter';
import { RatingSlide } from '../components/RatingSlide';

const Container = styled.div`
  max-width: 500px;
`;

export const DiscoverMovies: FC = () => {
  const { genres, isLoadingGenres } = useLoadGenres();

  const { movies, handleFilter, handleChangeGenres, handleChangeReleaseDate, filters, isFiltering, handleChangeRating } = useFilter();


  if (isLoadingGenres || isFiltering) {
    return <div>Loading...</div>;
  }

  return <Container>
    <GenresSelector genres={genres} selectedGenres={filters.genres} onSelectGenres={handleChangeGenres}/>
    <input type="date" name="minimum-release-date" onChange={handleChangeReleaseDate}/>
    <RatingSlide value={filters.rating} onChange={handleChangeRating}/>
    <button onClick={handleFilter}>Filter</button>
    <br/>
    <div>MOVIES</div>
    {movies?.map((movie: any) => <span key={movie.id}>{movie.original_title}<br/></span>)}
  </Container>;
};
