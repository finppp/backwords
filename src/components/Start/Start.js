import React from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import colours from '../../utils/colours'
import PlayerCountSelect from '../PlayerCountSelect/PlayerCountSelect'
import Guide from '../Guide/Guide'

const Start = ({ guideEnabled, toggleGuide, numberOfPlayers, changePlayerCount, onAdvance }) => {
  return (
    <Container>
      <PlayerCountSelect
        numberOfPlayers={numberOfPlayers}
        changePlayerCount={changePlayerCount} />
      <Guide colour='blue' shade='medium' guideText='Guide enabled?' />
      <Row>
        <Button colour='blue' buttonText='Off' shade={guideEnabled ? 'dark' : 'light'} onClick={() => toggleGuide(false)} />
        <Button colour='blue' buttonText='On' shade={guideEnabled ? 'light' : 'dark'} onClick={() => toggleGuide(true)} />
      </Row>
      <Guide colour='blue' shade='medium' guideText='Begin' />
      <Button colour='blue' shade='dark' activeShade='light' onClick={() => onAdvance('record')} buttonText='GO!' />
    </Container>
  )
}

export default Start

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colours.blue.medium};
  height: 100vh;

  h2 {
    color: white;
  }
`;

const Row = styled.div`
  display: flex;
`;
