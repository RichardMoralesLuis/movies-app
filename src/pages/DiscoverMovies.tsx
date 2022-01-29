import React, { FC } from 'react';
import { useLoadGenres } from '../hooks/useLoadGenres';
import { GenresSelector } from '../components/select/GenresSelector';
import styled from '@emotion/styled';
import { useFilter } from '../hooks/useFilter';
import { RatingSlide } from '../components/filters/RatingSlide';
import { NavBar } from '../components/navbar/Navbar';
import { Button, Typography } from '@mui/material';
import { FilterDatePicker } from '../components/filters/FilterDatePicker';
import { MoviesList } from '../components/movies/MoviesList';
import { usePopularMovies } from '../hooks/usePopularMovies';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 22px;
  gap: 20px;
  justify-content: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  padding: 36px;
  border: 1px solid #e3e3e3;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const DiscoverMovies: FC = () => {
  const { genres, isLoadingGenres } = useLoadGenres();
  const { movies, handleFilter, handleChangeGenres, handleChangeReleaseDate, filters, isFiltering, handleChangeRating } = useFilter();
  const { popularMovies = [] } = usePopularMovies();


  if (isLoadingGenres || isFiltering) {
    return <div>Loading...</div>;
  }

  const moviesToShow = movies.length ? movies : popularMovies;

  return <>
    <NavBar/>
    <Container>
      <FiltersContainer>
        <Filters>
          <Typography>Select your favorites genres</Typography>
          <GenresSelector genres={genres} selectedGenres={filters.genres} onSelectGenres={handleChangeGenres}/>
          <br/>
          <Typography>Release date</Typography>
          <FilterDatePicker onChange={handleChangeReleaseDate} date={filters.releaseDate}/>
          <br/>
          <Typography>People rating</Typography>
          <RatingSlide value={filters.rating} onChange={handleChangeRating}/>
          <Button onClick={handleFilter} variant="contained" color="primary">Filter</Button>
          <br/>
        </Filters>
      </FiltersContainer>
      <div>
        <MoviesList movies={moviesToShow} onShowMoreMovies={() => console.log('update')}/>
      </div>
    </Container>
  </>;
};
