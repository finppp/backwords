import { useRef, useCallback, useState } from 'react'
import Recorder from '../../utils/Recorder'

const useMediaPlayer = () => {
  const audioContextRef = useRef(null)
  const recorderRef = useRef(null)
  const initPromiseRef = useRef(null)
  const [audioState, setAudioState] = useState({
    gameAudio: [],
    gameAudioReversed: [],
    playersAudio: [],
    playersAudioReversed: []
  })
  const audioStateRef = useRef(audioState)
  audioStateRef.current = audioState

  const ensureAudioContext = useCallback(async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume()
    }
    return audioContextRef.current
  }, [])

  const analyserRef = useRef(null)
  const analyserDataRef = useRef(null)

  const initMicrophone = useCallback(async () => {
    if (initPromiseRef.current) return initPromiseRef.current

    initPromiseRef.current = (async () => {
      const ctx = await ensureAudioContext()
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const microphone = ctx.createMediaStreamSource(stream)
      const filter = ctx.createBiquadFilter()
      recorderRef.current = new Recorder(microphone)
      microphone.connect(filter)

      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      microphone.connect(analyser)
      analyserRef.current = analyser
      analyserDataRef.current = new Uint8Array(analyser.fftSize)
    })()

    return initPromiseRef.current
  }, [ensureAudioContext])

  const reset = useCallback(() => {
    setAudioState({
      gameAudio: [],
      gameAudioReversed: [],
      playersAudio: [],
      playersAudioReversed: []
    })
  }, [])

  const startRecording = useCallback(async () => {
    await initMicrophone()
    await ensureAudioContext()
    recorderRef.current.clear()
    recorderRef.current.record()
  }, [initMicrophone, ensureAudioContext])

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

  const playBuffer = useCallback(async (buffers) => {
    const ctx = await ensureAudioContext()
    const newSource = ctx.createBufferSource()
    const newBuffer = ctx.createBuffer(2, buffers[0].length, ctx.sampleRate)
    newBuffer.getChannelData(0).set(buffers[0])
    newBuffer.getChannelData(1).set(buffers[1])
    newSource.buffer = newBuffer
    newSource.connect(ctx.destination)
    newSource.start(0)
  }, [ensureAudioContext])

  const playRecording = useCallback(async (audioToPlay, direction) => {
    const state = audioStateRef.current
    if (audioToPlay === 'gameAudio') {
      if (direction === 'forwards') {
        await playBuffer(state.gameAudio)
      } else {
        await playBuffer(state.gameAudioReversed)
      }
    } else {
      if (direction === 'forwards') {
        await playBuffer(state.playersAudio[audioToPlay - 1])
      } else {
        await playBuffer(state.playersAudioReversed[audioToPlay - 1])
      }
    }
  }, [playBuffer])

  return { reset, startRecording, stopRecording, playRecording, analyserRef }
}

export default useMediaPlayer
