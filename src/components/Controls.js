import * as Tone from 'tone'
import { useState } from 'react'
import { useSequence } from '../contexts/sequence'
import { updateSequence } from '../actions/update-sequence'
import VolumeControl from './VolumeControl'
import TempoControl from './TempoControl'

const Controls = () => {
  const { state, dispatch } = useSequence()
  const [isPlaying, setPlaying] = useState(false)

  const trackTime = () => {
    const getPosition = position => {
      const array = position.split(':')
      return [array[1], array[2]].map(string => parseInt(string, 10))
    }
    Tone.Transport.scheduleRepeat(() => {
      const loopProgress = getPosition(Tone.Transport.position)
      dispatch({ type: 'UPDATE_PROGRESS', loopProgress })
    }, `${state.subdivisions * 4}n`)
  }

  const playLoop = () => {
    const sequence = updateSequence(state.tracks, state.subdivisions)
    dispatch({ type: 'UPDATE_SEQUENCE', sequence })
    trackTime()

    sequence.forEach(track => {
      track.start(0)
    })

    Tone.Transport.timeSignature = state.timeSignature
    Tone.Transport.bpm.value = state.tempo
    Tone.Transport.loop = true
    Tone.Transport.loopEnd = '1n'
    Tone.Transport.start()
  }

  const togglePlayback = () => {
    if (!isPlaying) {
      if (Tone.context.state !== 'running') {
        Tone.start().then(playLoop)
      } else {
        playLoop()
      }
    } else {
      Tone.Transport.stop()
      Tone.Transport.cancel()
      state.sequence.forEach(track => {
        track.cancel()
        track.dispose()
      })
      dispatch({ type: 'UPDATE_PROGRESS', loopProgress: [null] })
    }
    setPlaying(!isPlaying)
  }

  const clearSequence = () => {
    state.sequence.forEach(track => {
      track.clear()
    })
    dispatch({ type: 'CLEAR_ALL_NOTES' })
  }

  return (
    <div className="controls">
      <div>
        <button className="toggle-playback" onClick={togglePlayback}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
        <button className="clear" onClick={clearSequence}>
          Clear
        </button>
      </div>
      <TempoControl />
      <VolumeControl />
    </div>
  )
}

export default Controls
