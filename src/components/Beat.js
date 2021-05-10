import * as Tone from 'tone'
import { useState } from 'react'
import { useStore } from '../store'

const Beat = ({ measure, index, isPlaying, track }) => {
  const { dispatch } = useStore()
  const [isActive, setActive] = useState(!!track.sequence[measure][index])

  const toggleNote = () => {
    // console.log(Tone.context.state)
    dispatch({
      type: 'TOGGLE_NOTE',
      trackName: track.instrument.name,
      measure,
      index,
      value: !isActive ? track.instrument.note : null,
    })
    setActive(!isActive)
    // console.log(track.instrument)
    track.instrument.playNote()
  }

  const handleClick = () => {
    if (Tone.context.state !== 'running') {
      Tone.start().then(toggleNote)
    } else {
      toggleNote()
    }
  }

  return (
    <div className={`beat ${isPlaying ? 'playing' : ''}`}>
      <input type="checkbox" onChange={handleClick} checked={isActive} />
    </div>
  )
}

export default Beat
