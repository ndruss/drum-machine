import * as Tone from 'tone'
import { useEffect } from 'react'
import { useControls } from '../contexts/controls'
import { convertVolume } from '../actions/convert-volume'

const VolumeControl = () => {
  const { state, dispatch } = useControls()

  useEffect(() => {
    Tone.Destination.volume.value = convertVolume(state.volume)
  }, [])

  const changeVolume = e => {
    Tone.Destination.volume.value = convertVolume(e.target.value)
    dispatch({ type: 'SET_VOLUME', tempo: e.target.value })
  }

  return (
    <div>
      <span>Volume: </span>
      <input type="number" value={state.volume} onChange={changeVolume} />
    </div>
  )
}

export default VolumeControl
