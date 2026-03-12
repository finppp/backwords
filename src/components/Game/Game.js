import React, { useState, useCallback } from 'react'
import styles from './Game.module.scss'
import Start from '../Start/Start'
import PhraseRecord from '../PhraseRecord/PhraseRecord'
import Player from '../Player/Player'
import Playback from '../Playback/Playback'
import useMediaPlayer from '../MediaPlayer/MediaPlayer'

const Game = () => {
  const [currentState, setCurrentState] = useState('start')
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [numberOfPlayers, setNumberOfPlayers] = useState(3)
  const [guideEnabled, setGuideEnabled] = useState(true)

  const { reset, startRecording, stopRecording, playRecording } = useMediaPlayer()

  const resetGame = useCallback(() => {
    reset()
    setCurrentState('start')
    setCurrentPlayer(1)
  }, [reset])

  const changeGameState = useCallback(() => {
    switch (currentState) {
      case 'start':
        setCurrentState('record')
        break
      case 'record':
        setCurrentState('player')
        break
      case 'player':
        if (currentPlayer === numberOfPlayers) {
          setCurrentState('playback')
        } else {
          setCurrentPlayer(prev => prev + 1)
        }
        break
      default:
        console.log('Error state does not match switch')
        break
    }
  }, [currentState, currentPlayer, numberOfPlayers])

  return (
    <section className={styles.container}>
      {currentState === 'start' &&
        <Start
          guideEnabled={guideEnabled}
          toggleGuide={setGuideEnabled}
          numberOfPlayers={numberOfPlayers}
          changePlayerCount={setNumberOfPlayers}
          onAdvance={changeGameState} />}

      {currentState === 'record' &&
        <PhraseRecord
          startRecording={startRecording}
          stopRecording={() => stopRecording('gameAudio')}
          guideEnabled={guideEnabled}
          onAdvance={changeGameState} />}

      {currentState === 'player' &&
        <Player
          onAdvance={changeGameState}
          startRecording={startRecording}
          stopRecording={() => stopRecording('player')}
          playRecording={() => playRecording('gameAudio', 'backwards')}
          guideEnabled={guideEnabled}
          currentPlayer={currentPlayer} />}

      {currentState === 'playback' &&
        <Playback
          onAdvance={resetGame}
          playRecording={playRecording}
          guideEnabled={guideEnabled}
          numberOfPlayers={numberOfPlayers} />}
    </section>
  )
}

export default Game
