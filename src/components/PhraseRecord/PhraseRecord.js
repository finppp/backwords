import React, { Component } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import colours from '../../utils/colours'
import Guide from '../Guide/Guide'

export class PhraseRecord extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isRecording: false
    }
  }


  startRecording() {
    this.setState({
      isRecording: true
    })
    this.props.startRecording()
  }

  finishRecording() {
    this.props.stopRecording()
    this.props.onAdvance('player')
  }

  render() {
    return (
      <Container>
        <Guide colour='purple' guideOnly guideEnabled={this.props.guideEnabled} guideText='The "Leader" (player 1) records a word or phrase without the other players hearing' />
        <Guide colour='purple' guideText={this.state.isRecording ? "Click this again when you're done" : "Click Record and say a something"} />
        {!this.state.isRecording && <Button colour='purple' shade='medium' onClick={() => this.startRecording()} buttonText='Record' />}
        {this.state.isRecording && <Button colour='purple' shade='dark' onClick={() => this.finishRecording()} buttonText='Done' />}
      </Container>
    )
  }
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

