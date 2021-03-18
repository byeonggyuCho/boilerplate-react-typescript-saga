import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';

const Button: React.FC = ({ children }) => {
  useEffect(() => {
    console.log('useEffect');
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
  }, []);

  return <StyledButton> {children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 1rem;
  font-size: 0.8rem;
  background-color: pink;
`;

export default Button;
