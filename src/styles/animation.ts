import styled, { keyframes } from 'styled-components';

export const slideUp = keyframes`
    from {
        transform: translateY(200px);
    }
    to {
        transform: translateY(0px);
    }
`;

export const slideDown = keyframes`
    from {
        transform: translateY(0px);
    }
    to {
        transform: translateY(200px);
    
    }
`;
export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;
