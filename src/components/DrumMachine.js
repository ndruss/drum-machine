import { useStore } from '../store'
import Track from './Track'
import Controls from './Controls'

const DrumMachine = ({ tracks }) => (
  <div className="drum-machine">
    <div className="track-container">
      {tracks.map(track => (
        <Track key={track.instrument.name} track={track} />
      ))}
    </div>
    <Controls />
  </div>
)

export default () => {
  const { state } = useStore()
  return <DrumMachine tracks={state.tracks} />
}
