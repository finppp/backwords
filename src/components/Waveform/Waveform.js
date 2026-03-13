import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

const Waveform = ({ analyserRef, isActive, colour, bgColour }) => {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isActive) return

    const ctx = canvas.getContext('2d')
    const dataArray = new Uint8Array(analyserRef.current?.fftSize || 256)
    const fadeSize = canvas.width * 0.1

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      const analyser = analyserRef.current
      if (!analyser) return

      analyser.getByteTimeDomainData(dataArray)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.lineWidth = 2
      ctx.strokeStyle = colour || 'white'
      ctx.beginPath()

      const sliceWidth = canvas.width / dataArray.length
      let x = 0
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0
        const y = (v * canvas.height) / 2
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
        x += sliceWidth
      }
      ctx.stroke()

      if (bgColour) {
        const leftGrad = ctx.createLinearGradient(0, 0, fadeSize, 0)
        leftGrad.addColorStop(0, bgColour)
        leftGrad.addColorStop(1, hexToRgba(bgColour, 0))
        ctx.fillStyle = leftGrad
        ctx.fillRect(0, 0, fadeSize, canvas.height)

        const rightGrad = ctx.createLinearGradient(canvas.width - fadeSize, 0, canvas.width, 0)
        rightGrad.addColorStop(0, hexToRgba(bgColour, 0))
        rightGrad.addColorStop(1, bgColour)
        ctx.fillStyle = rightGrad
        ctx.fillRect(canvas.width - fadeSize, 0, fadeSize, canvas.height)
      }
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isActive, analyserRef, colour, bgColour])

  if (!isActive) return null

  return <Canvas ref={canvasRef} width={200} height={100} />
}

export default Waveform

const Canvas = styled.canvas`
  display: block;
  margin: 5px auto;
  height: 100px;
`;
