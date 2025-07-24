import React, { Component } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import Guide from '../Guide/Guide'
import colours from '../../utils/colours'

export class Playback extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isRecording: false
    }
  }


  playRecording(player, direction) {
    this.props.playRecording(player, direction)
  }

  finishGame() {
    this.props.onAdvance()
  }

  render() {
    let colour = 'purple'

    let playbackButtons = []
    for (let i = 0; i < this.props.numberOfPlayers; i++) {
      playbackButtons.push(
        <PlaybackGroup key={i}>
          <Guide shade='medium' colour={colour} guideText={`Player ${i + 2}`} />
          {/* <h2>{`Player ${i + 1}`}</h2> */}
          <div>
            <Button colour={colour} onClick={() => this.playRecording(i + 1, 'forwards')} key={i} buttonText='Play' />
            <Button colour={colour} onClick={() => this.playRecording(i + 1, 'backwards')} key={'backwards' + i} buttonText='Flip' />
          </div>
        </PlaybackGroup>
      )
    }
    playbackButtons.push(
      <PlaybackGroup key='original'>
        <Guide shade='medium' colour={colour} guideText='Original' />
        <div>
          <Button colour={colour} onClick={() => this.playRecording('gameAudio', 'backwards')} buttonText='Flip' />
          <Button colour={colour} onClick={() => this.playRecording('gameAudio', 'forwards')} buttonText='Play' />
        </div>
      </PlaybackGroup>
    )

    return (
      <Container colour={colour}>
        {playbackButtons}
        <Button colour={colour} onClick={() => this.finishGame()} buttonText='Finish' />
      </Container>
    )
  }
}

export default Playback

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${props => colours[props.colour || 'red'].light};
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
