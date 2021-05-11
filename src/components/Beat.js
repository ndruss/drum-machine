import * as Tone from 'tone'
import cc from 'classcat'
import { useStore } from '../store'

const Beat = ({ measure, index, isPlaying, isActive, track }) => {
  const { dispatch } = useStore()

  const toggleNote = () => {
    dispatch({
      type: 'TOGGLE_NOTE',
      trackName: track.instrument.name,
      measure,
      index,
      value: !isActive ? track.instrument.note : null,
    })
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
