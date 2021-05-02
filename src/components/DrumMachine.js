/* eslint-disable react-hooks/exhaustive-deps */
import * as Tone from 'tone'
import { useEffect } from 'react'
import { useStore } from '../store'
import Track from './Track'

const DrumMachine = () => {
  const { state, dispatch } = useStore()

  useEffect(() => {
    dispatch({ type: 'INIT_SEQUENCE' })
  }, [])

  const playLoop = () => {
    Tone.start().then(() => {
      const loop = new Tone.Loop(time => {
        console.log(time)
      }, `${state.subdivisions}n`).start(0)
      Tone.Transport.bpm.value = state.tempo
      Tone.Transport.start()
    })
  }

  return (
    <div className="drum-machine">
      <div className="track-container">
        {state.tracks.map(track => (
          <Track key={track.name} name={track.name} />
        ))}
      </div>
      <div className="controls">
        <div>
          <button className="toggle-playback" onClick={playLoop}>
            Play
          </button>
        </div>
        <div>
          <span>Tempo: </span>
          <input
            type="number"
            value={state.tempo}
            onChange={e =>
              dispatch({ type: 'SET_TEMPO', tempo: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DrumMachine
