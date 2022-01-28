import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

const VALIDATE_URL = 'https://www.themoviedb.org/authenticate';

export const Login: FC = () => {
  const { token } = useParams();
  const redirectPath = `${window.location.origin}/login/session`;

  window.location.href = `${VALIDATE_URL}/${token}?redirect_to=${redirectPath}`;
  return null;
};
