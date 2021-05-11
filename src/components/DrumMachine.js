import { useStore } from '../store'
import Track from './Track'
import Controls from './Controls'

const DrumMachine = () => {
  const { state } = useStore()
  return (
    <div className="drum-machine">
      <div className="track-container">
        {state.tracks.map(track => (
          <Track key={track.instrument.name} track={track} />
        ))}
      </div>
      <Controls />
    </div>
  )
}

export default DrumMachine
