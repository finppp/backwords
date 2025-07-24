import React from 'react';
import styled from 'styled-components';
import colours from '../../utils/colours';

const Button = ({ darkText, colour, activeColour, shade, activeShade, onClick, buttonText }) => {
  return (
    <Container
      darkText={darkText}
      colour={colour}
      activeColour={activeColour}
      shade={shade}
      activeShade={activeShade}
    >
      <button onClick={onClick}>{buttonText}</button>
    </Container>
  );
};

export default Button;

const Container = styled.div.attrs(({ colour = 'red', shade = 'medium' }) => ({
  style: {
    backgroundColor: colours[colour][shade],
  },
}))`
  margin: 5px;
  border-radius: 50px;
  height: 100px;
  width: 100px;
  transition: background-color 0.2s ease;

  &:active {
    transition: none;
    background-color: ${({ activeColour, colour = 'red', activeShade, shade = 'medium' }) =>
      colours[activeColour || colour][activeShade || 'dark']};
  }

  button {
    width: 100%;
    height: 100%;
    font-size: 1.4em;
    font-weight: 500;
    color: ${({ darkText }) => (darkText ? 'black' : 'white')};
    outline: none !important;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
`;
