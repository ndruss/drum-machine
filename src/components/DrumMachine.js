/* eslint-disable react-hooks/exhaustive-deps */
import * as Tone from 'tone'
import { useEffect, useState } from 'react'
import { useStore } from '../store'
import Track from './Track'

const DrumMachine = () => {
  const { state, dispatch } = useStore()
  const [isPlaying, setPlaying] = useState(false)
  const [loop, setLoop] = useState(new Tone.Loop())

  useEffect(() => {
    dispatch({ type: 'INIT_SEQUENCE' })
  }, [])

  const playLoop = () => {
    const { subdivisions, measures } = state
    const totalBeats = subdivisions * measures

    Tone.start().then(() => {
      let i = 0

      const newLoop = new Tone.Loop(() => {
        state.tracks.forEach(track => {
          if (track.sequence[i % totalBeats].isActive) {
            track.instrument.playNote()
          }
        })

        i++
      }, `${subdivisions * subdivisions}n`).start(0)

      setLoop(newLoop)

      Tone.Transport.bpm.value = state.tempo
      Tone.Transport.start()
    })
  }

  const togglePlayback = () => {
    if (!isPlaying) {
      playLoop()
    } else {
      Tone.Transport.stop()
      loop.cancel()
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
