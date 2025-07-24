import React, { Component } from 'react'
import styles from './Game.module.scss'
import Start from '../Start/Start'
import PhraseRecord from '../PhraseRecord/PhraseRecord'
import Player from '../Player/Player'
import Playback from '../Playback/Playback'
import MediaPlayer from '../MediaPlayer/MediaPlayer'

export class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentState: 'start',
      currentPlayer: 1,
      numberOfPlayers: 3,
      guideEnabled: true,
    }
  }

  resetGame() {
    this.child.reset()
    this.setState({
      currentState: 'start',
      currentPlayer: 1
    })
  }

  toggleGuide(newState) {
    this.setState({
      guideEnabled: newState
    })
  }

  changeGameState() {
    let nextState = ''
    switch (this.state.currentState) {
      case 'start':
        nextState = 'record'
        break;
      case 'record':
        nextState = 'player'
        break;
      case 'player':
        this.checkIfAnotherPlayer()
        return
      default:
        console.log('Error state does not match switch');
        break;
    }

    this.setState({
      currentState: nextState,
    })
  }

  checkIfAnotherPlayer() {
    if (this.state.currentPlayer === this.state.numberOfPlayers) {
      this.setState({
        currentState: 'playback'
      })
    } else {
      this.setState({
        currentPlayer: this.state.currentPlayer + 1
      })
    }
  }

  startRecording() {
    this.child.startRecording()
  }

  stopRecording(saveType) {
    this.child.stopRecording(saveType)
  }

  playRecording(audioToPlay, direction) {
    this.child.playRecording(audioToPlay, direction)
  }

  changePlayerCount(newPlayerCount) {
    this.setState({
      numberOfPlayers: newPlayerCount
    })
  }


  render() {
    return (
      <section className={styles.container}>
        {/* <h1>Backchat</h1> */}
        <MediaPlayer ref={instance => { this.child = instance; }} currentState={this.state.currentState} />
        {this.state.currentState === 'start' &&
          <Start
            guideEnabled={this.state.guideEnabled}
            toggleGuide={(newState) => this.toggleGuide(newState)}
            numberOfPlayers={this.state.numberOfPlayers}
            changePlayerCount={(newPlayerCount) => this.changePlayerCount(newPlayerCount)}
            onAdvance={() => this.changeGameState()} />}

        {this.state.currentState === 'record' &&
          <PhraseRecord
            startRecording={() => this.startRecording()}
            stopRecording={() => this.stopRecording('gameAudio')}
            guideEnabled={this.state.guideEnabled}
            onAdvance={() => this.changeGameState()} />}

        {this.state.currentState === 'player' &&
          <Player
            onAdvance={() => this.changeGameState()}
            startRecording={() => this.startRecording()}
            stopRecording={() => this.stopRecording('player')}
            playRecording={() => this.playRecording('gameAudio', 'backwards')}
            guideEnabled={this.state.guideEnabled}
            currentPlayer={this.state.currentPlayer} />}

        {this.state.currentState === 'playback' &&
          <Playback
            onAdvance={() => this.resetGame()}
            playRecording={(player, direction) => this.playRecording(player, direction)}
            guideEnabled={this.state.guideEnabled}
            numberOfPlayers={this.state.numberOfPlayers} />}
      </section>
    )
  }
}

export default Game
