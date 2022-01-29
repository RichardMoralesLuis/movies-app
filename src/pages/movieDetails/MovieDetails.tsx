import styled from '@emotion/styled';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useMovie } from '../../hooks/useMovie';
import { PageContainer } from '../../components/containers/PageContainer';
import { DEFAULT_IMAGE_PATH } from '../../components/movies/Movie';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { CastsCarrousel } from '../../components/movies/CastsCarrousel';
import { NavBar } from '../../components/navbar/Navbar';
import { useMainContext } from '../../context/Context';
import { FavoriteIcon } from '../../components/favorite/FavoriteIcon';
import { useFavorites } from '../../hooks/useFavorite';

const Header = styled.div<any>`
  linear-gradient(to right, rgba(20.00%, 15.69%, 20.39%, 1.00) 150px, rgba(20.00%, 15.69%, 20.39%, 0.84) 100%)
  border-bottom: 1px solid var(--primaryColor);
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${props => `url(${props.background})`};
  margin: 20px 0;
`;

const Gradient = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-image: linear-gradient(to right, rgba(20.00%, 15.69%, 20.39%, 1.00) 150px, rgba(20.00%, 15.69%, 20.39%, 0.84) 100%)
`;

const MainInformation = styled.section`
  display: flex;
  flex-wrap: nowrap;
`;

const Poster = styled.div`
  border-width: 0;
  min-width: 300px;
  width: 300px;
  height: 450px;
  overflow: hidden;
  border-radius: 8px;
`;

const InformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF
`;

const InformationSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  box-sizing: border-box;
  padding-left: 40px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const SubInformation = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 2.2rem;
`;

const Companies = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Overview = styled.div`
  flex-direction: column;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const ExtraInformation = styled.div`
  max-width: 1400px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  padding: 30px 40px 30px 40px;
`;

const RightInformation = styled.section`
  width: 100%;
`;
const LeftInformation = styled.section`
  width: fit-content;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
  border: 1px solid rgba(227, 227, 227);
  border-radius: 8px;
  padding: 50px;
`;

const dollarFormatter = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const MovieDetails: FC = () => {
  const { userAccount, sessionId } = useMainContext();
  const { movieId } = useParams();
  const { movie, isLoadingMovie, movieCasts } = useMovie(Number(movieId));
  const { isLoadingFavoritesMovies, favoriteMovies, handleAddFavorite, handleRemoveFavorite } = useFavorites(userAccount?.id, sessionId);

  const handleFavorite = (isFavorite: boolean) => {
    if (isFavorite) {
      handleRemoveFavorite(movie!.id);
      return;
    }

    handleAddFavorite(movie!.id);
  };

  if (isLoadingMovie || isLoadingFavoritesMovies) {
    return <PageContainer>Loading movie</PageContainer>;
  }

  const imagePath = `${process.env.REACT_APP_MOVIEDB_IMAGE_URL}${movie?.poster_path}`;
  const backdropPath = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.backdrop_path}`;
  const source = movie?.poster_path ? imagePath : DEFAULT_IMAGE_PATH;
  const releaseDate = dayjs(new Date(movie!.release_date)).format('DD/MM/YYYY');
  const genres = movie?.genres.map(genre => genre.name).join(', ');
  const companies = movie?.production_companies.map(company => company.name).join(', ');
  const budget = dollarFormatter.format(movie?.budget ?? 0);
  const revenue = dollarFormatter.format(movie?.revenue ?? 0);
  const isFavorite = Boolean(favoriteMovies.find(favoriteMovie => favoriteMovie.id === movie?.id));

  return <>
    <NavBar/>
    <Header background={backdropPath}>
      <Gradient>
        <MainInformation>
          <Poster>
            <img src={source} alt="poster"/>
          </Poster>
          <InformationContainer>
            <InformationSection>
              <Title>
                <Typography sx={{ color: '#FFF', marginRight: '12px' }} component="span" fontWeight="bold" variant="h4" color="text.primary">{movie?.title}</Typography>
                {userAccount ? <FavoriteIcon isFavorite={isFavorite} onClick={handleFavorite}/> : null}
              </Title>
              <SubInformation>
                <Typography sx={{ display: 'inline', color: '#FFF' }} component="span" variant="body2" color="text.primary">{releaseDate}</Typography>
                <Typography sx={{ display: 'inline', color: '#FFF' }} component="span" variant="body2" color="text.primary"> - </Typography>
                <Typography sx={{ display: 'inline', color: '#FFF' }} component="span" variant="body2" color="text.primary">{genres}</Typography>
              </SubInformation>
              <Companies>
                <Typography sx={{ color: '#FFF', marginBottom: '6px' }} component="div" variant="h4" color="text.primary">Product Companies</Typography>
                <Typography sx={{ color: '#FFF' }} component="span" variant="body2" color="text.primary">{companies}</Typography>
              </Companies>
              <Overview>
                <Typography sx={{ color: '#FFF', marginBottom: '6px' }} component="div" variant="h4" color="text.primary">Overview</Typography>
                <Typography sx={{ color: '#FFF' }} component="div" variant="body2" color="text.primary">{movie?.overview}</Typography>
              </Overview>
            </InformationSection>
          </InformationContainer>
        </MainInformation>
      </Gradient>
    </Header>
    <ExtraInformation>
      <RightInformation>
        <Typography component="span" fontWeight="bold" variant="h4" color="text.primary">Casts</Typography>
        <CastsCarrousel casts={movieCasts}/>
      </RightInformation>
      <LeftInformation>
        <Typography sx={{ boxSizing: 'border-box' }} component="p" fontWeight="bold" variant="body1" color="text.primary">Original title</Typography>
        <Typography sx={{ boxSizing: 'border-box', marginBottom: '20px' }} component="p" variant="body2" color="text.primary">{movie?.original_title}</Typography>
        <Typography sx={{ boxSizing: 'border-box' }} component="p" fontWeight="bold" variant="body1" color="text.primary">Status</Typography>
        <Typography sx={{ boxSizing: 'border-box', marginBottom: '20px' }} component="p" variant="body2" color="text.primary">{movie?.status}</Typography>
        <Typography sx={{ boxSizing: 'border-box' }} component="p" fontWeight="bold" variant="body1" color="text.primary">Budget</Typography>
        <Typography sx={{ boxSizing: 'border-box', marginBottom: '20px' }} component="p" variant="body2" color="text.primary">{budget}</Typography>
        <Typography sx={{ boxSizing: 'border-box' }} component="p" fontWeight="bold" variant="body1" color="text.primary">Revenue</Typography>
        <Typography sx={{ boxSizing: 'border-box', marginBottom: '20px' }} component="p" variant="body2" color="text.primary">{revenue}</Typography>
      </LeftInformation>
    </ExtraInformation>
  </>;
};
