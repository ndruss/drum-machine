import * as Tone from 'tone'
import cc from 'classcat'
import { useState } from 'react'
import { useStore } from '../store'

const Beat = ({ measure, index, isPlaying, track }) => {
  const { dispatch } = useStore()
  const [isActive, setActive] = useState(!!track.sequence[measure][index])

  const toggleNote = () => {
    dispatch({
      type: 'TOGGLE_NOTE',
      trackName: track.instrument.name,
      measure,
      index,
      value: !isActive ? track.instrument.note : null,
    })
    setActive(!isActive)
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
    <div
      className={cc({
        beat: true,
        isPlaying,
        isActive,
      })}
      onMouseDown={handleClick}
    />
  )
}

export default Beat
