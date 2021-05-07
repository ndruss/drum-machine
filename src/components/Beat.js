import * as Tone from 'tone'
import { useState } from 'react'
import { useStore } from '../store'

const Beat = ({ measure, index, track }) => {
  const { dispatch } = useStore()
  const note = track.sequence[measure][index]
  const [isActive, setActive] = useState(!!note)

  const toggleNote = () => {
    // console.log(Tone.context.state)
    dispatch({
      type: 'TOGGLE_NOTE',
      trackName: track.name,
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
    <div className="beat">
      <input type="checkbox" onChange={handleClick} checked={isActive} />
    </div>
  )
}

export default Beat
