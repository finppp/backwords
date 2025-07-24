import { Component } from 'react'
import Recorder from '../../utils/Recorder'


export class MediaPlayer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gameAudio: [],
      gameAudioReversed: [],
      playersAudio: [],
      playersAudioReversed: []
    }
  }


  reset() {
    this.setState({
      gameAudio: [],
      gameAudioReversed: [],
      playersAudio: [],
      playersAudioReversed: []
    })
  }

  async componentDidMount() {
    this.audioContext = new AudioContext();
    this.getMicrophoneAccess();
  }
  
  componentWillUnmount() {
    this.audioContext.close();
  }
  
  setupRecorder(inputNode) {
    this.recorder = new Recorder(inputNode)
  }
  
  async startRecording() {
    await this.audioContext.resume();
    this.recorder.clear()
    this.recorder.record()
  }

  stopRecording(audioType) {
    this.recorder.stop()
    this.recorder.getBuffer((buffer) => this.saveBuffer(buffer, audioType))
  }

  playRecording(audioToPlay, direction) {
    if (audioToPlay === 'gameAudio') {
      if (direction === 'forwards') {
        this.playBuffer(this.state.gameAudio)
      } else {
        this.playBuffer(this.state.gameAudioReversed)
      }
    } else {
      if (direction === 'forwards') {
        this.playBuffer(this.state.playersAudio[audioToPlay - 1])
      } else {
        this.playBuffer(this.state.playersAudioReversed[audioToPlay - 1])
      }
    }
  }

  playBuffer(buffers) {
    var newSource = this.audioContext.createBufferSource();
    var newBuffer = this.audioContext.createBuffer(2, buffers[0].length, this.audioContext.sampleRate);
    newBuffer.getChannelData(0).set(buffers[0]);
    newBuffer.getChannelData(1).set(buffers[1]);
    newSource.buffer = newBuffer;

    newSource.connect(this.audioContext.destination);
    newSource.start(0);
  }

  saveBuffer(buffer, audioType) {
    let left = buffer[0].slice(0).reverse()
    let right = buffer[1].slice(0).reverse()
    let reversedBuffer = [left, right]

    if (audioType === 'gameAudio') {
      this.setState({
        gameAudio: buffer,
        gameAudioReversed: reversedBuffer
      })
    } else if (audioType === 'player') {
      this.setState({
        playersAudio: [...this.state.playersAudio, buffer],
        playersAudioReversed: [...this.state.playersAudioReversed, reversedBuffer]
      })
    }
  }

  getMicrophoneAccess() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(
      (stream) => {
        const microphone = this.audioContext.createMediaStreamSource(stream);
        const filter = this.audioContext.createBiquadFilter();
        this.setupRecorder(microphone)
        microphone.connect(filter);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return null;
  }
}

export default MediaPlayer
