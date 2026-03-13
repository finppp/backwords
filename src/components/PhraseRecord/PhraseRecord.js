import React, { useState } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import colours from '../../utils/colours'
import Guide from '../Guide/Guide'
import Waveform from '../Waveform/Waveform'

const PhraseRecord = ({ startRecording, stopRecording, guideEnabled, analyserRef, onAdvance }) => {
  const [isRecording, setIsRecording] = useState(false)

  const handleStartRecording = () => {
    setIsRecording(true)
    startRecording()
  }

  const handleFinishRecording = () => {
    stopRecording()
    onAdvance('player')
  }

  return (
    <Container>
      <Guide colour='purple' guideOnly guideEnabled={guideEnabled} guideText='The "Leader" (player 1) records a word or phrase without the other players hearing' />
      <Guide colour='purple' guideText={isRecording ? "Click this again when you're done" : "Click Record and say a something"} />
      <Waveform analyserRef={analyserRef} isActive={isRecording} colour='white' bgColour={colours.purple.light} />
      {!isRecording && <Button colour='purple' shade='medium' onClick={handleStartRecording} buttonText='Record' />}
      {isRecording && <Button colour='purple' shade='dark' onClick={handleFinishRecording} buttonText='Stop' flash />}
    </Container>
  )
}

export default PhraseRecord

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${colours.purple.light};
  height: 100vh;
  h2 {
    color: white;
    font-weight: 300;
  }
`;
