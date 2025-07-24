import React, { Component } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components';
import colours from '../../utils/colours'
import Guide from '../Guide/Guide'

export class Player extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isRecording: false
    }
  }

  startRecording() {
    this.props.startRecording()
    this.setState({
      isRecording: true
    })
  }

  finishRecording() {
    this.props.stopRecording()
    this.props.onAdvance()
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPlayer !== prevProps.currentPlayer) {
      this.setState({
        isRecording: false
      })
    }
  }

  render() {
    let colourArray = ['green', 'orange', 'red', 'yellow', 'blue', 'pink']
    return (
      <Container colour={colourArray[this.props.currentPlayer - 1]}>
        <Guide
          shade='medium' colour={colourArray[this.props.currentPlayer - 1]}
          guideText={`Player ${this.props.currentPlayer + 1 || 'x'}`} />

        <Guide
          guideOnly
          guideEnabled={this.props.guideEnabled}
          shade='medium' colour={colourArray[this.props.currentPlayer - 1]}
          guideText={
            ["Each player listens to a reversed version of the Leaders recording - as many times as they like ", "(Play button)"]} />

        <Guide
          guideOnly
          guideEnabled={this.props.guideEnabled}
          shade='medium' colour={colourArray[this.props.currentPlayer - 1]}
          guideText={['They then have to record their best imitation of the sound', '(Record button)']} />

        <Button colour={colourArray[this.props.currentPlayer - 1]} onClick={() => this.props.playRecording()} buttonText='Play' />
        {!this.state.isRecording &&

          <Button colour={colourArray[this.props.currentPlayer - 1]} onClick={() => this.startRecording()} buttonText='Record' />}
        {this.state.isRecording &&

          <Button colour={colourArray[this.props.currentPlayer - 1]} onClick={() => this.finishRecording()} buttonText='Done' />}
      </Container>
    )
  }
}

export default Player

const Container = styled.section`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition: background-color 0.5s ease;
  background-color: ${props => colours[props.colour || 'green'].light};
        height: 100vh;
      `;
