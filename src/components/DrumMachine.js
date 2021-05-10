/* eslint-disable react-hooks/exhaustive-deps */
import * as Tone from 'tone'
import { useState } from 'react'
import { useStore } from '../store'
import Track from './Track'

const DrumMachine = () => {
  const { state, dispatch } = useStore()
  const [isPlaying, setPlaying] = useState(false)
  const [loop, setLoop] = useState([])

  const trackTime = () => {
    const getPosition = position => {
      const array = position.split(':')
      return [array[1], array[2]].map(string => parseInt(string))
    }
    Tone.Transport.scheduleRepeat(time => {
      const loopProgress = getPosition(Tone.Transport.position)
      console.log(loopProgress)
      dispatch({ type: 'UPDATE_PROGRESS', loopProgress })
    }, `${state.subdivisions * 4}n`)
  }

  const playLoop = () => {
    const { subdivisions } = state
    Tone.start().then(() => {
      const newLoop = state.tracks.map(({ instrument, sequence }) => {
        return new Tone.Sequence(
          (time, note) => {
            instrument.sequenceHit(note, time)
          },
          sequence,
          `${subdivisions}n`
        ).start(0)
      })
      setLoop(newLoop)

      trackTime()

      Tone.Transport.timeSignature = state.timeSignature
      Tone.Transport.bpm.value = state.tempo
      Tone.Transport.loop = true
      Tone.Transport.loopEnd = '1n'
      Tone.Transport.on('loopEnd', e => {
        console.log('loopEnd')
      })
      Tone.Transport.start()
    })
  }

  const togglePlayback = () => {
    if (!isPlaying) {
      playLoop()
    } else {
      Tone.Transport.stop()
      Tone.Transport.cancel()
      loop.forEach(track => {
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
    <div className="drum-machine">
      <div className="track-container">
        {state.tracks.map(track => (
          <Track key={track.name} track={track} />
        ))}
      </div>
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
    </div>
  )
}

export default DrumMachine
