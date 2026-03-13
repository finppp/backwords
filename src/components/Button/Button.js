import React from 'react';
import styled, { keyframes } from 'styled-components';
import colours from '../../utils/colours';

const Button = ({ darkText, colour, activeColour, shade, activeShade, onClick, buttonText, flash }) => {
  return (
    <Container
      $darkText={darkText}
      $colour={colour}
      $activeColour={activeColour}
      $shade={shade}
      $activeShade={activeShade}
    >
      <button onClick={onClick}>
        {flash
          ? buttonText.split('').map((char, i) => (
              <FlashLetter key={i} $colour={colour} $delay={i * 0.15}>
                {char}
              </FlashLetter>
            ))
          : buttonText}
      </button>
    </Container>
  );
};

export default Button;

const flashText = (lightColour) => keyframes`
  0%, 100% { color: white; }
  50% { color: ${lightColour}; }
`;

const Container = styled.div.attrs(({ $colour = 'red', $shade = 'medium' }) => ({
  style: {
    backgroundColor: colours[$colour][$shade],
  },
}))`
  margin: 5px;
  border-radius: 50px;
  height: 100px;
  width: 100px;
  transition: background-color 0.2s ease;

  &:active {
    transition: none;
    background-color: ${({ $activeColour, $colour = 'red', $activeShade }) =>
      colours[$activeColour || $colour][$activeShade || 'dark']};
  }

  button {
    width: 100%;
    height: 100%;
    font-size: 1.4em;
    font-weight: 500;
    color: ${({ $darkText }) => ($darkText ? 'black' : 'white')};
    outline: none !important;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

const FlashLetter = styled.span`
  display: inline-block;
  animation: ${({ $colour = 'red' }) => flashText(colours[$colour].light)} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay = 0 }) => $delay}s;
`;
