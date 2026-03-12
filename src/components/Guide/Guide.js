import React from 'react'
import styled from 'styled-components';
import colours from '../../utils/colours'

const Guide = ({ guideOnly, guideEnabled, guideText, colour, shade }) => {
  if (guideOnly && !guideEnabled) {
    return null
  }

  let content
  if (Array.isArray(guideText)) {
    content = guideText.map((text, i) => <h3 key={i}>{text}</h3>)
  } else {
    content = <h3>{guideText}</h3>
  }

  return (
    <Container $colour={colour} $shade={shade}>
      {content}
    </Container>
  )
}

export default Guide

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 30px;
  max-width:400px;
  min-width: 200px;
  margin: 10px 20px;

  h3 {
    font-size: 16px;
    padding: 0 20px 20px 20px;
    color: ${props => colours[props.$colour || 'red'][props.$shade || 'light']};
    text-align: center;
    &:first-child {
      padding-top: 20px;
    }
  }
`;
