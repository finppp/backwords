import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import colours from '../../utils/colours'
import Guide from '../Guide/Guide'

const colourArray = ['green', 'orange', 'red', 'yellow', 'blue', 'pink']

const Player = ({ onAdvance, startRecording, stopRecording, playRecording, guideEnabled, currentPlayer }) => {
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    setIsRecording(false)
  }, [currentPlayer])

  const handleStartRecording = () => {
    startRecording()
    setIsRecording(true)
  }

  const handleFinishRecording = () => {
    stopRecording()
    onAdvance()
  }

  const colour = colourArray[currentPlayer - 1]

  return (
    <Container $colour={colour}>
      <Guide
        shade='medium' colour={colour}
        guideText={`Player ${currentPlayer + 1 || 'x'}`} />

      <Guide
        guideOnly
        guideEnabled={guideEnabled}
        shade='medium' colour={colour}
        guideText={
          ["Each player listens to a reversed version of the Leaders recording - as many times as they like ", "(Play button)"]} />

      <Guide
        guideOnly
        guideEnabled={guideEnabled}
        shade='medium' colour={colour}
        guideText={['They then have to record their best imitation of the sound', '(Record button)']} />

      <Button colour={colour} onClick={playRecording} buttonText='Play' />
      {!isRecording &&
        <Button colour={colour} onClick={handleStartRecording} buttonText='Record' />}
      {isRecording &&
        <Button colour={colour} onClick={handleFinishRecording} buttonText='Done' />}
    </Container>
  )
}

export default Player

const Container = styled.section`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition: background-color 0.5s ease;
  background-color: ${props => colours[props.$colour || 'green'].light};
        height: 100vh;
      `;
