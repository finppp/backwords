import { useEffect, useRef, useCallback, useState } from 'react'
import Recorder from '../../utils/Recorder'

const useMediaPlayer = () => {
  const audioContextRef = useRef(null)
  const recorderRef = useRef(null)
  const [audioState, setAudioState] = useState({
    gameAudio: [],
    gameAudioReversed: [],
    playersAudio: [],
    playersAudioReversed: []
  })
  const audioStateRef = useRef(audioState)
  audioStateRef.current = audioState

  useEffect(() => {
    audioContextRef.current = new AudioContext()

    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      (stream) => {
        const microphone = audioContextRef.current.createMediaStreamSource(stream)
        const filter = audioContextRef.current.createBiquadFilter()
        recorderRef.current = new Recorder(microphone)
        microphone.connect(filter)
      })
      .catch((err) => {
        console.log(err)
      })

    return () => {
      audioContextRef.current.close()
    }
  }, [])

  const reset = useCallback(() => {
    setAudioState({
      gameAudio: [],
      gameAudioReversed: [],
      playersAudio: [],
      playersAudioReversed: []
    })
  }, [])

  const startRecording = useCallback(async () => {
    await audioContextRef.current.resume()
    recorderRef.current.clear()
    recorderRef.current.record()
  }, [])

  const stopRecording = useCallback((audioType) => {
    recorderRef.current.stop()
    recorderRef.current.getBuffer((buffer) => {
      const left = buffer[0].slice(0).reverse()
      const right = buffer[1].slice(0).reverse()
      const reversedBuffer = [left, right]

      if (audioType === 'gameAudio') {
        setAudioState(prev => ({
          ...prev,
          gameAudio: buffer,
          gameAudioReversed: reversedBuffer
        }))
      } else if (audioType === 'player') {
        setAudioState(prev => ({
          ...prev,
          playersAudio: [...prev.playersAudio, buffer],
          playersAudioReversed: [...prev.playersAudioReversed, reversedBuffer]
        }))
      }
    })
  }, [])

  const playBuffer = useCallback((buffers) => {
    const newSource = audioContextRef.current.createBufferSource()
    const newBuffer = audioContextRef.current.createBuffer(2, buffers[0].length, audioContextRef.current.sampleRate)
    newBuffer.getChannelData(0).set(buffers[0])
    newBuffer.getChannelData(1).set(buffers[1])
    newSource.buffer = newBuffer
    newSource.connect(audioContextRef.current.destination)
    newSource.start(0)
  }, [])

  const playRecording = useCallback((audioToPlay, direction) => {
    const state = audioStateRef.current
    if (audioToPlay === 'gameAudio') {
      if (direction === 'forwards') {
        playBuffer(state.gameAudio)
      } else {
        playBuffer(state.gameAudioReversed)
      }
    } else {
      if (direction === 'forwards') {
        playBuffer(state.playersAudio[audioToPlay - 1])
      } else {
        playBuffer(state.playersAudioReversed[audioToPlay - 1])
      }
    }
  }, [playBuffer])

  return { reset, startRecording, stopRecording, playRecording }
}

export default useMediaPlayer
