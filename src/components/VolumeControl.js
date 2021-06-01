import * as Tone from 'tone'
import { useEffect, useState } from 'react'
import { useConfig } from '../contexts/config'
import { convertVolume } from '../actions/convert-volume'

const VolumeControl = () => {
  const { state, dispatch } = useConfig()
  const [volume, setVolume] = useState(state.volume)

  useEffect(() => {
    Tone.Destination.volume.value = convertVolume(state.volume)
  }, [])

  const changeVolume = e => {
    setVolume(e.target.value)
    Tone.Destination.volume.value = convertVolume(e.target.value)
    dispatch({ type: 'SET_VOLUME', tempo: e.target.value })
  }

  return (
    <div>
      <span>Volume: </span>
      <input type="number" value={volume} onChange={changeVolume} />
    </div>
  )
}

export default VolumeControl
