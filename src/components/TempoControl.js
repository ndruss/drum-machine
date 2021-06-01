import { useControls } from '../contexts/controls'

const TempoControl = () => {
  const { state, dispatch } = useControls()

  const changeTempo = e => {
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
