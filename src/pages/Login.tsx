import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const VALIDATE_URL = 'https://www.themoviedb.org/authenticate';

export const Login: FC = () => {
  const { token } = useParams();

  window.location.href = `${VALIDATE_URL}/${token}?redirect_to=http://localhost:3000/login/session`;
  return null;
};
