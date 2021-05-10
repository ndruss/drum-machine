import * as Tone from 'tone'
import { useState } from 'react'
import { useStore } from '../store'
import { updateSequence } from '../actions/update-sequence'

const Controls = () => {
  const { state, dispatch } = useStore()
  const [isPlaying, setPlaying] = useState(false)

  const trackTime = () => {
    const getPosition = position => {
      const array = position.split(':')
      return [array[1], array[2]].map(string => parseInt(string))
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
    }
    setPlaying(!isPlaying)
  }

  const changeTempo = e => {
    dispatch({ type: 'SET_TEMPO', tempo: e.target.value })
  }

  return (
    <div className="controls">
      <div>
        <button className="toggle-playback" onClick={togglePlayback}>
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
      <div>
        <span>Tempo: </span>
        <input type="number" value={state.tempo} onChange={changeTempo} />
      </div>
    </div>
  )
}

export default Controls
