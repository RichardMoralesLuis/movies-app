import React, { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  background-color: #fff;
  margin-top: 64px;
`;

interface PageContainerProps {
}

export const PageContainer: FC<PageContainerProps> = ({ children }) => {

  return <Container>
    {children}
  </Container>;
};
