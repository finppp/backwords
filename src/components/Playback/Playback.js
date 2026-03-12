import React from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import Guide from '../Guide/Guide'
import colours from '../../utils/colours'

const Playback = ({ onAdvance, playRecording, guideEnabled, numberOfPlayers }) => {
  const colour = 'purple'

  const playbackButtons = []
  for (let i = 0; i < numberOfPlayers; i++) {
    playbackButtons.push(
      <PlaybackGroup key={i}>
        <Guide shade='medium' colour={colour} guideText={`Player ${i + 2}`} />
        <div>
          <Button colour={colour} onClick={() => playRecording(i + 1, 'forwards')} buttonText='Play' />
          <Button colour={colour} onClick={() => playRecording(i + 1, 'backwards')} buttonText='Flip' />
        </div>
      </PlaybackGroup>
    )
  }
  playbackButtons.push(
    <PlaybackGroup key='original'>
      <Guide shade='medium' colour={colour} guideText='Original' />
      <div>
        <Button colour={colour} onClick={() => playRecording('gameAudio', 'backwards')} buttonText='Flip' />
        <Button colour={colour} onClick={() => playRecording('gameAudio', 'forwards')} buttonText='Play' />
      </div>
    </PlaybackGroup>
  )

  return (
    <Container $colour={colour}>
      {playbackButtons}
      <Button colour={colour} onClick={onAdvance} buttonText='Finish' />
    </Container>
  )
}

export default Playback

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${props => colours[props.$colour || 'red'].light};
  height: 100vh;
`;

const PlaybackGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    display: flex;
  }
  h2{
    color: white;
  }
`;
