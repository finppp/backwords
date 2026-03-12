import React from 'react'
import styled from 'styled-components'
import Button from '../Button/Button'
import Guide from '../Guide/Guide'

const PlayerCountSelect = ({ numberOfPlayers, changePlayerCount }) => {
  const baseColour = 'blue'

  return (
    <Container>
      <Guide colour='blue' shade='medium' guideText='How many players?' />
      <Row>
        <Button
          colour={baseColour}
          shade={numberOfPlayers === 1 ? 'light' : 'dark'}
          onClick={() => changePlayerCount(1)} buttonText='2' />
        <Button
          colour={baseColour}
          shade={numberOfPlayers === 2 ? 'light' : 'dark'}
          onClick={() => changePlayerCount(2)} buttonText='3' />
      </Row>
      <Row>
        <Button
          colour={baseColour}
          shade={numberOfPlayers === 3 ? 'light' : 'dark'}
          onClick={() => changePlayerCount(3)} buttonText='4' />
        <Button
          colour={baseColour}
          shade={numberOfPlayers === 4 ? 'light' : 'dark'}
          onClick={() => changePlayerCount(4)} buttonText='5' />
      </Row>
    </Container>
  )
}

export default PlayerCountSelect

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
