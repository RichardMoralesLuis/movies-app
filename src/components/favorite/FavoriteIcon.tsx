import React, { FC } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import styled from '@emotion/styled';

const Container = styled.div`
  box-sizing: border-box;
  background: rgba(3, 37, 65, 1);
  border-radius: 50%;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

interface FavoriteIconProps {
  isFavorite: boolean;
  onClick: (isFavorite: boolean) => void;
}

export const FavoriteIcon: FC<FavoriteIconProps> = ({ isFavorite, onClick }) => {

  const handleClick = () => onClick(isFavorite);

  if (isFavorite) {
    return <Container onClick={handleClick}>
      <FavoriteRoundedIcon color="error"/>
    </Container>;
  }

  return <Container onClick={handleClick}>
    <FavoriteBorderRoundedIcon/>
  </Container>;
};
