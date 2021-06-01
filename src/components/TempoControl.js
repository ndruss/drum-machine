import * as Tone from 'tone'
import { useConfig } from '../contexts/config'

const TempoControl = () => {
  const { state, dispatch } = useConfig()

  const changeTempo = e => {
    Tone.Transport.bpm.value = e.target.value
    dispatch({ type: 'SET_TEMPO', tempo: e.target.value })
  }

  return (
    <div>
      <span>Tempo: </span>
      <input type="number" value={state.tempo} onChange={changeTempo} />
    </div>
  )
}

export default TempoControl
