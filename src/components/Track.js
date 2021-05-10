import { useStore } from '../store'
import Measure from './Measure'

const Track = ({ track, measures }) => (
  <div className="track">
    <header className="track__header">{track.instrument.name}</header>
    <div className="track__sequence">
      {track.sequence &&
        [...Array(measures).keys()].map(measure => (
          <Measure key={measure} index={measure} track={track} />
        ))}
    </div>
  </div>
)

export default ({ track }) => {
  const { state } = useStore()
  return <Track track={track} measures={state.measures} />
}
